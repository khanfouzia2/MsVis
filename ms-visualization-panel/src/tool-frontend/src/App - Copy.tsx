import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import './style/App.css';

interface Props extends PanelProps<SimpleOptions> {}

//const s = require('./style/App.css');
export class App extends PureComponent<Props, State> {
  constructor(props: Props, state: State){
		super(props);
		this.state={drawGraphResponse: []};
	}
	async calldrawGraph(){
		var vis = require('../node_modules/vis/dist/vis.js');
		await fetch('http://localhost:9000/drawGraph')
		.then(res => res.json())
		.then(res => this.setState({drawGraphResponse: res}));
		
		console.log(this.state.drawGraphResponse[1]);
		
		var container = document.getElementById('mynetwork');
		var nodes = new vis.DataSet(this.state.drawGraphResponse[0]);
		var edges = new vis.DataSet(this.state.drawGraphResponse[1]);
		var data = {
					nodes: nodes,
					edges: edges
				};
		var network = new vis.Network(container, data, this.state.drawGraphResponse[2]);
		console.log(network);
		
	}

	componentDidMount () {
		this.calldrawGraph();
	}
  render() {
    //const { /*options, data,*/ width, height } = this.props;

    return (
      <div
        /*style={{
          position: 'relative',
          width,
          height,
        }}*/
      >
		<p>MS Visualization Graph</p>
		<div id = "mynetwork" className="Graph"></div>

      </div>
    );
  }
}
