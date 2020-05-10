import React, { Component } from "react";
import ReactApexChart from "react-apexcharts"
import LocationContext from '../context/location-context';


class ApexChart extends Component {
    static contextType = LocationContext;

    constructor(props) {
        super(props);
        const offsetY = 0;
        const max = this.props.max;
        const value = this.props.value;
        let value_in_percent = value;
        if(this.props.label == ""){
            this.offsetY = -10;
        } else {
            this.offsetY = 2;
        }
        function valueToPercent (value) {
            value_in_percent = value;
            return (value_in_percent * 100) / max;
        }
        this.state = {

            series: [valueToPercent(this.props.value)],
            options: {
                chart: {
                    height: 90,
                    type: 'radialBar',
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    radialBar: {
                        startAngle: 0,
                        endAngle: 360,
                        hollow: {
                            margin: 0,
                            size: '70%',
                            background: '#182633',
                            image: undefined,
                            imageOffsetX: 0,
                            imageOffsetY: 0,
                            position: 'front',
                            dropShadow: {
                                enabled: true,
                                top: 3,
                                left: 0,
                                blur: 4,
                                opacity: 0.24
                            }
                        },
                        track: {
                            background: '#182633',
                            strokeWidth: '100%',
                            margin: 0, // margin is in pixels
                            dropShadow: {
                                enabled: true,
                                top: -3,
                                left: 0,
                                blur: 4,
                                opacity: 0.35
                            }
                        },

                        dataLabels: {
                            show: true,
                            name: {
                                offsetY: -6,
                                show: true,
                                color: '#5F7B88',
                                fontSize: '15px',
                            },
                            value: {
                                formatter: function(val) {
                                    return parseFloat(value);
                                },
                                color: '#5F7B88',
                                fontSize: '18px',
                                show: true,
                                offsetY: this.offsetY
                            }
                        }
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: 'horizontal',
                        shadeIntensity: 0.5,
                        gradientToColors: ['#58AEE6'],
                        inverseColors: true,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100]
                    }
                },
                stroke: {
                    lineCap: 'round'
                },
                labels: [this.props.label],
            },


        };
    }



    render() {
        return (


            <div id="card">
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={this.state.options.chart.height} />
                </div>
            </div>


        );
    }
}

export default ApexChart;