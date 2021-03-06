package main

import (
	"net/http/httputil"
	"strconv"
	//"reflect"
	
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"strings"
	"time"

	simplejson "github.com/bitly/go-simplejson"
	"github.com/grafana/grafana-plugin-model/go/datasource"
	hclog "github.com/hashicorp/go-hclog"
	plugin "github.com/hashicorp/go-plugin"
	"golang.org/x/net/context"
	"golang.org/x/net/context/ctxhttp"
)


//Structs to store api response data, json formatted (JsonResponse, DataArr)

type JsonResponse struct {
	Data [] DataArr
	Total int64
	Limit int64
	Offset int64
	Error string
}

type DataArr struct {
	Parent string
	Child string
	CallCount int64
}

//Struct to store api/datasource/Prometheus data
type GetDatasourceId struct {
	Id int64
	OrgId int64
	Name string
	Type string
	Access string
	Url string
	Password string
	User string
	BasicAuth bool
	BasicAuthUser string
	BasicAuthPassword string
}

//Struts to store Prometheus api data, json response
//http://localhost:9090/api/v1/query?query=up

type PrometheusApiData struct {
	Status string
	Data DataJson
}

type DataJson struct {
	ResultType string
	Result [] ResultArr
}

type ResultArr struct {
	Metric MetricJson
	Value [2]interface{} `json:"value"` 
}

type MetricJson struct {
	Name string
	Instance string
	Job string
}

type ArrValues struct {
  Number float64
  Text string
}


type Message struct {
    Name string
    Body string
    Time int64
}

type JsonDatasource struct {
	plugin.NetRPCUnsupportedPlugin
	logger hclog.Logger
}

func (ds *JsonDatasource) Query(ctx context.Context, tsdbReq *datasource.DatasourceRequest) (*datasource.DatasourceResponse, error) {
	ds.logger.Debug("Query", "datasource", tsdbReq.Datasource.Name, "TimeRange", tsdbReq.TimeRange)

	//Prepares tsdbReq
	queryType, err := GetQueryType(tsdbReq)
	if err != nil {
		return nil, err
	}
	
	ds.logger.Debug("createRequest", "queryType", queryType)

	switch queryType {
	case "search":
		return ds.SearchQuery(ctx, tsdbReq)
	default:
		//To create a metric query
		return ds.MetricQuery(ctx, tsdbReq)
	}
}

func (ds *JsonDatasource) MetricQuery(ctx context.Context, tsdbReq *datasource.DatasourceRequest) (*datasource.DatasourceResponse, error) {
	remoteDsReq, err := ds.CreateMetricRequest(tsdbReq)
	if err != nil {
		return nil, err
	}

	// MakeHttpRequest calls the api with address remoteDsReq.req and returns the response in body
	body, err := ds.MakeHttpRequest(ctx, remoteDsReq)
	if err != nil {
		return nil, err
	}
	
	// #My code starts#
	performanceMetrics := getPrometheusData(ctx, ds)
	pluginLogger.Debug(string(len(performanceMetrics)))
	
	//Storing body response in JsonResponse struct
	var jsonResponse JsonResponse //keep this line
	json.Unmarshal([]byte(body), &jsonResponse) //keep this line
	
	//Calling responsebodyWrapup function to convert json response to desired datasource table formatted response
	result := responsebodyWrapup(jsonResponse, performanceMetrics)
	body = []byte(result)

	return ds.ParseQueryResponse(remoteDsReq.queries, body)
}

func responsebodyWrapup (jsonResponse JsonResponse, performanceMetrics []string) string {

	pluginLogger.Debug(string(strconv.FormatInt(time.Now().UTC().Unix(), 10)))
	if len(performanceMetrics) < 1 {
		pluginLogger.Debug("performanceMetrics length is zero in responsebodyWrapup function")
	} else {
		pluginLogger.Debug("No it is greater than 0")
	}
	jsonRes := `[{"columns":[],"values":[],"type":"table"}]`
	if len(jsonResponse.Data) > 0 {
		pluginLogger.Debug("inside non zero if")
		jsonSubRes := `{"columns":[{"text":"Parent","type":"string"},{"text":"Child","type":"string"},{"text":"CallCount","type":"number"}]`
		arrStr := ``
		for i:=0; i<len(jsonResponse.Data); i++ {
			arrStr = arrStr + `["` + string(jsonResponse.Data[i].Parent) + `","` + (jsonResponse.Data[i].Child) + `",` + (strconv.FormatInt((jsonResponse.Data[i].CallCount), 10)) + `],`
		}
		arrStr = arrStr[0:len(arrStr)-1]
		jsonRes = `[` + jsonSubRes + `,"values":[` + arrStr + `]` + `,"type":"table"}` + `]`
	} /*else {
		pluginLogger.Debug("inside else")
		jsonRes := `[{[], [],"type":"table"}]`
	}*/
	
	return jsonRes
}

