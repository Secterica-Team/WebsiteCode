import React, {Component} from 'react';
import LocationContext from '../context/location-context';
import "./Metadata.css";
import "./Rechart";
import Recharts from "./Rechart";

class MetadataWindow extends Component {
    static contextType = LocationContext;

    componentDidMount() {

    }

    render() {
            return (
                <React.Fragment>
                    <div className="my_window">
                        <h1>Last updated:<span className="tab">{this.context.currentDayMetadataTime}</span></h1>
                        <h1>Temperature<span className="tab1">{this.context.currentDayMetadataTemperature}</span></h1>
                        <h1>Humidity<span className="tab2">{this.context.currentDayMetadataHumidity}</span></h1>
                        <h1>Dust<span className="tab3">{this.context.currentDayMetadataDust}</span></h1>
                        <h1>Smoke<span className="tab4">{this.context.currentDayMetadataSmoke}</span></h1>
                        <h1>CO<span className="tab5">{this.context.currentDayMetadataCO}</span></h1>
                        <h1>CO<sub>2</sub> <span className="tab6">{this.context.currentDayMetadataCO2}</span></h1>
                        <h1> LPG <span className="tab7">{this.context.currentDayMetadataLPQ}</span></h1>
                    </div>
                </React.Fragment>
            );
        }
    }

export default MetadataWindow;