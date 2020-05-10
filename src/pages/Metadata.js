import React, {Component} from 'react';
import LocationContext from '../context/location-context';
import "./Metadata.css";
import "./Rechart";
import Recharts from "./Rechart";
import ApexChart from "./Circle";

class MetadataWindow extends Component {
    static contextType = LocationContext;

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
                            <ApexChart className="chart" value={localStorage.getItem("temperature")} label="°C" max={40}/>
                        </div>
                        <div className="data">
                            <h1 className="header">Humidity</h1>
                            <ApexChart className="chart" value={localStorage.getItem("humidity")} label="%" max={100}/>
                        </div>
                        <div className="data">
                            <h1 className="header">Dust</h1>
                            <ApexChart className="chart" value={localStorage.getItem("dust")} label="" max={100}/>
                        </div>
                        <div className="data">
                            <h1 className="header">Smoke</h1>
                            <ApexChart className="chart" value={localStorage.getItem("smoke")} label="" max={100}/>
                        </div>
                        <div className="data">
                            <h1 className="header">CO</h1>
                            <ApexChart className="chart" value={localStorage.getItem("co")} label="" max={100}/>
                        </div>
                        <div className="data">
                            <h1 className="header">CO<sub>2</sub> </h1>
                            <ApexChart className="chart" value={localStorage.getItem("co2")} label="" max={100}/>
                        </div>
                        <div className="last_element">
                            <h1 className="header"> LPG </h1>
                            <ApexChart className="chart" value={localStorage.getItem("lpg")} label="" max={100}/>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }

export default MetadataWindow;