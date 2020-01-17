
// create a HTTPRequest to access the api
var jsonhttp = new XMLHttpRequest();

// Using the GET parameter, call the api using the link below for the json version
jsonhttp.open("GET", "http://localhost:3000/sales_fact/json", true);
jsonhttp.send()

// If the API works and can be called by checking the readystate, carry out this function:
jsonhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {  
    console.log(this.responseText);
    // Parse the response into JSON
    var myArr = JSON.parse(this.responseText);
    console.log(myArr);
    var index;
    // Create new arrays which will hold the storeID and their profit
    var storeIDs = [];
    var storeProfits = [];
    // Create for loops to go through the called data and add this to the created array
    for (index = 0; index < myArr.length; index++) {
       storeIDs.push(myArr[index]['storeID']);
    }
    for (index = 0; index < myArr.length; index++) {
      storeProfits.push(myArr[index]['profit']);
    }
    console.log(storeProfits)

    // Create the chart using chart.js
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // Define the type of chart we want to create
    type: 'line',
    // Define the data for our the graph
    data: {
        labels: storeIDs,
        datasets: [{
            label: 'Profit',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: storeProfits
        }]
    },
    // Configuration options for the graph, to add labels to the axes
    options : {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Profit in euros'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'StoreID'
          }
        }],
      }
    }
}); 
  }
};

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "http://localhost:3000/sales_fact/xml", true);
xmlhttp.send()

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = this.responseText;
    // Parse the response into XML using the DOMParser
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(myArr,"text/xml");
    console.log(xmlDoc);
    var index;

    // Create new arrays which will hold the storeID and their profit, this time using the nodes produced by XML
    var storeID_nodes = xmlDoc.getElementsByTagName('storeID');
    var profit_nodes = xmlDoc.getElementsByTagName('profit');
    var storeIDs = [];
    var storeProfits = [];
   
    // Create for loops to go through the called data and add this to the created array, using the nodes above
    for (index = 0; index < storeID_nodes.length; index++) {
        storeIDs.push(storeID_nodes[index].firstChild.data)
    }
    for (index = 0; index < profit_nodes.length; index++) {
        storeProfits.push(profit_nodes[index].firstChild.data)
    }

    var ctx = document.getElementById('myChart2').getContext('2d');
    // Create the chart using chart.js
    var chart2 = new Chart(ctx, {
    // Define the type of chart we want to create
    type: 'line',
    // Define the data for our the graph
    data: {
        labels: storeIDs,
        datasets: [{
            label: 'Profit',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: storeProfits
        }]
    },
    // Configuration options for the graph, to add labels to the axes
    options : {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Profit in euros'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'StoreID'
          }
        }],
      }
    }
}); 
  }
};



