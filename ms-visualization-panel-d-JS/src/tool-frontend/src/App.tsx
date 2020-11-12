import React, { PureComponent } from 'react';
//import React, { Component } from 'react';
import { SimpleOptions } from 'types';
//import './style/App.css';
//import './App.css';
import { PanelProps } from '@grafana/data';
import { getNetworkData } from './FormNetwork';
//import fs from 'fs';

//import axios from 'axios';


interface Props extends PanelProps<SimpleOptions> {}

//const s = require('./style/App.css');
export class App extends PureComponent<Props> {

	static grafana_url: string;
	static api_key: string;
	static ms_status_query: string;
	static ms_resTime_query: string;
	static ms_load1m_query: string;
	static db_table: string;
	static service_name: string;
	static closed_bugs: number;
	static open_bugs: number;
	static closed_issues: number;
	static open_issues: number;
	static cost: number;
	static revenue: number;
	static effort: number;
	static show_bugs: number;
	static show_issues: number;
	static show_costRevenue: number;
	static show_effort: number;

	constructor(props: Props){
		super(props);
	}
	
	async mergeMetricsData(){
		const { data } = this.props;
		console.log(data.series);
		if (data.series.length < 1) {
			console.log("No data received from Jaeger server.");
		}
		else {
			console.log("testttttttttt");
			console.log(App.grafana_url);
			const prometheus_metrics = await this.getPrometheusMetrics();
			console.log("Prometheus metrics_data inside drawGraph");
			console.log(prometheus_metrics);
			
			const business_metrics = await this.sortSQLData();
			console.log("Printing SQLData inside draw graph after prometheus metrics");
			console.log(business_metrics);
			
			const result = await getNetworkData(data.series, prometheus_metrics, business_metrics);

			console.log("Result from getNetworkData function");
			console.log(result); //result[0].length < 1
			
			if (result.length > 0)
				this.drawGraph(result);
			else 
				return;

		}
	}
	
	async drawLegend() {
			// Draws legend
			var d3 = require('../d3js_modules/d3.v3.min.js');

			var svg = d3.select("#graph_legend");
			
			if (App.show_bugs == 1) {
			svg.append("rect").attr("x",10).attr("y",20).attr("width", 15).attr("height", 10).style("fill", "red").style("stroke-width", 0)
			svg.append("text").attr("x", 50).attr("y", 24).text("Closed bugs").style("font-size", "12px").attr("alignment-baseline","middle")
			svg.append("rect").attr("x",25).attr("y",20).attr("width", 15).attr("height", 10).style("fill", "grey").style("stroke-width", 0)
			svg.append("text").attr("x", 120).attr("y", 24).text("- Open bugs").style("font-size", "12px").attr("alignment-baseline","middle")
			}

			if (App.show_issues == 1) {	
			svg.append("rect").attr("x",10).attr("y",40).attr("width", 15).attr("height", 10).style("fill", "brown").style("stroke-width", 0)
			svg.append("text").attr("x", 50).attr("y", 44).text("Closed issues").style("font-size", "12px").attr("alignment-baseline","middle")
			svg.append("rect").attr("x",25).attr("y",40).attr("width", 15).attr("height", 10).style("fill", "grey").style("stroke-width", 0)
			svg.append("text").attr("x", 130).attr("y", 44).text("- Open issues").style("font-size", "12px").attr("alignment-baseline","middle")
			}

			if (App.show_costRevenue == 1) {
			svg.append("rect").attr("x",10).attr("y",60).attr("width", 15).attr("height", 10).style("fill", "blue").style("stroke-width", 0)
			svg.append("text").attr("x", 50).attr("y", 64).text("Revenue").style("font-size", "12px").attr("alignment-baseline","middle")
			svg.append("rect").attr("x",25).attr("y",60).attr("width", 15).attr("height", 10).style("fill", "grey").style("stroke-width", 0)
			svg.append("text").attr("x", 100).attr("y", 64).text("- Cost").style("font-size", "12px").attr("alignment-baseline","middle")
			}

			if (App.show_effort == 1) {
			svg.append("rect").attr("x",10).attr("y",80).attr("width", 15).attr("height", 10).style("fill", "#CCCC00").style("stroke-width", 0)
			svg.append("text").attr("x", 52).attr("y", 84).text("Effort Comparison").style("font-size", "12px").attr("alignment-baseline","middle")
			}
	}
	