func getPrometheusData (ctx context.Context, ds *JsonDatasource) []string {
	
	data := RunPrometheusQuery("up")
	var prometheusApiData PrometheusApiData
	json.Unmarshal([]byte (data), &prometheusApiData)
	pluginLogger.Debug("prometheusApi status")
	pluginLogger.Debug(prometheusApiData.Status)
	
	var arr []string;

	if (prometheusApiData.Status) == "success" {
		pluginLogger.Debug("Inside Iff")
		//var arr []string;
		for i:=0; i < len (prometheusApiData.Data.Result); i++ {
			pluginLogger.Debug("Inside for loop")
			var sub_arr []string;
			sub_arr = append(sub_arr, prometheusApiData.Data.Result[i].Metric.Job)
			sub_arr = append(sub_arr, prometheusApiData.Data.Result[i].Value[1].(string))
			arr = append(sub_arr)
			pluginLogger.Debug(prometheusApiData.Data.Result[i].Metric.Job)
			pluginLogger.Debug(prometheusApiData.Data.Result[i].Value[1].(string))
		}
		return arr
	}
	return arr
}

func RunPrometheusQuery (query string) []byte {

	payload := simplejson.New()
	
	rbody, err := payload.MarshalJSON()
	if err != nil {
		return []byte(``)
	}
	
	req, err := http.NewRequest(http.MethodGet, "http://localhost:3000/api/datasources/name/Prometheus", strings.NewReader(string(rbody)));
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Authorization", "Bearer eyJrIjoiQXNmeGFPWmxJVGJuZDV3NHhCV0trYmZvN01ZVWZwdlQiLCJuIjoicHJvbWV0aGV1c0tleSIsImlkIjoxfQ==")
	
	
	requestDump, err := httputil.DumpRequest(req, true)
	pluginLogger.Debug("Request dump inside getPrometheusData function")
	pluginLogger.Debug(string(requestDump))
	
	//body, err := ds.MakeHttpRequest(ctx, req)
	client := &http.Client{}
	response, err := client.Do(req)
	if err != nil {
		return []byte(``)
	}
	pluginLogger.Debug("### printing datasource http api response #######")
	data, _ := ioutil.ReadAll(response.Body)
	pluginLogger.Debug(string(data))
	
	var getDatasourceId GetDatasourceId
	json.Unmarshal([]byte(data), &getDatasourceId)
	pluginLogger.Debug(string(getDatasourceId.Id))
	pluginLogger.Debug(getDatasourceId.Name)
	pluginLogger.Debug(getDatasourceId.Url)
	req, err = http.NewRequest(http.MethodGet, getDatasourceId.Url+"/api/v1/query?query="+query, strings.NewReader(string(rbody)));
	client = &http.Client{}
	response, err = client.Do(req)
	if err != nil {
		return []byte(``)
	}
	pluginLogger.Debug("### printing prometheus response #######")
	data, _ = ioutil.ReadAll(response.Body)
	pluginLogger.Debug(string(data))
	
	return data
	
}

func (ds *JsonDatasource) CreateMetricRequest(tsdbReq *datasource.DatasourceRequest) (*RemoteDatasourceRequest, error) {
	jsonQueries, err := parseJSONQueries(tsdbReq)
	if err != nil {
		return nil, err
	}

	payload := simplejson.New()
	payload.SetPath([]string{"range", "to"}, tsdbReq.TimeRange.ToRaw)
	payload.SetPath([]string{"range", "from"}, tsdbReq.TimeRange.FromRaw)
	payload.Set("targets", jsonQueries)

	//if uncomment rbody from http.NewRequest then uncomment this block too
	rbody, err := payload.MarshalJSON()
	if err != nil {
		return nil, err
	}

	//url := tsdbReq.Datasource.Url + "/query"
	//url := "http://localhost:16686/api/dependencies?endTs=1582229223063&lookback=604800000"
	url := tsdbReq.Datasource.Url + `/api/dependencies?endTs=` + strconv.FormatInt((time.Now().UnixNano() / (int64(time.Millisecond)/int64(time.Nanosecond))), 10) + `&lookback=604800000`
	pluginLogger.Debug("printing tsdbReq");

	//res, err := http.NewRequest(http.MethodGet, "/api/datasources/Prometheus", strings.NewReader(string(rbody)));
	//requestDump, err := httputil.DumpRequest(res, true)
	//pluginLogger.Debug(string(requestDump))
	//pluginLogger.Debug("PRINTING URL from backend########")
	pluginLogger.Debug(url)
	pluginLogger.Debug("Printed url above");
	
	//
	
	// below http.NewRequest line is the original line
	//req, err := http.NewRequest(http.MethodPost, url, strings.NewReader(string(rbody)))
	
	req, err := http.NewRequest(http.MethodGet, url, strings.NewReader(string(rbody)))
	//req, err := http.NewRequest("Get", url, nil)
	if err != nil {
		return nil, err
	}

	//commenting req.header.add line for a test, in case later i forget
	req.Header.Add("Content-Type", "application/json")
	
	//
	//pluginLogger.Debug("PRINTING REQ form BACKEND 2nd Function")
	requestDump, err := httputil.DumpRequest(req, true)
	//if err != nil {
		//pluginLogger.Debug("RESULTED in error, which I cant print")
	//}
	pluginLogger.Debug(string(requestDump))
	//
	

	return &RemoteDatasourceRequest{
		queryType: "query",
		req:       req,
		queries:   jsonQueries,
	}, nil
}

