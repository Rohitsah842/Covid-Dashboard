import printLineChart from './lineChart.js'
import { showChart } from './mapChart.js'

let url = "https://api.covid19india.org/data.json";
var jsondata;
var data;
async function getdata2() {
  data = await fetch(url);
  jsondata = await data.json();
  console.log(jsondata)
  let firstrow = document.getElementById("row-first");
  firstrow.innerHTML = `<div class="card" style="color:red"><h2>Confirmed</h2><p>${jsondata.statewise[0].confirmed}<span>[+${jsondata.statewise[0].deltaconfirmed}]</span>
     </p></div>`
  firstrow.innerHTML += `<div class="card" style="color:#cc7a00"><h2>Active</h2><p>${jsondata.statewise[0].active}<span>[+${jsondata.statewise[0].deltaconfirmed - jsondata.statewise[0].deltarecovered - jsondata.statewise[0].deltadeaths}]</span></p></div>`
  firstrow.innerHTML += `<div class="card" style="color:#129812"><h2>Recovered</h2><p>${jsondata.statewise[0].recovered}<span>[+${jsondata.statewise[0].deltarecovered}]</span>
      </p></div>`
  firstrow.innerHTML += `<div class="card" style="color:grey"><h2>Deaths</h2><p>${jsondata.statewise[0].deaths}<span>[+${jsondata.statewise[0].deltadeaths}]</span>
      </p></div>`
  firstrow.innerHTML += `<div class="card" style="color:black"><h2>Test So Far</h2><p>${jsondata.tested[jsondata.tested.length - 2].totalsamplestested}<span>[+${jsondata.tested[jsondata.tested.length - 2].samplereportedtoday}]</span>
      </p></div>`
  firstrow.innerHTML += `<div class="card" style="color:blue"><p>Last Updated :-${jsondata.statewise[0].lastupdatedtime}</p></div>`
  jsondata.statewise.shift();
  jsondata.statewise.pop();
  printTable(jsondata.statewise);
}
getdata2();
function fun(element) {
  console.log(element.target.value)
  let filtered = jsondata.statewise.filter(data => {
    return data.state.toUpperCase().includes(element.target.value.toUpperCase()) || data.confirmed.toString().includes(element.target.value.toUpperCase())
  })
  console.log(filtered)
  printTable(filtered);
}

window.fun = fun;
function printTable(jsondata2) {
  console.log(jsondata2);
  jsondata2.sort((a, b) => {
    return (b.confirmed - a.confirmed);
  })
  let tableid = document.getElementById("table");

  let table = `<div id="side-bar"><ol><table id="mytable" style="width:100%"><tr ><th>State</th><th>Confirmed</th><th>Active</th><th>Recovered</th><th>Deaths</th></tr>`

  jsondata2.forEach((data) => {
    table += `<tr onclick="showState('${data.state}')"><td style="padding-left: 30px;
      width: 150px;"><li>${data.state}</li></td>
      <td>${data.confirmed}<span class="span-item" style="color:red;font-size:12px"> [+${data.deltaconfirmed}]</span></td>
      <td style="width:85px">${data.active}</td>
      <td>${data.recovered}<span class="span-item" style="color:#18bc18;font-size:12px"> [+${data.deltarecovered}]</span></td>
      <td>${data.deaths}<span class="span-item" style="color:red;font-size:12px"> [+${data.deltadeaths}]</span></td></tr>`
  });
  let tableend = `</div></ol></table>`
  tableid.innerHTML = table + tableend;
}
const urldistrict = "https://api.covid19india.org/state_district_wise.json"
let jsondata3;
var data3;
async function getdata3() {
  data3 = await fetch(urldistrict);
  jsondata3 = await data3.json();

}
getdata3();
function showState(state) {
  let popup = document.getElementById("popup");
  let pop = document.getElementById("popup_menu");
  pop.style.display = "block";
  var table2 = `<span class="material-icons material-icons-outlined" onclick=showhide()>
    close
    </span><h3 id="state">District wise data of ${state}</h3><div><table style="width:95%"><tr><th>District</th><th>Confirmed</th><th>Active</th><th>Recovered</th></tr>`
  var table2end = `</table></div>`
  for (let dist in jsondata3[state].districtData) {
    console.log(jsondata3[state].districtData[dist].confirmed)
    table2 += `<tr><td>${dist}</td>
      <td>${jsondata3[state].districtData[dist].confirmed}</td>
      <td>${jsondata3[state].districtData[dist].active}</td>
      <td>${jsondata3[state].districtData[dist].recovered}</td></tr>`
  }
  popup.innerHTML = table2 + table2end;
}

window.showState = showState;
function showhide() {
  let pop = document.getElementById("popup_menu");
  pop.style.display = "none";
}
window.showhide = showhide;
function printChart() {
  setTimeout(() => {
    console.log(jsondata)
    let chartData = {};
    let max = jsondata.statewise[0].confirmed;
    jsondata.statewise.forEach(state => {
      let opacity = state.confirmed / max;
      chartData[state.statecode] = {
        tooltip: {
          text: `<h1>State: ${state.state}</h1> <h1>Confirmed cases: ${state.confirmed}</h1><h1>Recovered cases: ${state.recovered}</h1><h1>Deaths cases: ${state.deaths}</h1> `,
          'html-mode': true,
          backgroundColor: '#ffffff'
        },
        backgroundColor: `rgba(255,0,0,${opacity})`,
        label: {
          visible: true
        }
      }
    })
    showChart(chartData)
    console.log(chartData)
  }, 1000)
}
printChart()




//********graph*************/
setTimeout(() => {
  printLineChart(jsondata)
}, 1000)
function myFunction() {
  console.log("hii")
  var mobile = document.getElementById("mobile");
  if (mobile.className === "mobile-view") {
    mobile.className += " responsive";
  }
  else {
    mobile.className = "mobile-view";
  }
  console.log(mobile.classList)
}
window.myFunction = myFunction;