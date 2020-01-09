<template>
  <canvas></canvas>
</template>
<script>
import Chart from "chart.js";
import chartjsPluginAnnotation from "chartjs-plugin-annotation";
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
      tendStart: 0,
      tendEnd: 0,
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
            display: this.chartTitle === "" ? false : true,
            text: this.chartTitle,
            fontColor: "#e4e7ea",
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
            // yAlign: "bottom",
            callbacks: {
              label: function(tooltipItem) {
                return utils.formatCurrency(tooltipItem.yLabel);
              }
            }
          } /*,
          annotation: {
            drawTime: "afterDraw",
            annotations: [
              {
                type: "line",
                mode: "horizontal",
                scaleID: "y-axis-0",
                value: this.dataChartValues[0],
                endValue: this.dataChartValues[this.dataChartValues.length - 1],
                // value: this.tendStart,
                // endValue: this.tendEnd,
                borderColor: "rgb(75, 192, 192)",
                borderWidth: 4,
                label: {
                  enabled: true,
                  content: "Trendline",
                  yAdjust: -16
                }
              }
            ]
          } */,
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
      // this.calculateTrendLine();
      // this.configChart.options.annotation.annotations[0].value = this.tendStart;
      // this.configChart.options.annotation.annotations[0].endValue = this.tendEnd;
      this.lineChart = new Chart(ctx, this.configChart);
      this.lineChart.update();
    },
    calculateTrendLine: function() {
      let a, b, c, d, e, slope, yIntercept;
      let xSum = 0,
        ySum = 0,
        xySum = 0,
        xSquare = 0,
        dpsLength = this.configChart.data.datasets[0].data.length;
      for (let i = 0; i < dpsLength; i++) {
        xySum += (i + 1) * this.configChart.data.datasets[0].data[i] * 1;
        xSum += i + 1;
        ySum += this.configChart.data.datasets[0].data[i] * 1;
        xSquare += Math.pow(i + 1, 2);
      }
      a = xySum * dpsLength;
      b = xSum * ySum;
      c = dpsLength * xSquare;
      d = Math.pow(xSum, 2);
      slope = (a - b) / (c - d);
      e = slope * xSum;
      yIntercept = (ySum - e) / dpsLength;

      let startPoint = this.getTrendLinePoint(
        this.configChart.data.datasets[0].data[0] * 1,
        slope,
        yIntercept
      );
      let endPoint = this.getTrendLinePoint(
        this.configChart.data.datasets[0].data[dpsLength - 1] * 1,
        slope,
        yIntercept
      );

      this.tendStart = startPoint.y;
      this.tendEnd = endPoint.y;
      console.log("points", this.tendStart, this.tendEnd);
    },
    getTrendLinePoint: function(x, slope, intercept) {
      return { x: x, y: slope * x + intercept };
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

<style></style>
