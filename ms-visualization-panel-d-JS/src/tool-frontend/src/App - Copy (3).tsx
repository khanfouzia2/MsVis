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
		const api_token = "Bearer eyJrIjoiQXNmeGFPWmxJVGJuZDV3NHhCV0trYmZvN01ZVWZwdlQiLCJuIjoicHJvbWV0aGV1c0tleSIsImlkIjoxfQ==";
		const headers = { 'Content-Type': 'application/json', 'Authorization': api_token }

		const response = await fetch(url, {headers});
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
		console.log("length of list_of_lists");
		console.log(metrics_data.length);
		console.log("datasource_Id inside getPrometheusMetrics function");
		this.getDatasourceId(grafana_url, datasource_name).then((response) => {
			//if (response.status == 200 && response.statusText == "OK") {} // add error response check here
				console.log(response);
				console.log(response.id);
				console.log(response.access);
				//const DS_proxy_url = grafana_url+'/api/datasources/' + response.access + '/' + (response.id).toString() + '/api/v1/query_range?query=up%7Bjob!%3D"prometheus"%7D&start=' + (Math.floor(Date.now()/1000)).toString() + '&end=' + (Math.floor(Date.now()/1000)).toString() + '&step=30';
				var DS_proxy_url = grafana_url+'/api/datasources/' + response.access + '/' + (response.id).toString() + '/api/v1/query_range?query=up{job!="prometheus"}&start=' + (Math.floor(Date.now()/1000)).toString() + '&end=' + (Math.floor(Date.now()/1000)).toString() + '&step=30';

				console.log(DS_proxy_url);
				this.runPrometheusQuery(DS_proxy_url).then((services_status) => {
					//if (response.status == 200 && response.statusText == "OK" && response.data.result.length>0) {
					if (services_status.status == "success"){
						console.log(services_status);
						console.log(services_status.data.result.length);
						console.log(services_status.status);
						console.log("logs above");
						var query = 'scrape_duration_seconds{job!="prometheus"}'
						DS_proxy_url = grafana_url+'/api/datasources/' + response.access + '/' + (response.id).toString() + '/api/v1/query_range?query='+ query +'&start=' + (Math.floor(Date.now()/1000)).toString() + '&end=' + (Math.floor(Date.now()/1000)).toString() + '&step=30';
						console.log(DS_proxy_url);
						this.runPrometheusQuery(DS_proxy_url).then((services_response_time) => {
							if (services_response_time.status == "success" && services_response_time.data.result.length>0){
								console.log("services_response_time");
								console.log(services_response_time);
								query = 'scrape_samples_scraped{job!="prometheus"}'
								DS_proxy_url = grafana_url+'/api/datasources/' + response.access + '/' + (response.id).toString() + '/api/v1/query_range?query='+ query +'&start=' + (Math.floor(Date.now()/1000)).toString() + '&end=' + (Math.floor(Date.now()/1000)).toString() + '&step=30';
								this.runPrometheusQuery(DS_proxy_url).then((services_load_1m) => {
									if (services_load_1m.status == "success" && services_load_1m.data.result.length>0 ){
										
										console.log("services_load_1m");
										console.log(services_load_1m);
										for (var i=0; i<services_status.data.result.length; ++i) {
											var arr = [];//[services_status.data.result[i].metric.job, services_status.data.result[i].values[0][1]];
											arr.push(services_status.data.result[i].metric.job);
											arr.push(services_status.data.result[i].values[0][1]);
											if (i < services_response_time.data.result.length)
												arr.push((services_response_time.data.result[i].values[0][1]).toString());
												else arr.push("");
											if (i < services_load_1m.data.result.length)
												arr.push((services_load_1m.data.result[i].values[0][1]).toString());
												else arr.push("");
											console.log(arr);
											metrics_data.push(arr);
										}
										
									}
								});

							}
						});
						 
					}
					
				});
				
				if (metrics_data.length > 0) {
						console.log("Printing metrics_data array ");
						console.log(metrics_data);
				}
				
			});
		return Promise.all(metrics_data);
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
