import { Chart } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);


const config = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  },
  options
};

const options = {
  plugins: {
    autocolors: false,
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          yMin: 60,
          yMax: 60,
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
        }
      }
    }
  }
};