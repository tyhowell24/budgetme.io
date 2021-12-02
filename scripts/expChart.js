/*
	Author: Tyler Howell
	Date: 12/2/2021
	Project: BudgetMe JavaScript Document
	Filename expChart.js
*/

// setup of chart.js Bar Chart
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

// config for chart.js Bar Chart
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
						drawTime: 'afterDraw',
						type: 'line',
						scaleID: 'y',
						value: 0,
						backgroundColor: 'rgba(255, 99, 132)',
						borderWidth: 2,
						label: {
							enabled: true,
							content: 'Monthly Income'
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


// render init block for chart.js Bar Chart
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);

// Validates if the expense form is filled and has the user submit with filled data if not
function validateForm() {
	let iCheck = document.forms["expenses"]["income"].value;
	let hCheck = document.forms["expenses"]["house"].value;
	let fCheck = document.forms["expenses"]["food"].value;
	let tCheck = document.forms["expenses"]["trans"].value;
	let eCheck = document.forms["expenses"]["ent"].value;
	if (iCheck == "" && hCheck == "" && fCheck == "" && tCheck == "" && eCheck == "") {
		alert("Please fill in required fields and then click submit!")
		return false;
	} else if (iCheck == "") {
		alert("Fill in your monthly income");
		return false;
	} else if (hCheck == "") {
		alert("Fill in your monthly housing expenses");
		return false;
	} else if (fCheck == "") {
		alert("Fill in your monthly food related expenses");
		return false;
	} else if (tCheck == "") {
		alert("Fill in your monthly transportation related expenses");
		return false;
	} else if (eCheck == "") {
		alert("Fill in your monthly entertainment related expenses");
		return false;
	}
}

// Function to update the chart with the values that are entered by the user
// Sets the y-axis scales to a number that is 1000 more then the users income
function updateChart(income, house, food, trans, ent) {	
	validateForm();
	myChart.config.options.plugins.annotation.annotations.line1.value = income.value;
	
	// Adds the values for house, food, trans, and ent and creates a new value on the graph for total income
	var h = parseInt(house.value);
	var f = parseInt(food.value);
	var t = parseInt(trans.value);
	var e = parseInt(ent.value);
	
	var tot = (h+f+t+e); 
	
	// Gathers all the values from the user and creates items for the dataset data array to push into graph
	myChart.config.options.scales.y.max = Math.round(tot + 1000);
	myChart.config.data.datasets[0].data[0] = house.value;
	myChart.config.data.datasets[0].data[1] = food.value;
	myChart.config.data.datasets[0].data[2] = trans.value;
	myChart.config.data.datasets[0].data[3] = ent.value;
	myChart.config.data.datasets[0].data[4] = tot;
	myChart.update();
}

// Creates int values for the users expenses and then using the Math.max method finds the highest value and gives the user advice based on that value
function ExpenseAlert(updateChart) {
	var hValue = parseInt(house.value);
	var fValue = parseInt(food.value);
	var tValue = parseInt(trans.value);
	var eValue = parseInt(ent.value);
	
	var highExpense = (Math.max(hValue, fValue, tValue, eValue));
	
	if (highExpense == hValue) {
		alert("Ensure that housing expenses are no more than 30% of your gross monthly income. Your Housing expenses should be $" + (parseInt(income.value)*.3));
	} else if (highExpense == fValue) {
		alert("Eating out many times a week will EAT right into your budget. Spend the money at grocery stores and try cooking more meals at home.");
	} else if (highExpense == tValue) {
		alert("Always be shopping around for car insurance. If there is a better option, TAKE IT! \nAlso utilizing apps that give you cash back at the pump is a great way to fuel your finances.");
	} else if (highExpense == eValue) {
		alert("Great options to cut back on entertainment expenses include using discounts when dining out, attending amateur sporting events, attend a matinee viewing of a movie, take advantage of happy hour specials, and buying tickets in person to avoid surcharges.");
	} else {
		alert("No Data Entered, Please Fill Out Form and Try Again!");
	}
}

// Function to remove all the data that the user entered then reset the graph
function clearData(updateChart) {
	if (income.value == "" && house.value == "" && food.value == "" && trans.value == "" && ent.value == "") {
		alert("No form data to delete!")
		return false;
	} else {
		document.getElementById("expenses").reset();
		myChart.config.options.scales.y.max = 0;

		myChart.config.data.datasets[0].data[0] = house.value;
		myChart.config.data.datasets[0].data[1] = food.value;
		myChart.config.data.datasets[0].data[2] = trans.value;
		myChart.config.data.datasets[0].data[3] = ent.value;
		myChart.update();
		alert("Form Data Deleted!");
	}
}