func (ds *JsonDatasource) SearchQuery(ctx context.Context, tsdbReq *datasource.DatasourceRequest) (*datasource.DatasourceResponse, error) {
	remoteDsReq, err := ds.CreateSearchRequest(tsdbReq)
	if err != nil {
		return nil, err
	}

	body, err := ds.MakeHttpRequest(ctx, remoteDsReq)
	if err != nil {
		return nil, err
	}

	return ds.ParseSearchResponse(body)
}

func (ds *JsonDatasource) CreateSearchRequest(tsdbReq *datasource.DatasourceRequest) (*RemoteDatasourceRequest, error) {
	jsonQueries, err := parseJSONQueries(tsdbReq)
	if err != nil {
		return nil, err
	}

	payload := simplejson.New()
	payload.Set("target", jsonQueries[0].Get("target").MustString())

	rbody, err := payload.MarshalJSON()
	if err != nil {
		return nil, err
	}

	url := tsdbReq.Datasource.Url + "/search"
	
	req, err := http.NewRequest(http.MethodPost, url, strings.NewReader(string(rbody)))
	if err != nil {
		return nil, err
	}

	req.Header.Add("Content-Type", "application/json")

	return &RemoteDatasourceRequest{
		queryType: "search",
		req:       req,
		queries:   jsonQueries,
	}, nil
}

func (ds *JsonDatasource) MakeHttpRequest(ctx context.Context, remoteDsReq *RemoteDatasourceRequest) ([]byte, error) {
	//res, err := ctxhttp.Do(ctx, httpClient, remoteDsReq.req)
	res, err := ctxhttp.Do(ctx, httpClient, remoteDsReq.req)
	//below res, err is my line
	//pluginLogger.Debug("!!!!!!!!!!!TRYING TO PRINT httpClient")
	//trying to print something
	// Save a copy of this request for debugging.
		//requestDump, err := httputil.DumpRequest(remoteDsReq.req, true)
		if err != nil {
		//pluginLogger.Debug(string(err))
		}
		//pluginLogger.Debug(string(requestDump))
	
	//end try
	//res, err = http.Get("http://localhost:16686/api/dependencies?endTs=1582229223063&lookback=604800000")
	//res, err = http.Get(tsdbReq.Datasource.Url + `/api/dependencies?endTs=` + string(time.Now().Unix()))
	pluginLogger.Debug("Am I in MakeHttpRequest????????????")

	//request is actually being made in above line
	if err != nil {
		return nil, err
	}

	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("invalid status code. status: %v", res.Status)
	}

	body, err := ioutil.ReadAll(res.Body)
	

	if err != nil {
		return nil, err
	}
	//pluginLogger.Debug(string(body)) //working till here, produced the body response.........
	return body, nil
}

func GetQueryType(tsdbReq *datasource.DatasourceRequest) (string, error) {
	queryType := "query"
	if len(tsdbReq.Queries) > 0 {
		firstQuery := tsdbReq.Queries[0]
		queryJson, err := simplejson.NewJson([]byte(firstQuery.ModelJson))
		if err != nil {
			return "", err
		}
		queryType = queryJson.Get("queryType").MustString("query")
	}
	return queryType, nil
}

func parseJSONQueries(tsdbReq *datasource.DatasourceRequest) ([]*simplejson.Json, error) {
	jsonQueries := make([]*simplejson.Json, 0)
	for _, query := range tsdbReq.Queries {
		json, err := simplejson.NewJson([]byte(query.ModelJson))
		if err != nil {
			return nil, err
		}

		jsonQueries = append(jsonQueries, json)
	}
	return jsonQueries, nil
}

