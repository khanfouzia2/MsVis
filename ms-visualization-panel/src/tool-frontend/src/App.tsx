import React, { PureComponent } from 'react';
//import React, { Component } from 'react';
import { SimpleOptions } from 'types';
import './style/App.css';
import { PanelProps } from '@grafana/data';
import { getNetworkData } from './FormNetwork';

interface Props extends PanelProps<SimpleOptions> {}

//const s = require('./style/App.css');
export class App extends PureComponent<Props> {

	constructor(props: Props){
		super(props);
	}
	
	async drawGraph(){
		const { data } = this.props;
		if (data.series.length < 1) {
		  return <div>Data not available...</div>;
		}
		else {
			const result = await getNetworkData(data.series);
			console.log(data)
			console.log("Result inside else block after calling the function");
			console.log(result);
			var vis = require('../node_modules/vis/dist/vis.js');
			var container = document.getElementById("mynetwork");
			const nodes_ = new vis.DataSet(result[0]);
			const edges_ = new vis.DataSet(result[1]);
			console.log("hhehehehhehehhehe22");
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
			return;
		}
	}

	componentDidMount () {
		this.drawGraph();
	}
	
  render() {

    return (
      <div>
		<p>MS Visualization Graph</p>
		<div id = "mynetwork" className="Graph"></div>

      </div>
    );
  }
  
}
