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
      count: 0,
      sumX: 0,
      sumX2: 0,
      sumXY: 0,
      sumY: 0,
      sQcount: 0,
      sQsumX: 0,
      sQsumX2: 0,
      sQsumX3: 0,
      sQsumX4: 0,
      sQsumY: 0,
      sQsumXY: 0,
      sQsumX2Y: 0,
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
          } /*
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
          },*/,
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
      /* let YY3 = this.calculateTrendLine();
      let YY2 = this.LineFitter();
      let YY = this.SquareFitter();
      console.log("Points", YY, YY2, YY3);
      this.configChart.options.annotation.annotations[0].value = YY.start;
      this.configChart.options.annotation.annotations[0].endValue = YY.ed; */
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

      return {
        start: this.getTrendLinePoint(1, slope, yIntercept),
        end: this.getTrendLinePoint(dpsLength - 1, slope, yIntercept)
      };
    },
    getTrendLinePoint: function(x, slope, intercept) {
      return slope * x + intercept;
    },
    LineFitter: function() {
      let x1 = 1;
      let x2 = this.configChart.data.datasets[0].data.length - 1;
      for (let i = 0; i < this.configChart.data.datasets[0].data.length; i++) {
        this.LineFitterAdd(
          i + 1,
          this.configChart.data.datasets[0].data[i] * 1
        );
      }
      return this.LineFitterProject(x1, x2);
    },
    LineFitterAdd: function(x, y) {
      this.count++;
      this.sumX += x;
      this.sumX2 += x * x;
      this.sumXY += x * y;
      this.sumY += y;
    },
    LineFitterProject: function(x1, x2) {
      let det = this.count * this.sumX2 - this.sumX * this.sumX;
      let scale = (this.count * this.sumXY - this.sumX * this.sumY) / det;
      // let offset = (this.sumX2 * this.sumY - this.sumX * this.sumXY) / det;
      let offset = (this.sumY - scale * this.sumX) / this.count;
      return {
        start: offset + x1 * scale,
        end: offset + x2 * scale
      };
    },
    SquareFitter: function() {
      let x1 = 1;
      let x2 = this.configChart.data.datasets[0].data.length - 1;
      for (let i = 0; i < this.configChart.data.datasets[0].data.length; i++) {
        this.SquareFitterAdd(
          i + 1,
          this.configChart.data.datasets[0].data[i] * 1
        );
      }
      return this.SquareFitterProject(x1, x2);
    },
    SquareFitterAdd: function(x, y) {
      this.sQcount++;
      this.sQsumX += x;
      this.sQsumX2 += x * x;
      this.sQsumX3 += x * x * x;
      this.sQsumX4 += x * x * x * x;
      this.sQsumY += y;
      this.sQsumXY += x * y;
      this.sQsumX2Y += x * x * y;
    },
    SquareFitterProject: function(x1, x2) {
      let det =
        this.sQcount * this.sQsumX2 * this.sQsumX4 -
        this.sQcount * this.sQsumX3 * this.sQsumX3 -
        this.sQsumX * this.sQsumX * this.sQsumX4 +
        2 * this.sQsumX * this.sQsumX2 * this.sQsumX3 -
        this.sQsumX2 * this.sQsumX2 * this.sQsumX2;
      let offset =
        this.sQsumX * this.sQsumX2Y * this.sQsumX3 -
        this.sQsumX * this.sQsumX4 * this.sQsumXY -
        this.sQsumX2 * this.sQsumX2 * this.sQsumX2Y +
        this.sQsumX2 * this.sQsumX3 * this.sQsumXY +
        this.sQsumX2 * this.sQsumX4 * this.sQsumY -
        this.sQsumX3 * this.sQsumX3 * this.sQsumY;
      let scale =
        -this.sQcount * this.sQsumX2Y * this.sQsumX3 +
        this.sQcount * this.sQsumX4 * this.sQsumXY +
        this.sQsumX * this.sQsumX2 * this.sQsumX2Y -
        this.sQsumX * this.sQsumX4 * this.sQsumY -
        this.sQsumX2 * this.sQsumX2 * this.sQsumXY +
        this.sQsumX2 * this.sQsumX3 * this.sQsumY;
      let accel =
        this.sQsumY * this.sQsumX * this.sQsumX3 -
        this.sQsumY * this.sQsumX2 * this.sQsumX2 -
        this.sQsumXY * this.sQcount * this.sQsumX3 +
        this.sQsumXY * this.sQsumX2 * this.sQsumX -
        this.sQsumX2Y * this.sQsumX * this.sQsumX +
        this.sQsumX2Y * this.sQcount * this.sQsumX2;
      return {
        start: (offset + x1 * scale + x1 * x1 * accel) / det,
        end: (offset + x2 * scale + x2 * x2 * accel) / det
      };
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
