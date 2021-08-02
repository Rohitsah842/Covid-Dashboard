
const url="https://corona.lmao.ninja/v2/all";
var data;

async function getData(){
    data =await fetch(url);
    let jsonData = await data.json();
    var d=new Date(jsonData.updated);
    let rowfirst=document.getElementById("row-first");
    rowfirst.innerHTML = `<div class="card" style="color:red"><h1>Confirmed</h1>${jsonData.cases} <span style="font-size:12px">[+${jsonData.todayCases}]</span></div>`
    rowfirst.innerHTML += `<div class="card" style="color: #cc7a00"><h1>Active</h1>${jsonData.active} </div>`
    rowfirst.innerHTML += `<div class="card" style="color:red"><h1>Critical</h1>${jsonData.critical} </div>`
    rowfirst.innerHTML += `<div class="card" style="color:#129812"><h1>Recovered</h1>${jsonData.recovered} <span style="font-size:12px">[+${jsonData.todayRecovered}]</span></div>`
    rowfirst.innerHTML += `<div class="card" style="color:grey"><h1>Deaths</h1>${jsonData.deaths} <span style="font-size:12px">[+${jsonData.todayDeaths}]</span></div>`
    rowfirst.innerHTML += `<div class="card">Last Update: Today ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}</div>`
}
getData();



var jsondata1;
const url1='https://corona.lmao.ninja/v2/countries';
var data1;
async function getData1(){
    data1=await fetch(url1);
    jsondata1=await data1.json();
    console.log(jsondata1)
    printTable(jsondata1)
}

getData1();
function myfun(e){
  console.log(e.target.value)
    // var input, filter, table, tr, td, i, txtValue;
    // input = document.getElementById("input1");
    // filtered = input.value.toUpperCase();
    // table = document.getElementById("myTable");
    // tr = table.getElementsByTagName("tr");
    // for (i = 0; i < tr.length; i++) {
    //   td = tr[i].getElementsByTagName("td")[0];
    //   if (td) {
    //     txtValue = td.textContent || td.innerText;
    //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
    //       tr[i].style.display = "";
    //     } else {
    //       tr[i].style.display = "none";
    //     }
    //   }       
    // }

    let filteredData = jsondata1.filter(data =>{
      return data.country.toUpperCase().includes(e.target.value.toUpperCase()) || data.cases.toString().includes(e.target.value.toUpperCase())
    })
    // console.log(filteredData)
    printTable(filteredData)
}

function printTable(jsondata1){
  console.log(jsondata1)
  let rowlast=document.getElementById("table");
  var table = `<div id="side-bar"> <ol><table id="myTable"><tr><th>Country</th><th>Total Cases</th><th>Active Cases</th><th> Recovered Cases</th><th>Total Deaths</th></tr>`
  jsondata1 = jsondata1.sort((a,b) => b.cases-a.cases);
  jsondata1.forEach(element => {
      table += `<tr class="row-table"><td class="country-block"><li>${element.country}</li></td>
      <td>${element.cases}<span class="span-item" style="color:red;font-size:12px"> [+${element.todayCases}]</span></td>
      <td>${element.active}</td>
      <td>${element.recovered}<span class="span-item" style="color:#18bc18;font-size:12px"> [+${element.todayRecovered}]</span></td>
      <td>${element.deaths}<span class="span-item" style="color:red;font-size:12px"> [+${element.todayDeaths}]</span></td></tr>`
  });
  var tableClose = '</ol></table></div>'
  rowlast.innerHTML= table + tableClose
}
function myFunction() {
  console.log("hii")
  var mobile=document.getElementById("mobile");
  if(mobile.className === "mobile-view"){
    mobile.className += " responsive"; 
  }
  else{
    mobile.className ="mobile-view";
  }
  console.log(mobile.classList)
}
window.MyFunction = MyFunction;