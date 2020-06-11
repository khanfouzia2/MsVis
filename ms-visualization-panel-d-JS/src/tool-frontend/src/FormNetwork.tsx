//import DataFrame from 'dataframe-js';


//DO ADD THE CHECKS TO READ COLUMN VALUES FIRST/ also add checks before fetching parent, child or callCount data
export function getNetworkData (data: any[], data_: any[]) : any[] {
	console.log("Printing grafana DS response inside getNetworkData function");
	console.log(data);
	
	console.log("Printing prometheus Metrics data inside getNetworkData function");
	
	var prometheusData:any[] = data_;
	console.log(prometheusData);
	//list.sort((a, b) => (a.color > b.color) ? 1 : -1)
	//To create array of nodes, edges and options
	var responseArray:any[] = [];
	if ((data[0].fields[0].values.length > 0) && (data[0].fields[0]["name"] == "Parent") && (data[0].fields[1]["name"] == "Child") && (data[0].fields[2]["name"] == "CallCount"))
	{
		const parentNodes:string[] = data[0].fields[0].values.toArray();
		const childNodes = data[0].fields[1].values.toArray();
		const callCountArr = data[0].fields[2].values.toArray();

		var min_scale = 1;
		var max_scale = 6;
		var min_val = arrayMin(callCountArr);
		var max_val = arrayMax(callCountArr);
		//console.log("Printing min and max values ");
		
		var dbs = ['mysql', 'postgre', 'postgresql', 'sql', 'oracle'];
		var msg_bus = ['redis', 'kafka', 'rabbitmq'];
		//console.log("printing simple arrays");
		//console.log(dbs);
		var array_of_nodes:any[] = [];
		var array_of_edges = [];
		
		var uniqueNodes = (parentNodes.concat(childNodes)).sort(); //added sort()
		//console.log(uniqueNodes);
		uniqueNodes = [...new Set(uniqueNodes)]; //works
		console.log(uniqueNodes);
		
		var metricsData = [];	
		for (let i=0; i< uniqueNodes.length; ++i)
		{
			console.log("lengthhhhhhhhh");
			console.log(prometheusData);
			console.log(prometheusData[0]);
			console.log(len(prometheusData).toString());
			for (let j=0; j<len(prometheusData); ++j){
				console.log(prometheusData[j][0]);
				console.log(uniqueNodes[i]);
				if (prometheusData[j][0].toLowerCase() == uniqueNodes[i].toLowerCase()){
					metricsData = prometheusData[j];
					console.log("metric is: ");
					console.log(metricsData);
					prometheusData = prometheusData.slice(0, j).concat(prometheusData.slice(j + 1, prometheusData.length));
					break;
				}
			}
			
			var label = uniqueNodes[i];
			if (metricsData.length > 0)
				label = uniqueNodes[i] + ", (" + metricsData[2] + "ms, " + metricsData[3] + "/m)";

			if (dbs.includes(uniqueNodes[i].toLowerCase())){
				array_of_nodes.push({ 'id': uniqueNodes[i], 'label': label, 'shape': "database", 'color': "gray" , 'size': '20'});
			}
				else if (msg_bus.includes(uniqueNodes[i].toLowerCase())){
					array_of_nodes.push({ 'id': uniqueNodes[i], 'label': label, 'shape': "box", 'color': "#964B00" });
				}
					else {
						array_of_nodes.push({ 'id': uniqueNodes[i], 'label': label })
					}

		}
		
		console.log("Array of graph nodes");
		console.log(array_of_nodes);

		for (let i=0; i<(data[0].fields[0].values.length); ++i)
		{
			//const fontValuesDict : { [id: string]: fontValues} = { p1: {"align":"middle", "size":9, "face":"arial", "color":"black"}};

			array_of_edges.push({
					"from": parentNodes[i],
					"to": childNodes[i],
					"arrows": "to",
					'label': callCountArr[i].toString()+"calls",
					"font": {"align":"middle", "size":9, "face":"arial", "color":"black"},
					"width":measureScalingFactorForEdge(callCountArr[i], min_scale, max_scale, min_val, max_val)
			});
		}
			
		console.log("PRINTING array_of_edges ");
		console.log(array_of_edges);
		responseArray.push(array_of_nodes);
		responseArray.push(array_of_edges);
		responseArray.push({
			  interaction: { hover:true },
			  nodes:{
					borderWidth: 0.5,
					borderWidthSelected: 0.5,
					chosen: true,
					color: {
					  border: '#000000',
					  background: '#6d9830',
					  highlight: {
						border: '#2B7CE9',
						background: '#D2E5FF'
					  },
					  hover: {
						border: '#6ee883',
						background: '#6ee883'
					  }
					},
					fixed: {
					  x:true,
					  y:true
					},
					font: {
					  color: '#800080',
					  size: 11,
					  face: 'arial',
					  background: 'none',
					  strokeWidth: 0,
					  strokeColor: '#ffffff',
					  align: 'center',
					  multi: false,
					  vadjust: 0,
					  bold: {
						color: '#800080',
						face: 'arial',
						vadjust: 0,
						mod: 'bold'
					  },
					},
					heightConstraint: true,
					size: 25
			  },
			  edges:{
				arrows: {
				  to: {
					enabled: false,
					scaleFactor: 0.4,
					type: "arrow"
				  }
				},
				length: 130,
				hoverWidth: 0.5,
				selectionWidth: 0.5,
				color: {
				  color:'#848484',
				  highlight:'#848484',
				  hover: '#000000',
				  inherit: 'from',
				  opacity:1.0
				},
				labelHighlightBold: true,
				font: {
					size: 15,
					strokeWidth: 2,
					strokeColor: '#848484'
				}
			  }
			});
		return responseArray;
	}
		else {
			if (data[0].fields[0].values.length < 1)
				console.log("No data found..");
				else
					console.log("Problem: Invalid column sequence detected");
			return [[],[],[]];
		}
		
}
/*
interface myDictEdges {
	from: string;
	to: string;
	arrows: string;
	label: string;
	//font: { [key: string]: fontValues};
	font: fontValues;
	width: number;
}

interface fontValues {
	align: string;
	size: number;
	face: string;
	color: string;
}
*/
function len(arr:any[]) {
  var count = 0;
  for (var k in arr) {
    if (arr.hasOwnProperty(k)) {
      count++;
    }
  }
  return count;
}

function arrayMin(arr:any[]) {
  var len = arr.length, min = Infinity;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }
  return min;
};

function arrayMax(arr:any[]) {
  var len = arr.length, max = -Infinity;
  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }
  return max;
};


function measureScalingFactorForEdge(x:number, minScale:number, maxScale:number, minVal:number, maxVal:number){
		return ((((maxScale - minScale)*(x - minVal))/(maxVal - minVal)) + minScale);
	}


export class FormNetwork { }