	async drawGraph(metrics_data:any[]){
		var d3 = require('../d3js_modules/d3.v3.min.js');
		
		// select the svg area for graph's legend

		
		var dataset = {nodes: metrics_data[0], links: metrics_data[1]};	

		console.log("calls check#####");
		console.log(dataset);
		//console.log(dataset.links[0]);
		//console.log(dataset.links[0].calls);
		//console.log((dataset.links[0]).length);
		
		//var business_metrics = [["frontend",10,13,30,15,31,13,27],["customer",11,14,35,18,41,9,19],["route",21,24,45,58,41,19,99], ["mysql", 2, 4, 5, 2, 5, 2, 9], ["redis", 33, 19, 44, 66, 22, 77, 90], ["driver", 22, 23, 25, 26 ,26, 19, 50]];

		//d3.csv("force.csv", function(error, links) {

		var width = 1400,
		height = 750;

		if (dataset.links != null)
		{
			this.drawLegend();
/*
			// Draws legend
			var svg = d3.select("#graph_legend");

			
			if (App.show_bugs == 1) {
			svg.append("rect").attr("x",10).attr("y",20).attr("width", 15).attr("height", 10).style("fill", "red").style("stroke-width", 0)
			svg.append("text").attr("x", 50).attr("y", 24).text("Closed bugs").style("font-size", "12px").attr("alignment-baseline","middle")
			svg.append("rect").attr("x",25).attr("y",20).attr("width", 15).attr("height", 10).style("fill", "grey").style("stroke-width", 0)
			svg.append("text").attr("x", 120).attr("y", 24).text("- Open bugs").style("font-size", "12px").attr("alignment-baseline","middle")
			}

			if (App.show_issues == 1) {	
			svg.append("rect").attr("x",10).attr("y",40).attr("width", 15).attr("height", 10).style("fill", "brown").style("stroke-width", 0)
			svg.append("text").attr("x", 50).attr("y", 44).text("Closed issues").style("font-size", "12px").attr("alignment-baseline","middle")
			svg.append("rect").attr("x",25).attr("y",40).attr("width", 15).attr("height", 10).style("fill", "grey").style("stroke-width", 0)
			svg.append("text").attr("x", 130).attr("y", 44).text("- Open issues").style("font-size", "12px").attr("alignment-baseline","middle")
			}

			if (App.show_costRevenue == 1) {
			svg.append("rect").attr("x",10).attr("y",60).attr("width", 15).attr("height", 10).style("fill", "blue").style("stroke-width", 0)
			svg.append("text").attr("x", 50).attr("y", 64).text("Revenue").style("font-size", "12px").attr("alignment-baseline","middle")
			svg.append("rect").attr("x",25).attr("y",60).attr("width", 15).attr("height", 10).style("fill", "grey").style("stroke-width", 0)
			svg.append("text").attr("x", 100).attr("y", 64).text("- Cost").style("font-size", "12px").attr("alignment-baseline","middle")
			}

			if (App.show_effort == 1) {
			svg.append("rect").attr("x",10).attr("y",80).attr("width", 15).attr("height", 10).style("fill", "#CCCC00").style("stroke-width", 0)
			svg.append("text").attr("x", 52).attr("y", 84).text("Effort Comparison").style("font-size", "12px").attr("alignment-baseline","middle")
			}

*/			
		}


		//const s = require('./App.css');
		
		var force = d3.layout.force()
			.nodes(d3.values(dataset.nodes))
			.links(dataset.links)
			.size([width, height])
			.linkDistance(170)
			.charge(-900)
			.on("tick", tick)
			.start();


		var svg = d3.select("#mynetwork").append("svg")
			.attr("width", width)
			.attr("height", height);

		// build the arrow.
		svg.append("svg:defs").selectAll("marker")
			.data(["end"])      // Different link/path types can be defined here
		  .enter().append("svg:marker")    // This section adds in the arrows
			.attr("id", String)
			.attr("viewBox", "0 -5 10 10")
			.attr("refX", 34)
			.attr("refY", -4)
			.attr("markerUnits", "userSpaceOnUse")
			.attr("markerWidth", 16)
			.attr("markerHeight", 13)
			.attr("orient", "auto")
			.append("svg:path")
			.attr("d", "M0,-5L10,0L0,5");

		var id = -1;
		// add the links and the arrows
		var path = svg.append("svg:g").selectAll("path")
			.data(dataset.links)
		  .enter().append("svg:path")
			//.attr("class", function(d:any) { return "link " + d.type; }) //???
			//.attr("class", "link")
			.style("fill", "none")
			.style("stroke", "#666")
			.style("stroke-width", "1.5px")
			.attr("marker-end", "url(#end)")
			.style("stroke-width", function(d:any) { return ((d.call_weight).toString() + "px"); })
			.attr("id", (function(d:any) {id = id + 1; return id.toString();}));

		// Add a text label.
		var text_ = svg.append("text")
			.attr("x", 0)
			.attr("dy", 0)
			

		// define the nodes
		var node = svg.selectAll(".node")
			.data(dataset.nodes)
		  .enter().append("g")
			.attr("class", "node")
			.call(force.drag);

		//node.append("arc").attr("d", arc({startAngle:0, endAngle:(Math.PI/2)}))

		var svg = d3.select("svg")
		.append("g")
		.attr("transform", "translate(150,75)");

		var arc = d3.svg.arc()
		  .innerRadius(33)
		  .outerRadius(33);
		  
		var arc2 = d3.svg.arc()
		  .innerRadius(27)
		  .outerRadius(27);
		  
		var arc3 = d3.svg.arc()
		  .innerRadius(21)
		  .outerRadius(21);
		  
		var arc4 = d3.svg.arc()
		  .innerRadius(38)
		  .outerRadius(38);
		 
		/*var arc0 = d3.svg.arc()
		  .innerRadius(30)
		  .outerRadius(30);*/

		var msg_bus = ["redis", "kafka", "rabbitMQ"];
		var db = ["mysql", "sql", "MariaDB", "mongoDB"];

		node.append("circle").attr("r", 30).attr("stroke", "transparent").attr("stroke-width", 3).style("fill", "none")

		node.append("image")
			.attr("xlink:href", "https://user-images.githubusercontent.com/34706505/85265523-0ff65380-b47b-11ea-9521-7bbcade80d11.png")
			.attr("x", -10)
			.attr("y", -15)
			.attr("width", (function(d:any) {if (d.name == ("mysql" || "sql" || "MariaDB" || "mongoDB")) {return 20} else return 0}))
			.attr("height", (function(d:any) {if (d.name == ("mysql" || "sql" || "MariaDB" || "mongoDB")) {return 30} else return 0}));

		node.append("image")
			.attr("xlink:href", "https://user-images.githubusercontent.com/34706505/86853657-9a67c580-c0bf-11ea-9dcc-fa74df77b03b.jpg")
			.attr("x", -18)
			.attr("y", -18)
			.attr("width", (function(d:any) {if (d.name == ("redis" || "kafka" || "rabbitMQ")) {return 37} else return 0}))
			.attr("height", (function(d:any) {if (d.name == ("redis" || "kafka" || "rabbitMQ")) {return 37} else return 0}));
			   
		
		node.append("image")
			.attr("xlink:href", "https://user-images.githubusercontent.com/34706505/85266536-a5deae00-b47c-11ea-80e6-32ed869dbd31.png")
			.attr("x", -12)
			.attr("y", -12)
			.attr("width", (function(d:any) {if (msg_bus.indexOf(d.name) < 0) {return 25} else return 0}))
			.attr("height", (function(d:any) {if (db.indexOf(d.name) < 0) {return 25} else return 0}));

		//node.append("circle").attr("r", 30).style("stroke", "green").style("stroke-width", 3)
		/*node.append("path")
		  .attr("stroke-width", 3)
		  .attr("stroke", "green")
		  .attr("d", (function(d:any,i:any) { return arc0({startAngle:0, endAngle:(Math.PI)*2}); }))
		 */
		 
		//node.append("circle").attr("r", 30).style("stroke", "green").style("stroke-width", 3).style("fill", "white")
		if (App.show_effort == 1) {
			node.append("path")
			  .attr("fill", "none")
			  .attr("stroke-width", 3)
			  .attr("stroke", "#CCCC00")
			  .attr("d", (function(d:any,i:any) { return arc3({startAngle:0, endAngle:(Math.PI)*d.effort_spent}); }))
		}

		
		if (App.show_bugs) {  
		node.append("path")
		  .attr("fill", "none")
		  .attr("stroke-width", 3)
		  .attr("stroke", "red")
		  .attr("d", (function(d:any,i:any) { return arc2({startAngle:0, endAngle:(Math.PI)*d.open_to_closed_bugs}); }))
		}
		if (App.show_bugs) {  
		node.append("path")
		  .attr("fill", "none")
		  .attr("stroke-width", 3)
		  .attr("stroke", "grey")
		  .attr("d", (function(d:any,i:any) { return arc2({startAngle:(Math.PI)*d.open_to_closed_bugs, endAngle:(Math.PI)*2}); }))
		}


		if (App.show_costRevenue) { 
		node.append("path")
		  .attr("fill", "none")
		  .attr("stroke-width", 3)
		  .attr("stroke", "blue")
		  .attr("d", (function(d:any,i:any) { return arc4({startAngle:0, endAngle:(Math.PI)*d.cost_to_revenue}); }))
		}
		if (App.show_costRevenue) { 
		node.append("path")
		  .attr("fill", "none")
		  .attr("stroke-width", 3)
		  .attr("stroke", "grey")
		  .attr("d", (function(d:any,i:any) { return arc4({startAngle:(Math.PI)*d.cost_to_revenue, endAngle:(Math.PI)*2}); }))
		}


		if (App.show_issues) { 
		node.append("path")
		  .attr("fill", "none")
		  .attr("stroke-width", 3)
		  .attr("stroke", "brown")
		  .attr("d", (function(d:any,i:any) { return arc({startAngle:0, endAngle:(Math.PI)*d.open_to_closed_issues}); }))
		}
		if (App.show_issues) { 
		node.append("path")
		  .attr("fill", "none")
		  .attr("stroke-width", 3)
		  .attr("stroke", "grey")
		  .attr("d", (function(d:any,i:any) { return arc({startAngle:(Math.PI)*d.open_to_closed_issues, endAngle:(Math.PI)*2}); }))
		}

		// add the text
		node.append("text")
			  .text(function(d:any) {
				return d.name+" "+d.service_response_time+"/ms"+" "+d.service_load_1m+"/m";
			  })
			  .attr('x', 10)
			  .attr('y', 3);
			  
		/*path.append("text")
				.text(function(d:any) {
				//console.log("inside path.append('text')");
				//console.log(d.calls);
				//console.log("LLLLL");
				return d.calls;
			  })
			  .attr('x', 0)
			  .attr('y', 0);*/

		//node.append("title")
			//  .text(function(d) { return d.name+d.revenue; });
	
		for (let i=0; i<=id; i++){
		text_.append("textPath")
			.attr("stroke","black")
			.attr("xlink:href",(function(d:any) {return ("#"+i.toString())}))
			.style("text-anchor","middle") //place the text halfway on the arc
			.attr("startOffset", "50%")
			.text((function (d:any) {return ((dataset.links[i].calls)+"calls")}))
		}
	
		// add the curvy lines
		function tick() {
			path.attr("d", function(d:any) {
				var dx = d.target.x - d.source.x,
					dy = d.target.y - d.source.y,
					dr = Math.sqrt(dx * dx + dy * dy);
				return "M" + 
					d.source.x + "," + 
					d.source.y + "A" + 
					dr + "," + dr + " 0 0,1 " + 
					d.target.x + "," + 
					d.target.y;
			});
			

			node
				.attr("transform", function(d:any) { 
				return "translate(" + d.x + "," + d.y + ")"; });
		}


		

	}
	
	
	async getDatasourceId (datasource_name:string) {
		const url: string = App.grafana_url+'/api/datasources/name/'+datasource_name;
		//const api_token = "Bearer eyJrIjoiQXNmeGFPWmxJVGJuZDV3NHhCV0trYmZvN01ZVWZwdlQiLCJuIjoicHJvbWV0aGV1c0tleSIsImlkIjoxfQ==";
		//const api_token = "Bearer eyJrIjoiV0FSREtjbzlaSlM5VDJNQ09hcWgydjE3OE1velJCVUciLCJuIjoicHJvbWV0aGV1c19rZXkiLCJpZCI6MX0=";
		//below for lenovo linux machine
		//const api_token = "Bearer eyJrIjoiQU1pMzFaZXlTd0VsbkkwcGhTRnpGcnY3ZGNpb2JOdmEiLCJuIjoibXN2aXNLZXkiLCJpZCI6MX0=";
		const api_token = "Bearer "+ App.api_key;
		console.log(url);

		//below one either for server or windows. most probably server?
		//const api_token = "Bearer eyJrIjoiTTBIRkRvb01lWmt5NnlCZmZ2SkhCNk14bk1JQ3RzVjIiLCJuIjoiZHNLZXkiLCJpZCI6MX0=";
		
		const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': api_token }
		const response = await fetch(url, {mode:'no-cors', method: "GET", headers});
		//const response = await fetch(url, {headers});
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
		//var grafana_url = 'http://localhost:3000';
		//var grafana_url = 'http://130.230.52.202';
		var datasource_name = 'Prometheus';

		var metrics_data:string[][] = [];
		
		//this.getDatasourceId(grafana_url, datasource_name, api_key).then((response) => {
		const response = await this.getDatasourceId(datasource_name);
				console.log(response);
				console.log("response from datasource api");
			//if (response.status == 200 && response.statusText == "OK") {} // add error response check here
				//const DS_proxy_url = grafana_url+'/api/datasources/' + response.access + '/' + (response.id).toString() + '/api/v1/query_range?query=up%7Bjob!%3D"prometheus"%7D&start=' + (Math.floor(Date.now()/1000)).toString() + '&end=' + (Math.floor(Date.now()/1000)).toString() + '&step=30';

				var DS_proxy_url = App.grafana_url+'/api/datasources/' + response.access + '/' + (response.id).toString() + '/api/v1/query_range?query=' + App.ms_status_query + '&start=' + (Math.floor(Date.now()/1000)).toString() + '&end=' + (Math.floor(Date.now()/1000)).toString() + '&step=30';
				/*START*/
				const services_status = await this.runPrometheusQuery(DS_proxy_url)
				if (services_status.status == "success"){
					//var query = 'scrape_duration_seconds{job!="prometheus"}'
					DS_proxy_url = App.grafana_url+'/api/datasources/' + response.access + '/' + (response.id).toString() + '/api/v1/query_range?query='+ App.ms_resTime_query +'&start=' + (Math.floor(Date.now()/1000)).toString() + '&end=' + (Math.floor(Date.now()/1000)).toString() + '&step=30';
					console.log(DS_proxy_url);
					const services_response_time = await this.runPrometheusQuery(DS_proxy_url);
					if (services_response_time.status == "success"){
						//query = 'scrape_samples_scraped{job!="prometheus"}'
						DS_proxy_url = App.grafana_url+'/api/datasources/' + response.access + '/' + (response.id).toString() + '/api/v1/query_range?query='+ App.ms_load1m_query +'&start=' + (Math.floor(Date.now()/1000)).toString() + '&end=' + (Math.floor(Date.now()/1000)).toString() + '&step=30';
						
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
							console.log("Metrics_data length");
							console.log(metrics_data.length);
						}
					}
				}
				
