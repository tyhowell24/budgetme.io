// filename expChart.js
// setup 
const data = {
  labels: ['Housing', 'Food', 'Transportation', 'Entertainment', 'Total Expenses'],
  datasets: [{
	label: 'Amount in $',
	data: [],
	backgroundColor: [
		'rgba(255, 26, 104, 0.2)',
		'rgba(54, 162, 235, 0.2)',
		'rgba(255, 206, 86, 0.2)',
		'rgba(75, 192, 192, 0.2)',
		'rgba(255, 159, 64, 0.2)'
	],
	borderColor: [
		'rgba(255, 26, 104, 1)',
		'rgba(54, 162, 235, 1)',
		'rgba(255, 206, 86, 1)',
		'rgba(75, 192, 192, 1)',
		'rgba(255, 159, 64, 1)'
	],
	borderWidth: 1
  }]
};

// config 
const config = {
	type: 'bar',
	data,
	options: {
		plugins: {
			title: {
				display: true,
				text: 'Income Vs. Expenses'
			},
			legend: {
				display: false
			},
			
			autocolors: false,
			annotation: {
				annotations: {
					line1: {
						type: 'line',
						scaleID: 'y',
						value: 0,
						backgroundColor: 'rgba(255, 99, 132)',
						borderWidth: 2,
						label: {
							enabled: true,
							content: 'Monthly Income',
						}
					}
				}
			}
		},
		scales: {
			y: {
				min: 0,
				max: 0,
			}
		}
	}
};


// render init block
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);

// Function to update the chart with the values that are entered by the user
// Sets the y-axis scales to a number that is 1000 more then the users income
function updateChart(income, house, food, trans, ent) {	
	
	myChart.config.options.plugins.annotation.annotations.line1.value = income.value;
	
	// Adds the values for house, food, trans, and ent and creates a new value on the graph for total income
	var h = parseInt(house.value);
	var f = parseInt(food.value);
	var t = parseInt(trans.value);
	var e = parseInt(ent.value);
	
	var tot = (h+f+t+e); 
	
	myChart.config.options.scales.y.max = Math.round(tot + 1000);
	myChart.config.data.datasets[0].data[0] = house.value;
	myChart.config.data.datasets[0].data[1] = food.value;
	myChart.config.data.datasets[0].data[2] = trans.value;
	myChart.config.data.datasets[0].data[3] = ent.value;
	myChart.config.data.datasets[0].data[4] = tot;
	myChart.update();
}

// Function to remove all the data that the user entered then reset the graph
function clearData(updateChart) {
	document.getElementById("expenses").reset();
	myChart.config.options.scales.y.max = 0;
	myChart.config.options.plugins.annotation.annotations.line1.value = income.value;
	
	myChart.config.data.datasets[0].data[0] = house.value;
	myChart.config.data.datasets[0].data[1] = food.value;
	myChart.config.data.datasets[0].data[2] = trans.value;
	myChart.config.data.datasets[0].data[3] = ent.value;
	myChart.update();
}