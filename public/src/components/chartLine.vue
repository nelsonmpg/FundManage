<template>
  <canvas></canvas>
</template>
<script>
import Chart from "chart.js";
import utils from "./../shared/utilsLib.js";

export default {
  name: "ChartLine",
  props: [
    "lineChartId",
    "chartTitle",
    "dataChartLabel",
    "dataChartValues",
    "callbackindex"
  ],
  data() {
    return {
      labelsPos: 0,
      clearChart: false,
      lineChart: null,
      configChart: {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "",
              borderColor: "#e4e7ea",
              pointBackgroundColor: "#e4e7ea",
              backgroundColor: "rgba(0, 0, 0, 0)",
              lineTension: 0.2,
              data: []
            }
          ]
        },
        options: {
          elements: {
            point: {
              radius: 3
            }
          },
          responsive: true,
          // maintainAspectRatio: false,
          title: {
            display: false,
            text: this.chartTitle,
            fontSize: 18
          },
          legend: {
            position: "top",
            display: false,
            labels: {
              fontColor: "#e4e7ea"
            }
          },
          tooltips: {
            yAlign: "bottom",
            callbacks: {
              label: function(tooltipItem) {
                return utils.formatCurrency(tooltipItem.yLabel);
              }
            }
          },
          scales: {
            yAxes: [
              {
                position: "left",
                id: "y-axis-0",
                type: "linear",
                ticks: {
                  callback: function(label, index, labels) {
                    return utils.formatCurrency(label);
                  },
                  fontColor: "#e4e7ea" /*,
                  stepSize: 2*/
                },
                gridLines: {
                  // display: false ,
                  color: "#167495"
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "#e4e7ea"
                },
                gridLines: {
                  // display: false ,
                  color: " #167495"
                }
              }
            ]
          }
        }
      },
      utils
    };
  },
  methods: {
    initGraphLine: function(_el) {
      var canvas = document.getElementById(_el);
      var ctx = canvas.getContext("2d");
      this.configChart.data.labels = this.dataChartLabel;
      this.configChart.data.datasets[0].data = this.dataChartValues;
      this.lineChart = new Chart(ctx, this.configChart);
      this.lineChart.update();
    }
  },
  mounted() {
    this.initGraphLine(this.lineChartId);
  },
  beforeDestroy() {
    this.lineChart.destroy();
    this.labelsPos = 0;
    this.clearChart = false;
    this.lineChart.data = {};
    this.configChart.data = {};
    this.lineChart = null;
  },
  watch: {
    dataChartLabel: function(val) {
      this.configChart.data.labels = val;
      this.lineChart.update();
    },
    dataChartValues: function(val) {
      this.configChart.data.datasets[0].data = val;
      this.lineChart.update();
    }
  }
};
</script>

<style>
</style>