				console.log("Printing metrics_data length OUTSIDE ### ");
				console.log(metrics_data.length);
				/*END*/
				
			//});
		return metrics_data;
	}
	
	async getSQLData(){
		console.log("Inside getSQLData() FUNCTION");
		//var grafana_url = 'http://localhost:3000';
		//var grafana_url = 'http://130.230.52.202:80';
		//var datasource_name = 'MySQL';
		//var metrics_data:string[][] = [];
		//const response = await this.getDatasourceId();
		
		const url: string = App.grafana_url + '/api/tsdb/query';
		//const request_payload = {'from':'1591250314728','to':'1591271914728','queries':'[{"refId":"A","intervalMs":60000,"maxDataPoints":900,"datasourceId":86,"rawSql":"SELECT *\nFROM metrics;\n","format":"table"}]'};
		//const request_payload = {queries:[{refId:"tempvar",datasourceId:86,"rawSql":"SELECT\n  closed_bugs_count AS \"closed_bugs\",\n  open_bugs_count AS \"open_bugs\",\n  closed_issues_count AS \"closed_issues\",\n  open_issues_count AS \"open_issues\",\n  revenue AS \"revenue\",\n  cost AS \"cost\",\n  effort AS \"effort\",\n  service_name AS \"service_name\"\nFROM metrics\nORDER BY service_name",format:"table"}],"from":"1591251225566","to":"1591272825566"};
		//const request_payload = {"from":"1591257698882","to":"1591279298882","queries":[{"refId":"A","intervalMs":60000,"maxDataPoints":466,"datasourceId":86,"rawSql":"SELECT\n  closed_bugs_count AS \"closed_bugs\",\n  open_bugs_count AS \"open_bugs\",\n  closed_issues_count AS \"closed_issues\",\n  open_issues_count AS \"open_issues\",\n  revenue AS \"revenue\",\n  cost AS \"cost\",\n  effort AS \"effort\",\n  service_name AS \"service_name\"\nFROM metrics\nORDER BY service_name","format":"table"}]};
		const datasource_name = "MySQL";
		const datasourceId = await this.getDatasourceId(datasource_name);
		const request_payload = {"from":"1591257698882","to":"1591279298882","queries":[{"refId":"A","intervalMs":60000,"maxDataPoints":466,"datasourceId":datasourceId.id,"rawSql":"SELECT\n  " + App.service_name+ " AS \"service_name\",\n  " + App.closed_bugs + " AS \"closed_bugs\",\n  " + App.open_bugs + " AS \"open_bugs\",\n  " + App.closed_issues + " AS \"closed_issues\",\n  " + App.open_issues + " AS \"open_issues\",\n  " + App.revenue + " AS \"revenue\",\n  " + App.cost + " AS \"cost\",\n  " + App.effort + " AS \"effort\"\nFROM " + App.db_table + "\nORDER BY " + App.service_name + "\n","format":"table"}]};
		
		const res = await fetch(url, {
		  method: "POST",
		  headers: new Headers({
			"Content-Type": "application/json"
		  }),
		  body: JSON.stringify(request_payload)
		});
		//
		//const headers = { 'Content-Type': 'application/json' }
		//const res = await fetch(url, {headers}, {JSON.stringify(request_payload)});
		console.log(res);
		//const res = await fetch(url, {headers});
		if (res.status == 200 && res.statusText == "OK") {
			return res.json();
		} else { return [];}
	}
	
	async sortSQLData() {
		const res = await this.getSQLData();
		
		if (res != [])
		{
			return res.results.A.tables[0].rows;
		}
		else 
			return [];
	}


	async readConfiguration() {
		/*const metricsData = (window as any).__INITIAL_DATA__;
		type metricsData = {
			service_name: string;
			closed_bugs: string;
			open_bugs: string;
			closed_issues: string;
			open_issues: string;
			revenue: string;
			cost: string;
			effort: string;
			show_bugs: number;
			show_issues: number;
			show_costRevenue: number;
			//show_effort: number;
		};*/


		//var config = require('/home/fouzia/Documents/Thesis/msvis.json');
		//const fres = await this.getFileData('file:///home/fouzia/Documents/Thesis/msvis.json');
		//console.log("fres");
	

		var config = require('/etc/grafana/msvis.json');
		console.log(config);

		App.grafana_url = config['grafana_url'];
		App.api_key = config['api_key_admin'];
		App.ms_status_query = config['services_status_query_prometheus'];
		App.ms_resTime_query = config['services_responseTime_query_prometheus'];
		App.ms_load1m_query = config['services_responseTime_query_prometheus'];
		App.db_table = config['mysql_db_table_name'];
		App.service_name = config['erviceName_col_name'];
		App.closed_bugs = config['closed_bugs_count_col_name'];
		App.open_bugs = config['open_bugs_count_col_name'];
		App.closed_issues = config['closed_issues_count_col_name'];
		App.open_issues = config['open_issues_count_col_name'];
		App.revenue = config['services_revenue_col_name'];
		App.cost = config['services_cost_col_name'];
		App.effort = config['services_effort_col_name'];
		App.show_bugs = config['show_bugs_ratio'];
		App.show_issues =config['show_issues_ratio'];
		App.show_costRevenue = config['show_costToRevenue_ratio'];
		App.show_effort = config['show_relative_effort'];
		console.log(App.show_effort);
	}

	async readTextFile(url:string)
	{

		const config = await this.runPrometheusQuery(url);
		App.grafana_url = config['grafana_url'];
		App.api_key = config['api_key_admin'];
		App.ms_status_query = config['services_status_query_prometheus'];
		App.ms_resTime_query = config['services_responseTime_query_prometheus'];
		App.ms_load1m_query = config['services_responseTime_query_prometheus'];
		App.db_table = config['mysql_db_table_name'];
		App.service_name = config['erviceName_col_name'];
		App.closed_bugs = config['closed_bugs_count_col_name'];
		App.open_bugs = config['open_bugs_count_col_name'];
		App.closed_issues = config['closed_issues_count_col_name'];
		App.open_issues = config['open_issues_count_col_name'];
		App.revenue = config['services_revenue_col_name'];
		App.cost = config['services_cost_col_name'];
		App.effort = config['services_effort_col_name'];
		App.show_bugs = config['show_bugs_ratio'];
		App.show_issues =config['show_issues_ratio'];
		App.show_costRevenue = config['show_costToRevenue_ratio'];
		App.show_effort = config['show_relative_effort'];
		console.log(App.grafana_url);


	    /*var configFile = new XMLHttpRequest();
	    configFile.open("GET", url, true);
	    configFile.onreadystatechange = function ()
	    {
		if(configFile.readyState === 4)
		{
		    if(configFile.status === 200 || configFile.status == 0)
		    {
		        var config_obj = configFile.responseText;
			//var CONFIG = require('./msvis.json');
			console.log(config_obj);
			let config:string = (JSON.parse(config_obj));
		App.grafana_url = config['grafana_url'];
		App.api_key = config['api_key_admin'];
		App.ms_status_query = config['services_status_query_prometheus'];
		App.ms_resTime_query = config['services_responseTime_query_prometheus'];
		App.ms_load1m_query = config['services_responseTime_query_prometheus'];
		App.db_table = config['mysql_db_table_name'];
		App.service_name = config['erviceName_col_name'];
		App.closed_bugs = config['closed_bugs_count_col_name'];
		App.open_bugs = config['open_bugs_count_col_name'];
		App.closed_issues = config['closed_issues_count_col_name'];
		App.open_issues = config['open_issues_count_col_name'];
		App.revenue = config['services_revenue_col_name'];
		App.cost = config['services_cost_col_name'];
		App.effort = config['services_effort_col_name'];
		App.show_bugs = config['show_bugs_ratio'];
		App.show_issues =config['show_issues_ratio'];
		App.show_costRevenue = config['show_costToRevenue_ratio'];
		App.show_effort = config['show_relative_effort'];
		console.log(App.grafana_url);
		        
		    }
			else console.log("unable to read config file, resource was not fetched.");
		}
		else console.log("Read config file operation failed");
	    }
	    configFile.send(null);
	    */
	}

	async componentDidMount () {
		//this.sortSQLData();
		//this.getPrometheusMetrics();
		//this.readConfiguration();
		this.readConfiguration();
		this.mergeMetricsData();
	}
	
  render() {
	var legend_style = { "width":"300px", 'height': '150px', 'padding-top': '5px', 'position': 'absolute' } as React.CSSProperties;
	var mynetwork_style = {"width":"1400px", 'height': '750px', border: 'solid', 'border-width': '0.25px', 'border-color': 'grey', 'padding': '5px 5px 5px 5px', 'overflow': 'scroll'} as React.CSSProperties;

    //var mynetwork_style = { float:'left', border: 'solid', 'padding-top': '5px', 'overflow': 'scroll' } as React.CSSProperties;

	return (
		//working blocks below
/*
	  <div id="mynetwork" className="Graph" style={legend_style}>
		<p>Microservices Call Dependency Graph</p>
		<div style={mynetwork_style}><svg id="graph_legend" ></svg></div>
	  </div>
*/
	  <div id="mynetwork" style={mynetwork_style}>
		<p style={legend_style}>Microservices Call Dependency Graph<svg id="graph_legend" ></svg></p>

	  </div>
    );
  }
  
}
