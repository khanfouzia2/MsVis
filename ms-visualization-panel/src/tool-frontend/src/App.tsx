import React, { PureComponent } from 'react';
//import React, { Component } from 'react';
import { SimpleOptions } from 'types';
import './style/App.css';
import { PanelProps } from '@grafana/data';
import { getNetworkData } from './FormNetwork';

//import axios from 'axios';


interface Props extends PanelProps<SimpleOptions> {}

//const s = require('./style/App.css');
export class App extends PureComponent<Props> {

	constructor(props: Props){
		super(props);
	}
	
	async drawGraph(){
		const { data } = this.props;
		console.log(data.series);
		if (data.series.length < 1) {
			//document.getElementById('mynetwork').innerHTML = 'No data to show';
			//var myElement = document.getElementById('my-id')!;
			//myElement = "No data to show";
		}
		else {
			const metrics_data = await this.getPrometheusMetrics();
			console.log("metrics_data inside drawGraph");
			console.log(metrics_data);
			console.log(metrics_data.length);
			
			const result = await getNetworkData(data.series, metrics_data);
			//console.log(data)
			console.log("Result from getNetworkData function");
			console.log(result); //result[0].length < 1
			
			//if (result[0].length <1){} else {}
			var vis = require('../node_modules/vis/dist/vis.js');
			var container = document.getElementById("mynetwork");
			const nodes_ = new vis.DataSet(result[0]);
			const edges_ = new vis.DataSet(result[1]);
			console.log(nodes_);
			//var prometheusDataResults = await this.prometheusData();
			//console.log(prometheusDataResults);
			//var nodes = new vis.DataSet([]);
			//var edges = new vis.DataSet([]);
			
			var graphData = {
				nodes: nodes_,
				edges: edges_
			};
			//console.log("graphData");
			//console.log(graphData);
			if (graphData.nodes.length > 0){
				var outputNetwork = new vis.Network(container, graphData, result[2]);
				console.log(outputNetwork);
			}
			//this.prometheusData();
			return;
		}
	}
	
	
	async getDatasourceId (grafana_url: string, datasource_name: string) {
		const url: string = grafana_url+'/api/datasources/name/'+datasource_name;
		//const url: string = 'http://130.230.52.202/' + grafana_url+'/api/datasources/name/'+datasource_name;
		//const api_token = "Bearer eyJrIjoiV0FSREtjbzlaSlM5VDJNQ09hcWgydjE3OE1velJCVUciLCJuIjoicHJvbWV0aGV1c19rZXkiLCJpZCI6MX0=";
		const api_token = "Bearer eyJrIjoiTTBIRkRvb01lWmt5NnlCZmZ2SkhCNk14bk1JQ3RzVjIiLCJuIjoiZHNLZXkiLCJpZCI6MX0=";
		
		const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': api_token, 'Access-Control-Allow-Origin': 'http://130.230.52.202' }

		const response = await fetch(url, {mode:'no-cors', method: "GET", headers});
		console.log("New json response");
		if (response.status == 200 && response.statusText == "OK") {
			return response.json();
		} else {return [];}
	}
	
	async runPrometheusQuery (url: string) {
		const response = await fetch(url);
		if (response.status == 200 && response.statusText == "OK") {
			return response.json();
		} else { return [];}
	}
	
	async getPrometheusMetrics() {
		var grafana_url = 'http://localhost:3000';
		var datasource_name = 'Prometheus';
			
		//var metrics_data = [] :any[];
		//var metrics_data: (string | number)[] = [];
		//var metrics_data:string[][] = [];
		var metrics_data:string[][] = [];
		//console.log("length of list_of_lists");
		//console.log(metrics_data.length);
		//console.log("datasource_Id inside getPrometheusMetrics function");
		
		//this.getDatasourceId(grafana_url, datasource_name).then((response) => {
		const response = await this.getDatasourceId(grafana_url, datasource_name);
				console.log(response);
				console.log("response aboveeeeeeeeee");
			//if (response.status == 200 && response.statusText == "OK") {} // add error response check here
				//const DS_proxy_url = grafana_url+'/api/datasources/' + response.access + '/' + (response.id).toString() + '/api/v1/query_range?query=up%7Bjob!%3D"prometheus"%7D&start=' + (Math.floor(Date.now()/1000)).toString() + '&end=' + (Math.floor(Date.now()/1000)).toString() + '&step=30';
				var DS_proxy_url = grafana_url+'/api/datasources/' + response.access + '/' + (response.id).toString() + '/api/v1/query_range?query=up{job!="prometheus"}&start=' + (Math.floor(Date.now()/1000)).toString() + '&end=' + (Math.floor(Date.now()/1000)).toString() + '&step=30';
				/*START*/
				const services_status = await this.runPrometheusQuery(DS_proxy_url)
				if (services_status.status == "success"){
					var query = 'scrape_duration_seconds{job!="prometheus"}'
					DS_proxy_url = grafana_url+'/api/datasources/' + response.access + '/' + (response.id).toString() + '/api/v1/query_range?query='+ query +'&start=' + (Math.floor(Date.now()/1000)).toString() + '&end=' + (Math.floor(Date.now()/1000)).toString() + '&step=30';
					console.log(DS_proxy_url);
					const services_response_time = await this.runPrometheusQuery(DS_proxy_url);
					if (services_response_time.status == "success"){
						query = 'scrape_samples_scraped{job!="prometheus"}'
						DS_proxy_url = grafana_url+'/api/datasources/' + response.access + '/' + (response.id).toString() + '/api/v1/query_range?query='+ query +'&start=' + (Math.floor(Date.now()/1000)).toString() + '&end=' + (Math.floor(Date.now()/1000)).toString() + '&step=30';
						
						const services_load_1m = await this.runPrometheusQuery(DS_proxy_url);
						if (services_load_1m.status == "success"){
							for (var i=0; i<services_status.data.result.length; ++i) {
								var arr = [];//[services_status.data.result[i].metric.job, services_status.data.result[i].values[0][1]];
								arr.push(services_status.data.result[i].metric.job);
								arr.push(services_status.data.result[i].values[0][1]);
								if (i < services_response_time.data.result.length)
								arr.push(parseFloat((services_response_time.data.result[i].values[0][1]).toString()).toFixed(2));
								else arr.push("");
								if (i < services_load_1m.data.result.length)
								arr.push((services_load_1m.data.result[i].values[0][1]).toString());
								else arr.push("");
								//console.log(arr);
								metrics_data.push(arr);
							}
							console.log("Printing metrics_data length INSIDE### ");
							console.log(metrics_data.length);
							if (metrics_data.length > 0) {
								console.log("Printing metrics_data array INSIDE### ");
								console.log(metrics_data);
								console.log(metrics_data.length);
							}
						}
					}
				}
				
				console.log("Printing metrics_data length OUTSIDE ### ");
				console.log(metrics_data.length);
				if (metrics_data.length > 0) {
						console.log("Printing metrics_data array OUTSIDE ### ");
						console.log(metrics_data);
						console.log(metrics_data.length);
				}
				/*END*/
				
			//});
		return metrics_data;
	}

	componentDidMount () {
		//this.getPrometheusMetrics();
		this.drawGraph();
	}
	
  render() {

    return (
      <div>
		<p>Microservices Call Dependency Graph</p>
		<div id = "mynetwork" className="Graph"></div>

      </div>
    );
  }
  
}
