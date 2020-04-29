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
			const result = await getNetworkData(data.series);
			console.log(data)
			console.log("Result inside else block after calling the function");
			console.log(result); //result[0].length < 1
			
			//if (result[0].length <1){} else {}
			var vis = require('../node_modules/vis/dist/vis.js');
			var container = document.getElementById("mynetwork");
			const nodes_ = new vis.DataSet(result[0]);
			const edges_ = new vis.DataSet(result[1]);
			console.log(nodes_);
			var prometheusDataResults = await this.prometheusData();
			console.log(prometheusDataResults);
			//var nodes = new vis.DataSet([]);
			//var edges = new vis.DataSet([]);
			
			var graphData = {
				nodes: nodes_,
				edges: edges_
			};
			console.log("graphData");
			console.log(graphData);
			var outputNetwork = new vis.Network(container, graphData, result[2]);
			console.log(outputNetwork);
			//this.prometheusData();
			return;
		}
	}
	
	async prometheusData() {
				
			console.log("Prometheus data --------------");

			const url: string = 'http://localhost:3000/api/datasources/proxy/80/api/v1/query_range?query=up&start=1586518560&end=1586540160&step=30';

				/*try {
					const response = await axios.get('http://localhost:9090/api/v1/query?query=up&time=1586522855.083&_=1586522832416');
					console.log("response inside try block");

					console.log(response);

				} catch (exception) {
					process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
				}*/
			//thread.sleep(4000);
			var response = await fetch(
				url
				//"https://jsonplaceholder.typicode.com/todos"
			);

			var res_ = await response.json();
			console.log(res_);
			console.log(res_.data);
			console.log(res_.data.result);
			console.log(res_.data.result.length);
			console.log(res_.data.result[0]);
			console.log(res_.data.result[0].metric['job']); //returns name of the job
			var arr = [];
			for (var i=0; i < res_.data.result.length; ++i)
			{
				arr.push(res_.data.result[i].metric['job']);
				console.log(res_.data.result[i].values[res_.data.result[i].values.length-1][1]);
			}
			//arr.push(res_.data.result[0].metric['job']);
			//arr.push(res_.data.result[1].metric['job']);
			//arr.push(res_.data.result[2].metric['job']);

			console.log("###########");
			return arr;
	}
	
	/*function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
	}*/

	componentDidMount () {
		this.drawGraph();
		//this.prometheusData();
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
