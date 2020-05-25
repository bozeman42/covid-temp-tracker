import React from 'react'
import Highcharts from 'highcharts'


const Chart = ({data}) => {
  if (data.length) {
    const temps = data.map(x => x[1])
    const maxTemp = temps.reduce((max, temp) => {
      return temp > max ? temp : max
    })
    const minTemp = temps.reduce((min, temp) => {
      return temp < min ? temp : min
    })
    const aveTemp = temps.reduce((a, b) => a + b) / temps.length
    console.log(maxTemp, minTemp)
    Highcharts.chart(
      'chart', {
        chart: {
          zoomType: 'x'
        },
        time: {
          timezone: 'America/Chicago',
          useUTC: false
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          min: Math.min(96, minTemp),
          max: Math.max(102, maxTemp),
          plotLines: [{
            color: '#FF0000',
            width: 2,
            value: 100.4
          }, {
            color: '#00FF00',
            width: 2,
            value: 98.6
          }, {
            color: 'rgba(0,0,255,0.1)',
            width: 2,
            value: aveTemp
          }
        ]
        },
        series: [{
          type: 'line',
          name: `Aaron - Avg: ${Math.round(10 * aveTemp) / 10}`,
          data: data
        }]
      }
    )
  }
  return (
    <div id="chart"></div>
  )
}

export default Chart