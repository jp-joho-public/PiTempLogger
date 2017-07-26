function refreshTemp(){
  $.ajax({
    type: 'GET',
    url: '/refresh',
    dataType: 'json',
    }).done(function(json){
      $('#temp').html(json.temp);
      $('#humidity').html(json.humidity);
      $('#discomfort').html(json.discomfort);
      console.log('ok!');
    });
};

function drawChart(data) {
  // 3)chart.jsのdataset用の配列を用意
  var tmpLabels = [], Data1 = [], Data2 = [], Data3 = [];
  var endLine = data.length;
  var beginLine = data.length - 61;
  for (var row = beginLine; row < endLine; row++) {
    tmpLabels.push(data[row][0])
    Data1.push(data[row][1])
    Data2.push(data[row][2])
  };

  // 4)chart.jsで描画
  var ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: tmpLabels,
      datasets: [
        { label: "Temp(left axis)", data: Data1, yAxisID: "y-left", borderColor: "#e57373", backgroundColor: "#e57373", fill: false},
        { label: "Humidity(right axis)", data: Data2, yAxisID: "y-right", borderColor: "#4db6ac", backgroundColor: "#4db6ac", fill: false}
        // ,{ label: "Discomfort", data: Data3}
      ]
    },
    options: {
      tooltips: {
        mode: 'label',
        intersect: false
      },
      scales: {
        yAxes: [{
          id: "y-left",
          position: "left"
        },{
          id: "y-right",
          position: "right"
        }]
      }
    }
  });
}

function loadChart(){
  $.ajax({
    type: 'GET',
    url: '/graph',
    dataType: 'json',
    }).done(function(data){
      drawChart(data);
    }).fail(function(){
      console.log('error');
    });
}

function deleteChart(){
  myChart.destroy();
}

$('#refresh').click(function(){
  deleteChart();
  loadChart();
  refreshTemp();
});

$(document).ready(function(){
  loadChart();
});
