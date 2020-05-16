import React, {Component} from "react";
import ReactApexChart from "react-apexcharts"
import LocationContext from '../context/location-context';
import Recharts from "./Rechart";
import "./Circle.css";


class ApexChart extends Component {
    static contextType = LocationContext;

    componentDidMount() {
        fetch(`http://heysmellproject-env.eba-uctmjbw3.us-east-2.elasticbeanstalk.com/air-quality/last_day?location=${encodeURIComponent(this.context.locationId)}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        allDayData: result,
                        response: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };

    showChartHandler() {
        let selectedPropertyValues = "";
        if (this.state.nameOfProperty === "temperature") {
            selectedPropertyValues = this.state.allDayData.map((valueList) => valueList.tmp);
        } else if (this.state.nameOfProperty === "humidity") {
            selectedPropertyValues = this.state.allDayData.map((valueList) => valueList.hum);
        } else if (this.state.nameOfProperty === "dust") {
            selectedPropertyValues = this.state.allDayData.map((valueList) => valueList.dus);
        } else if (this.state.nameOfProperty === "smoke") {
            selectedPropertyValues = this.state.allDayData.map((valueList) => valueList.smk);
        } else if (this.state.nameOfProperty === "co") {
            selectedPropertyValues = this.state.allDayData.map((valueList) => valueList.co);
        } else if (this.state.nameOfProperty === "co2") {
            selectedPropertyValues = this.state.allDayData.map((valueList) => valueList.co2);
        } else {
            selectedPropertyValues = this.state.allDayData.map((valueList) => valueList.lpg);
        }
        const timeData = this.state.allDayData.map((valueList) => valueList.dateTime.split(/T|\./));
        const timeWithoutSeconds = timeData.map((value) => value[1].substring(0, value[1].length - 3));
        const data = Object.keys(selectedPropertyValues).map(value => ({
            x: timeWithoutSeconds[value],
            y: selectedPropertyValues[value]
        }));
        this.setState({
            showChart: true,
            data: data
        })
    };

    constructor(props) {
        super(props);
        const offsetY = 0;
        const max = this.props.max;
        const nameOfProperty = this.props.name;
        const value = this.props.value;
        this.showChartHandler = this.showChartHandler.bind(this);
        let value_in_percent = value;
        if (this.props.label === "") {
            this.offsetY = -10;
        } else {
            this.offsetY = 2;
        }

        function valueToPercent(value) {
            value_in_percent = value;
            return (value_in_percent * 100) / max;
        }

        this.state = {
            response: false,
            nameOfProperty: nameOfProperty,
            data: null,
            showChart: false,
            error: null,
            isLoaded: false,
            allDayData: null,
            series: [valueToPercent(this.props.value)],
            options: {
                chart: {
                    height: 90,
                    type: 'radialBar',
                    toolbar: {
                        show: false
                    },
                    tooltip: {
                        intersect: true,
                        shared: false
                    },
                    events: {
                        dataPointMouseEnter: () => {
                            {
                                this.state.response &&
                                this.showChartHandler();
                            }
                        },
                        dataPointMouseLeave: () => {
                            this.setState({
                                showChart: false
                            })
                        }
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
                                fontSize: '10px',
                            },
                            value: {
                                formatter: function (val) {
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
                    colors: this.props.color,
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: 'horizontal',
                        shadeIntensity: 0.5,
                        gradientToColors: [this.props.gradient],
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100],
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
        const {showChart} = this.state;
        return (
            <div id="card">
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar"
                                    height={this.state.options.chart.height}/>
                    {/*<div className="chart_window">*/}
                    {showChart && <Recharts data={this.state.data} name={this.state.nameOfProperty}/>}
                    {/*</div>*/}
                </div>
            </div>


        );
    }
}

export default ApexChart;