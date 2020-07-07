import React, { PureComponent } from 'react';
//import React, { Component } from 'react';
import { SimpleOptions } from 'types';
//import './style/App.css';
//import './App.css';
import { PanelProps } from '@grafana/data';
import { getNetworkData } from './FormNetwork';

//import axios from 'axios';


interface Props extends PanelProps<SimpleOptions> {}

//const s = require('./style/App.css');
export class App extends PureComponent<Props> {

	constructor(props: Props){
		super(props);
	}
	
	async mergeMetricsData(){
		const { data } = this.props;
		console.log(data.series);
		if (data.series.length < 1) {

		}
		else {
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
			/*var vis = require('../node_modules/vis/dist/vis.js');
			var container = document.getElementById("mynetwork");
			const nodes_ = new vis.DataSet(result[0]);
			const edges_ = new vis.DataSet(result[1]);
			console.log(nodes_);
			
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
			return;*/
		}
	}
	
	async drawGraph(metrics_data:any[]){
		var d3 = require('../d3js_modules/d3.v3.min.js');
		
		// select the svg area for graph's legend
		var svg = d3.select("#graph_legend")

		// Draw legend
		svg.append("circle").attr("cx",50).attr("cy",50).attr("r", 7).style("fill", "black").style("stroke-width", 0)
		svg.append("circle").attr("cx",50).attr("cy",70).attr("r", 7).style("fill", "red").style("stroke-width", 0)
		svg.append("circle").attr("cx",50).attr("cy",90).attr("r", 7).style("fill", "#CCCC00").style("stroke-width", 0)
		svg.append("circle").attr("cx",50).attr("cy",110).attr("r", 7).style("fill", "blue").style("stroke-width", 0)
		svg.append("circle").attr("cx",50).attr("cy",130).attr("r", 7).style("fill", "brown").style("stroke-width", 0)
		svg.append("text").attr("x", 70).attr("y", 50).text("Microservice").style("font-size", "12px").attr("alignment-baseline","middle")
		svg.append("text").attr("x", 70).attr("y", 70).text("Closed bugs").style("font-size", "12px").attr("alignment-baseline","middle")
		svg.append("text").attr("x", 70).attr("y", 90).text("Effort spent").style("font-size", "12px").attr("alignment-baseline","middle")
		svg.append("text").attr("x", 70).attr("y", 110).text("Issues closed").style("font-size", "12px").attr("alignment-baseline","middle")
		svg.append("text").attr("x", 70).attr("y", 130).text("Revenue to cost ratio").style("font-size", "12px").attr("alignment-baseline","middle")
		/*var dataset = {
			nodes: [
			{name1: "frontend", effort: 1, open_issues: 20, closed_issues: 30, open_bugs: 50, closed_bugs: 69, cost: 5000, revenue: 9800},
			{name1: "customer", effort: 1.5, open_issues: 90, closed_issues: 33, open_bugs: 10, closed_bugs: 49, cost: 4000, revenue: 6000},
			{name1: "route", effort: 1.25, open_issues: 70, closed_issues: 20, open_bugs: 40, closed_bugs: 33, cost: 9900, revenue: 50000},
			{name1: "mysql", effort: 1.75, open_issues: 20, closed_issues: 30, open_bugs: 60, closed_bugs: 12, cost: 700, revenue: 55000},
			{name1: "redis", effort: 2, open_issues: 10, closed_issues: 70, open_bugs: 70, closed_bugs: 66, cost: 400, revenue: 2000},
			{name1: "driver", effort: 0.75, open_issues: 50, closed_issues: 60, open_bugs: 80, closed_bugs: 44, cost: 6600, revenue: 1000}
			],
			links: [
			{source: 5, target: 4, call: "0"},
			{source: 1, target: 3, call: "1"},
			{source: 0, target: 5, call: "3"},
			{source: 0, target: 2, call: "9"},
			{source: 0, target: 1, call: "14"}
			]
		};*/
		
		var dataset = {nodes: metrics_data[0], links: metrics_data[1]};	

		console.log("calls check#####");
		console.log(dataset);
		console.log(dataset.links[0]);
		console.log(dataset.links[0].calls);
		//var business_metrics = [["frontend",10,13,30,15,31,13,27],["customer",11,14,35,18,41,9,19],["route",21,24,45,58,41,19,99], ["mysql", 2, 4, 5, 2, 5, 2, 9], ["redis", 33, 19, 44, 66, 22, 77, 90], ["driver", 22, 23, 25, 26 ,26, 19, 50]];

		//d3.csv("force.csv", function(error, links) {

		var width = 1200,
			height = 570;

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

		node.append("circle").attr("r", 30).style("stroke", "transparent").style("stroke-width", 3).style("fill", "white")

		node.append("image")
			.attr("xlink:href", "https://user-images.githubusercontent.com/34706505/85265523-0ff65380-b47b-11ea-9521-7bbcade80d11.png")
			.attr("x", -10)
			.attr("y", -15)
			.attr("width", (function(d:any) {if (d.name == ("mysql" || "sql" || "MariaDB" || "mongoDB")) {return 20} else return 0}))
			.attr("height", (function(d:any) {if (d.name == ("mysql" || "sql" || "MariaDB" || "mongoDB")) {return 30} else return 0}));

		node.append("image")
			.attr("xlink:href", "https://user-images.githubusercontent.com/34706505/85262153-0c140280-b476-11ea-955a-8fb3173167b9.jpg")
			.attr("x", -18)
			.attr("y", -18)
			.attr("width", (function(d:any) {if (d.name == ("redis" || "kafka" || "rabbitMQ")) {return 37} else return 0}))
			.attr("height", (function(d:any) {if (d.name == ("redis" || "kafka" || "rabbitMQ")) {return 37} else return 0}));
			   
		
		node.append("image")
			.attr("xlink:href", "https://user-images.githubusercontent.com/34706505/85266536-a5deae00-b47c-11ea-80e6-32ed869dbd31.png")
			.attr("x", -20)
			.attr("y", -20)
			.attr("width", (function(d:any) {if (msg_bus.indexOf(d.name) < 0) {return 40} else return 0}))
			.attr("height", (function(d:any) {if (db.indexOf(d.name) < 0) {return 40} else return 0}));

		//node.append("circle").attr("r", 30).style("stroke", "green").style("stroke-width", 3)
		/*node.append("path")
		  .attr("stroke-width", 3)
		  .attr("stroke", "green")
		  .attr("d", (function(d:any,i:any) { return arc0({startAngle:0, endAngle:(Math.PI)*2}); }))
		 */
		 
		//node.append("circle").attr("r", 30).style("stroke", "green").style("stroke-width", 3).style("fill", "white")
		node.append("path")
		  .attr("fill", "none")
		  .attr("stroke-width", 3)
		  .attr("stroke", "#CCCC00")
		  .attr("d", (function(d:any,i:any) { return arc3({startAngle:0, endAngle:(Math.PI)*d.effort_spent}); }))
		  
		node.append("path")
		  .attr("fill", "none")
		  .attr("stroke-width", 3)
		  .attr("stroke", "red")
		  .attr("d", (function(d:any,i:any) { return arc2({startAngle:0, endAngle:(Math.PI)*d.open_to_closed_bugs}); }))


		node.append("path")
		  .attr("fill", "none")
		  .attr("stroke-width", 3)
		  .attr("stroke", "brown")
		  .attr("d", (function(d:any,i:any) { return arc4({startAngle:0, endAngle:(Math.PI)*d.cost_to_revenue}); }))

		node.append("path")
		  .attr("fill", "none")
		  .attr("stroke-width", 3)
		  .attr("stroke", "blue")
		  .attr("d", (function(d:any,i:any) { return arc({startAngle:0, endAngle:(Math.PI)*d.open_to_closed_issues}); }))

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
	
	
	async getDatasourceId (grafana_url: string, datasource_name: string) {
		const url: string = grafana_url+'/api/datasources/name/'+datasource_name;
		//const api_token = "Bearer eyJrIjoiQXNmeGFPWmxJVGJuZDV3NHhCV0trYmZvN01ZVWZwdlQiLCJuIjoicHJvbWV0aGV1c0tleSIsImlkIjoxfQ==";
		//const api_token = "Bearer eyJrIjoiV0FSREtjbzlaSlM5VDJNQ09hcWgydjE3OE1velJCVUciLCJuIjoicHJvbWV0aGV1c19rZXkiLCJpZCI6MX0=";
		const api_token = "Bearer eyJrIjoiTTBIRkRvb01lWmt5NnlCZmZ2SkhCNk14bk1JQ3RzVjIiLCJuIjoiZHNLZXkiLCJpZCI6MX0=";
		
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
		var grafana_url = 'http://130.230.52.202';
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
				console.log("response from datasource api");
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
		var grafana_url = 'http://130.230.52.202:80';
		//var datasource_name = 'MySQL';
		//var metrics_data:string[][] = [];
		//const response = await this.getDatasourceId(grafana_url, datasource_name);
		
		const url: string = grafana_url + '/api/tsdb/query';
		//const request_payload = {'from':'1591250314728','to':'1591271914728','queries':'[{"refId":"A","intervalMs":60000,"maxDataPoints":900,"datasourceId":86,"rawSql":"SELECT *\nFROM metrics;\n","format":"table"}]'};
		//const request_payload = {queries:[{refId:"tempvar",datasourceId:86,"rawSql":"SELECT\n  closed_bugs_count AS \"closed_bugs\",\n  open_bugs_count AS \"open_bugs\",\n  closed_issues_count AS \"closed_issues\",\n  open_issues_count AS \"open_issues\",\n  revenue AS \"revenue\",\n  cost AS \"cost\",\n  effort AS \"effort\",\n  service_name AS \"service_name\"\nFROM metrics\nORDER BY service_name",format:"table"}],"from":"1591251225566","to":"1591272825566"};
		//const request_payload = {"from":"1591257698882","to":"1591279298882","queries":[{"refId":"A","intervalMs":60000,"maxDataPoints":466,"datasourceId":86,"rawSql":"SELECT\n  closed_bugs_count AS \"closed_bugs\",\n  open_bugs_count AS \"open_bugs\",\n  closed_issues_count AS \"closed_issues\",\n  open_issues_count AS \"open_issues\",\n  revenue AS \"revenue\",\n  cost AS \"cost\",\n  effort AS \"effort\",\n  service_name AS \"service_name\"\nFROM metrics\nORDER BY service_name","format":"table"}]};
		const datasource_name = "MySQL";
		const datasourceId = await this.getDatasourceId(grafana_url, datasource_name);
		const request_payload = {"from":"1591257698882","to":"1591279298882","queries":[{"refId":"A","intervalMs":60000,"maxDataPoints":466,"datasourceId":datasourceId.id,"rawSql":"SELECT\n  service_name AS \"service_name\",\n  closed_bugs_count AS \"closed_bugs\",\n  open_bugs_count AS \"open_bugs\",\n  closed_issues_count AS \"closed_issues\",\n  open_issues_count AS \"open_issues\",\n  revenue AS \"revenue\",\n  cost AS \"cost\",\n  effort AS \"effort\"\nFROM metrics\nORDER BY service_name\n","format":"table"}]};
		
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

	componentDidMount () {
		//this.sortSQLData();
		//this.getPrometheusMetrics();
		this.mergeMetricsData();
	}
	
  render() {
	var legend_style = { cssFloat:'left', borderStyle:'solid' } as React.CSSProperties;
	var mynetwork_style = {"height":"150px", "width":"200px", cssFloat:'right'} as React.CSSProperties;
    //var mynetwork_style = { float:'left', border-style:'solid', height:'150px', width:'200px' } as React.CSSProperties;
/*	var legend_style = {
     splitterStyle: {
         height: 150px,
		 width: 200px,
		 float: right
     }
};*/
	return (
      /*<div style="height:700px;width:600px">
		<p>Microservices Call Dependency Graph</p>
		<div id = "mynetwork" className="Graph"></div>
      </div>*/
	  <div id="mynetwork" className="Graph" style={legend_style}>
		<p>Microservices Call Dependency Graph</p>
		<div style={mynetwork_style}><svg id="graph_legend" ></svg></div>
	  </div>
    );
  }
  
}