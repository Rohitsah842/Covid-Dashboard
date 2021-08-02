export function showChart(data){
    ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
    let chartConfig = {
      shapes: [
        {
          type: 'zingchart.maps',
          options: {
            bbox: [67.177, 36.494, 98.403, 6.965], // get bbox from zingchart.maps.getItemInfo('world-countries','ind');
            ignore: ['IND'], // ignore India because we are rendering a more specific India map below
            name: 'world.countries',
            panning: false, // turn of zooming. Doesn't work with bounding box
            style: {
              tooltip: {
                borderColor: '#000',
                borderWidth: '2px',
                fontSize: '18px'
              },
              controls: {
                visible: false // turn of zooming. Doesn't work with bounding box
              },
              hoverState: {
                alpha: .28
              }
            },
            zooming: false // turn of zooming. Doesn't work with bounding box
          }
        },
        {
          type: 'zingchart.maps',
          options: {
            name: 'ind',
            panning: false, // turn of zooming. Doesn't work with bounding box
            zooming: false,
            scrolling: false,
            style: {
              tooltip: {
                borderColor: '#000',
                borderWidth: '2px',
                fontSize: '18px'
              },
              borderColor: '#000',
              borderWidth: '2px',
              controls: {
                visible: false, // turn of zooming. Doesn't work with bounding box
    
              },
              hoverState: {
                alpha: .28
              },
              items: data,
              label: { // text displaying. Like valueBox
                fontSize: '15px',
                visible: false
              }
            },
            zooming: false // turn of zooming. Doesn't work with bounding box
          }
        }
      ]
}
zingchart.loadModules('maps,maps-ind,maps-world-countries');
zingchart.render({
  id: 'countryChart',
  data: chartConfig,
  height: '100%',
  width: '100%',
});
}