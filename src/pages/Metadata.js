import React, {Component} from 'react';
import LocationContext from '../context/location-context';
import "./Metadata.css";
import "./Rechart";
import ApexChart from "./Circle";

const colors = {
    cold: '#457fca',
    warm: '#E26E43',
    hot: '#c02425',
    good: '#00C301',
    moderate: '#F3FD03',
    unhealthyForSensitive: '#fd1d1d',
    unhealthy: '#FE0000',
    veryUnhealthy: '#af0047',
    hazardous: '#8D001E'
};

const gradients = {
    warm: '#f8ce0e',
    cold: '#5691c8',
    hot: '#f0cb35',
    good: '#00AB08',
    moderate: '#ff9900',
    unhealthyForSensitive: '#fB6f05',
    unhealthy: '#cc0000',
    veryUnhealthy: '#cc0066',
    hazardous: '#800000'
};

class MetadataWindow extends Component {
    static contextType = LocationContext;

    setTemperatureColor = (value) => {
        if (value <= 11) {
            return colors.cold;
        } else if (value > 11 && value <= 28) {
            return colors.warm;
        } else {
            return colors.hot;
        }
    };
    setTemperatureGradient = (value) => {
        if (value <= 11) {
            return gradients.cold;
        } else if (value > 11 && value <= 28) {
            return gradients.warm;
        } else {
            return gradients.hot;
        }
    };
    setDustColor = (value) => {
        if (value <= 12) {
            return colors.good;
        } else if (value > 12.1 && value <= 35.4) {
            return colors.moderate;
        } else if (value > 35.5 && value <= 55.4) {
            return colors.unhealthyForSensitive;
        } else if (value > 55.5 && value <= 150.4) {
            return colors.unhealthy;
        } else if (value > 150.5 && value <= 250.4) {
            return colors.veryUnhealthy;
        } else {
            return colors.hazardous;
        }
    };
    setDustGradient = (value) => {
        if (value <= 12) {
            return gradients.good;
        } else if (value > 12.1 && value <= 35.4) {
            return gradients.moderate;
        } else if (value > 35.5 && value <= 55.4) {
            return gradients.unhealthyForSensitive;
        } else if (value > 55.5 && value <= 150.4) {
            return gradients.unhealthy;
        } else if (value > 150.5 && value <= 250.4) {
            return gradients.veryUnhealthy;
        } else {
            return gradients.hazardous;
        }
    };
    setCOColor = (value) => {
        if (value <= 4.4) {
            return colors.good;
        } else if (value > 4.5 && value <= 9.4) {
            return colors.moderate;
        } else if (value > 9.5 && value <= 12.4) {
            return colors.unhealthyForSensitive;
        } else if (value > 12.5 && value <= 15.4) {
            return colors.unhealthy;
        } else if (value > 15.5 && value <= 30.4) {
            return colors.veryUnhealthy;
        } else {
            return colors.hazardous;
        }
    };
    setCOGradient = (value) => {
        if (value <= 4.4) {
            return gradients.good;
        } else if (value > 4.5 && value <= 9.4) {
            return gradients.moderate;
        } else if (value > 9.5 && value <= 12.4) {
            return gradients.unhealthyForSensitive;
        } else if (value > 12.5 && value <= 15.4) {
            return gradients.unhealthy;
        } else if (value > 15.5 && value <= 30.4) {
            return gradients.veryUnhealthy;
        } else {
            return gradients.hazardous;
        }
    };
    setHumidityColor = (value) => {
        if (value <= 30) {
            return colors.moderate;
        } else if (value > 30 && value <= 50) {
            return colors.good;
        } else {
            return colors.unhealthy;
        }
    };
    setHumidityGradient = (value) => {
        if (value <= 30) {
            return gradients.moderate;
        } else if (value > 30 && value <= 50) {
            return gradients.good;
        } else {
            return gradients.unhealthy;
        }
    };
    setCO2Color = (value) => {
        if (value <= 800) {
            return colors.good;
        } else if (value > 800 && value <= 1200) {
            return colors.moderate;
        } else {
            return colors.unhealthy;
        }
    };
    setCO2Gradient = (value) => {
        if (value <= 800) {
            return gradients.good;
        } else if (value > 800 && value <= 1200) {
            return gradients.moderate;
        } else {
            return gradients.unhealthy;
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="my_window">
                    <div className="time">
                        <h1 className="header">Last updated:</h1>
                        <h1 className="tab">{this.context.currentDayMetadataTime}</h1>
                    </div>
                    <div className="data">
                        <h1 className="header">Temperature</h1>
                        <ApexChart className="chart" value={localStorage.getItem("temperature")} label="°C" max={50}
                                   name={"temperature"}
                                   color={this.setTemperatureColor(localStorage.getItem("temperature"))}
                                   gradient={this.setTemperatureGradient(localStorage.getItem("temperature"))}/>
                    </div>
                    <div className="data">
                        <h1 className="header">Humidity</h1>
                        <ApexChart className="chart" value={localStorage.getItem("humidity")} label="%" max={100}
                                   name={"humidity"}
                                   color={this.setHumidityColor(localStorage.getItem("humidity"))}
                                   gradient={this.setHumidityGradient(localStorage.getItem("humidity"))}
                        />
                    </div>
                    <div className="data">
                        <h1 className="header">Dust</h1>
                        <ApexChart className="chart" value={localStorage.getItem("dust")} label="μg/m3" max={500.4}
                                   name={"dust"}
                                   color={this.setDustColor(localStorage.getItem("dust"))}
                                   gradient={this.setDustGradient(localStorage.getItem("dust"))}/>
                    </div>
                    <div className="data">
                        <h1 className="header">Smoke</h1>
                        <ApexChart className="chart" value={localStorage.getItem("smoke")} label="μg/m3" max={30}
                                   name={"smoke"}
                                   color={this.setCOColor(localStorage.getItem("smoke"))}
                                   gradient={this.setCOGradient(localStorage.getItem("smoke"))}/>
                    </div>
                    <div className="data">
                        <h1 className="header">CO</h1>
                        <ApexChart className="chart" value={localStorage.getItem("co")} label="μg/m3" max={50.3}
                                   name={"co"}
                                   color={this.setCOColor(localStorage.getItem("co"))}
                                   gradient={this.setCOGradient(localStorage.getItem("co"))}/>
                    </div>
                    <div className="data">
                        <h1 className="header">CO<sub>2</sub></h1>
                        <ApexChart className="chart" value={localStorage.getItem("co2")} label="μg/m3" max={1300}
                                   name={"co2"}
                                   color={this.setCO2Color(localStorage.getItem("co2"))}
                                   gradient={this.setCO2Gradient(localStorage.getItem("co2"))}
                        />
                    </div>
                    <div className="last_element">
                        <h1 className="header"> LPG </h1>
                        <ApexChart className="chart" value={localStorage.getItem("lpg")} label="μg/m3" max={100}
                                   name={"lpg"}
                                   color={this.setCOColor(localStorage.getItem("lpg"))}
                                   gradient={this.setCOGradient(localStorage.getItem("lpg"))}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MetadataWindow;