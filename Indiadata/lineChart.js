
export default function printLineChart(jsondata){
    

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var x=jsondata.cases_time_series
  var len =x.length;
  var arr=[];
  var value=[]
  for(var i=len-1;i>len-42;i--){
    let date =new Date(jsondata.cases_time_series[i].dateymd);
    let fullDate = date.getDate() + ' ' + months[date.getMonth()];
    arr.unshift(fullDate)
    var  val=jsondata.cases_time_series[i].dailyconfirmed;
    value.unshift(Number(val));
  }
  console.log(value)


let chartConfig = {
  type: 'line',
  title: {
    text: 'Daily Confirmed Case'
  },
  plot: {
    tooltip: {
      visible: false
    },
    cursor: 'hand'
  },
  scaleX: {
    markers: [],
    offsetEnd: '5px',
    labels: arr
  },
  crosshairX: {},
  series: [
    {
      text: 'Confirmed',
      values: value
    }
  ]
};

zingchart.render({
  id: 'myChart',
  data: chartConfig,
  height: '100%',
  width: '100%',
});

/*
* define Marker class to construct
* markers on the fly easier.
*/
function Marker(_index) {
  return {
    type: 'line',
    flat: false,
    lineColor: '#424242',
    lineWidth: '1px',
    range: [_index]
  }
}

/*
* define Label class to construct
* labels on the fly easier.
*/
function Label(_text, _id, _offsetX, _offsetY) {
  return {
    id: _id,
    text: _text,
    angle: 0,
    padding: '5px 10px 5px 10px',
    backgroundColor: '#eeeeee',
    cursor: 'pointer',
    flat: false,
    fontSize: '13px',
    fontStyle: 'bold',
    offsetX: _offsetX,
    offsetY: _offsetY ? _offsetY : 0,
    textAlign: 'left',
    wrapText: true
  }
}

// format the label text
let formatLabelText = (_nodeindex, _scaleText) => {
  let plotInfo = null;
  let nodeInfo;
  let seriesText = '';
  let labelString = isNaN(_scaleText) ? _scaleText + '<br>' : '';
  let color = '';
  let plotLength = zingchart.exec('myChart', 'getplotlength', {
    graphid: 0
  });

  for (let i = 0; i < plotLength; i++) {
    plotInfo = zingchart.exec('myChart', 'getobjectinfo', {
      object: 'plot',
      plotindex: i
    });
    nodeInfo = zingchart.exec('myChart', 'getobjectinfo', {
      object: 'node',
      plotindex: i,
      nodeindex: _nodeindex
    });
    color = plotInfo.lineColor ? plotInfo.lineColor : plotInfo.backgroundColor1;
    seriesText = plotInfo.text ? plotInfo.text : ('Serihhhfx ' + (i + 1));
    labelString += '<span style="color:' + color + '">' + seriesText + ':</span>' +
      ' ' + nodeInfo.value + '<br>';
  }

  return labelString;
};

// global array for markers since you can only update the whole array
let markersArray = [];
let labelsArray = [];

// hash table for markers
let markerHashTable = {};

/*
* Register a graph click event and then render a chart with the markers
*/
zingchart.bind('myChart', 'click', (e) => {
  let xyInformation;
  let nodeIndex;
  let scaleText;

  // make sure not a node click and click happend in plotarea
  if (e.target != 'node' && e.plotarea) {
    xyInformation = zingchart.exec('myChart', 'getxyinfo', {
      x: e.ev.clientX,
      y: e.ev.clientY
    });

    // if anything is found, 0 corresponds to scale-x
    if (xyInformation && xyInformation[0] && xyInformation[2]) {
      nodeIndex = xyInformation[0].scalepos;
      scaleText = xyInformation[0].scaletext;

      // check hash table. Add marker
      if (!markerHashTable['nodeindex' + nodeIndex]) {
        let nodeInfo = zingchart.exec('myChart', 'getobjectinfo', {
          object: 'node',
          nodeindex: nodeIndex,
          plotindex: 0
        });

        let labelText = formatLabelText(nodeIndex, scaleText);
        let labelId = 'label_' + nodeIndex;
        // create a marker
        let newMarker = new Marker(nodeIndex);
        let newLabel = new Label(labelText, labelId, nodeInfo.x, nodeInfo.y);

        markerHashTable['nodeindex' + nodeIndex] = true;
        markersArray.push(newMarker);

        labelsArray.push(newLabel);

        // render the marker
        chartConfig.scaleX.markers = markersArray;
        chartConfig.labels = labelsArray;
        zingchart.exec('myChart', 'setdata', {
          data: chartConfig
        });
      } else {
        console.log('---marker already exists----');
      }
    }
  }
});

/*
* Register a node_click event and then render a chart with the markers
*/
zingchart.bind('myChart', 'node_click', (e) => {
  // check hash table. Add marker
  if (!markerHashTable['nodeindex' + e.nodeindex]) {
    let labelText = formatLabelText(e.nodeindex, e.scaletext);
    let labelId = 'label_' + e.nodeindex;
    // create a marker
    let newMarker = new Marker(e.nodeindex, labelText, e.plotindex);
    let newLabel = new Label(labelText, labelId, e.ev.layerX, e.ev.layerY);

    markerHashTable['nodeindex' + e.nodeindex] = true;
    markersArray.push(newMarker);

    labelsArray.push(newLabel);

    // render the marker
    chartConfig.scaleX.markers = markersArray;
    chartConfig.labels = labelsArray;
    zingchart.exec('myChart', 'setdata', {
      data: chartConfig
    });
  } else {
    console.log('---marker already exists----');
  }
});

let labelMouseDown = false;
let labelId = null;

/*
* bind mousedown event for dragging label
*/
zingchart.bind('myChart', 'label_mousedown', (e) => {
  labelMouseDown = true;
  labelId = e.labelid;
  zingchart.exec('myChart', 'hideguide');
});

zingchart.bind('myChart', 'mousemove', (e) => {
  if (labelMouseDown && labelId) {
    zingchart.exec('myChart', 'updateobject', {
      type: 'label',
      data: {
        id: labelId,
        offsetY: e.ev.layerY
      }
    });
  }
});

zingchart.bind('myChart', 'mouseup', () => {
  labelMouseDown = false;
  labelId = null;
  zingchart.exec('myChart', 'showguide');
});

zingchart.bind('myChart', 'doubleclick', (e) => {
  console.log(e);
});
}