func (ds *JsonDatasource) ParseQueryResponse(queries []*simplejson.Json, body []byte) (*datasource.DatasourceResponse, error) {
	response := &datasource.DatasourceResponse{}
	responseBody := []TargetResponseDTO{}

	err := json.Unmarshal(body, &responseBody)
	if err != nil {
		return nil, err
	}
	
	for i, r := range responseBody {
		refId := r.Target
		//pluginLogger.Debug(refId)
	
		if len(queries) > i {
			refId = queries[i].Get("refId").MustString()
			//pluginLogger.Debug("@@@@@@ refId inside if clause")
			//pluginLogger.Debug(refId)
		}

		qr := datasource.QueryResult{
			RefId:  refId,
			Series: make([]*datasource.TimeSeries, 0),
			Tables: make([]*datasource.Table, 0),
		}

		if len(r.Columns) > 0 {
			table := datasource.Table{
				Columns: make([]*datasource.TableColumn, 0),
				Rows:    make([]*datasource.TableRow, 0),
			}

			for _, c := range r.Columns {
				table.Columns = append(table.Columns, &datasource.TableColumn{
					Name: c.Text,
				})
			}

			//pluginLogger.Debug("OUTSIDE ROWS LOOP")
			for _, row := range r.Rows {
				values := make([]*datasource.RowValue, 0)

				for i, cell := range row {
					rv := datasource.RowValue{}

					switch r.Columns[i].Type {
					case "time":
						if timeValue, ok := cell.(float64); ok {
							rv.Int64Value = int64(timeValue)
						}
						rv.Kind = datasource.RowValue_TYPE_INT64
					case "number":
						if numberValue, ok := cell.(float64); ok {
							rv.Int64Value = int64(numberValue)
						}
						rv.Kind = datasource.RowValue_TYPE_INT64
					case "string":
						if stringValue, ok := cell.(string); ok {
							rv.StringValue = stringValue
						}
						rv.Kind = datasource.RowValue_TYPE_STRING
					default:
						ds.logger.Debug(fmt.Sprintf("failed to parse value %v of type %T", cell, cell))
					}

					values = append(values, &rv)
				}

				table.Rows = append(table.Rows, &datasource.TableRow{Values: values})
			}

			qr.Tables = append(qr.Tables, &table)
		} else {
			serie := &datasource.TimeSeries{Name: r.Target}

			for _, p := range r.DataPoints {
				serie.Points = append(serie.Points, &datasource.Point{
					Timestamp: int64(p[1]),
					Value:     p[0],
				})
			}

			qr.Series = append(qr.Series, serie)
		}

		response.Results = append(response.Results, &qr)
	}

	//pluginLogger.Debug("Just printing reponse here #############$$$$$$$$$$$$$%%%%%%%############")
	//pluginLogger.Debug(response)
	return response, nil
}

func (ds *JsonDatasource) ParseSearchResponse(body []byte) (*datasource.DatasourceResponse, error) {
	jBody, err := simplejson.NewJson(body)
	if err != nil {
		return nil, err
	}

	metricCount := len(jBody.MustArray())
	table := datasource.Table{
		Columns: []*datasource.TableColumn{
			&datasource.TableColumn{Name: "text"},
		},
		Rows: make([]*datasource.TableRow, 0),
	}

	for n := 0; n < metricCount; n++ {
		values := make([]*datasource.RowValue, 0)
		jm := jBody.GetIndex(n)

		if text, found := jm.CheckGet("text"); found {
			values = append(values, &datasource.RowValue{
				Kind:        datasource.RowValue_TYPE_STRING,
				StringValue: text.MustString(),
			})
			values = append(values, &datasource.RowValue{
				Kind:       datasource.RowValue_TYPE_INT64,
				Int64Value: jm.Get("value").MustInt64(),
			})

			if len(table.Columns) == 1 {
				table.Columns = append(table.Columns, &datasource.TableColumn{Name: "value"})
			}
		} else {
			values = append(values, &datasource.RowValue{
				Kind:        datasource.RowValue_TYPE_STRING,
				StringValue: jm.MustString(),
			})
		}

		table.Rows = append(table.Rows, &datasource.TableRow{Values: values})
	}

	return &datasource.DatasourceResponse{
		Results: []*datasource.QueryResult{
			&datasource.QueryResult{
				RefId:  "search",
				Tables: []*datasource.Table{&table},
			},
		},
	}, nil
}

var httpClient = &http.Client{
	Transport: &http.Transport{
		TLSClientConfig: &tls.Config{
			Renegotiation: tls.RenegotiateFreelyAsClient,
		},
		Proxy: http.ProxyFromEnvironment,
		Dial: (&net.Dialer{
			Timeout:   30 * time.Second,
			KeepAlive: 30 * time.Second,
			DualStack: true,
		}).Dial,
		TLSHandshakeTimeout:   10 * time.Second,
		ExpectContinueTimeout: 1 * time.Second,
		MaxIdleConns:          100,
		IdleConnTimeout:       90 * time.Second,
	},
	Timeout: time.Duration(time.Second * 30),
}
