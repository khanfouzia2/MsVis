//import DataFrame from 'dataframe-js';


//DO ADD THE CHECKS TO READ COLUMN VALUES FIRST/ also add checks before fetching parent, child or callCount data
export function getNetworkData (data: any[]) : any[] {
	console.log("Printing data inside getNetworkData function");

	console.log(data);
	console.log("reading data in a for loop, printing new_arr");
	var new_arr = data[0].fields[0].values.toArray();
	console.log(new_arr); //working
	console.log(ArrayBuffer.isView(data));

	console.log("printing vectorarray length");
	console.log(data[0].fields[0].values.length); //working

	console.log("printing value by get function");
	console.log(data[0].fields[0].values.get(0)); //working
	console.log(new_arr[0]);
		
		
		//Write code to create array of nodes, edges and options
		//var vis = require('../node_modules/vis/dist/vis.js');
	var responseArray:any[] = [];
	if ((data[0].fields[0].values.length > 0) && (data[0].fields[0]["name"] == "Parent") && (data[0].fields[1]["name"] == "Child") && (data[0].fields[2]["name"] == "CallCount"))
	{
		
		var i = data[0].fields.indexOf("Parent");
		console.log(i);

		const parentNodes:string[] = data[0].fields[0].values.toArray();
		const childNodes = data[0].fields[1].values.toArray();
		const callCountArr = data[0].fields[2].values.toArray();
		//console.log("Printing arrays");
		var min_scale = 1;
		var max_scale = 6;
		var min_val = arrayMin(callCountArr);
		var max_val = arrayMax(callCountArr);
		console.log("Printing min and max values ");
		console.log(min_val);
		console.log(max_val);
		
		var dbs = ['mysql', 'postgre', 'postgresql', 'sql', 'oracle'];
		var msg_bus = ['redis', 'kafka', 'rabbitmq'];
		console.log("printing simple arrays");
		console.log(dbs);
		var array_of_nodes:any[] = [];
		var array_of_edges = [];
		
		//var uniqueNodes:string[] = [];
		var uniqueNodes = parentNodes.concat(childNodes);
		console.log(uniqueNodes);
		uniqueNodes = [...new Set(uniqueNodes)]; //works
		console.log(uniqueNodes);
		console.log(uniqueNodes.length);
		console.log(typeof(uniqueNodes.length));
		console.log(typeof(uniqueNodes['length']));
		
			
		for (let i=0; i< uniqueNodes.length; ++i)
		{
			//var shape = "";
			//var color = "";
			
			if (dbs.includes(uniqueNodes[i].toLowerCase())){
				array_of_nodes.push({ 'id': uniqueNodes[i], 'label': uniqueNodes[i], 'shape': "database", 'color': "gray" });
				//shape = "database";
				//color ="gray";
			}
				else if (msg_bus.includes(uniqueNodes[i].toLowerCase())){
					array_of_nodes.push({ 'id': uniqueNodes[i], 'label': uniqueNodes[i], 'shape': "box", 'color': "#964B00" });
					//shape = "box";
					//color ="#964B00";
				}
					else {
						array_of_nodes.push({ 'id': uniqueNodes[i], 'label': uniqueNodes[i] })
					}
			
			//console.log(dict_);
			//array_of_nodes[i]=(dict_.p1);
		}
		
		console.log("PRINTING array_of_nodes ");
		console.log(array_of_nodes);

		
		for (let i=0; i<(data[0].fields[0].values.length); ++i)
		{
			//var dict_ = {}
			//const fontValuesDict : { [id: string]: fontValues} = { p1: {"align":"middle", "size":9, "face":"arial", "color":"black"}};
			//console.log("fontValuesDict");
			//console.log(fontValuesDict.p1);
			/*const dict_ : { [id: string] : myDictEdges; } = {
				p2: {
					"from": parentNodes[i],
					"to": childNodes[i],
					"arrows": 'to',
					"label": callCountArr[i].toString()+"calls",
					"font": (fontValuesDict.p1),
					"width": measureScalingFactorForEdge(callCountArr[i], min_scale, max_scale, min_val, max_val)
				}
			};*/

			console.log("mappppppppppppppp");
			//console.log(map);
			//console.log(dict_.p2);
			//array_of_edges.push(dict_.p2);
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
					  x:false,
					  y:false
					},
					font: {
					  color: '#343434',
					  size: 10,
					  face: 'arial',
					  background: 'none',
					  strokeWidth: 0,
					  strokeColor: '#ffffff',
					  align: 'center',
					  multi: false,
					  vadjust: 0,
					  bold: {
						color: '#343434',
						face: 'arial',
						vadjust: 0,
						mod: 'bold'
					  },
					},
					heightConstraint: false,
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
					strokeWidth: 2,
					strokeColor: '#848484'
				}
			  }
			});
		return responseArray;
		//return data;
	}
		else {
			if (data[0].fields[0].values.length < 1)
				console.log("No data found..");
				else
					console.log("Problem: Invalid column sequence detected");
			return responseArray;
			//return data;
		}
		
}
/*
interface myDictNodes {
	id: string;
	lable: string;
	shape: string;
	color: string;
}


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
