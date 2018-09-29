const context = document.querySelector('#chart').getContext('2d')

function makeChart(type, datasetList, labels, colors) {
  return new Chart(context, {
    type: type,
    data: {
      labels: labels,
      datasets: datasetList
    },
    options: {
      // responsive: false,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
  }
  })
}

export default makeChart