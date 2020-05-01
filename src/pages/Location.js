import React, {Component} from 'react';
import "./Location.css";
import "./Metadata.js";
import LocationContext from '../context/location-context';
import {Map, Marker, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";
import MetadataWindow from "./Metadata";


const myMarker = new Icon({
    iconUrl: require("../AQI_Warning.svg"),
    iconSize: [80, 85]
});

class Location extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            allDayData: null,
            currentDayMetaData: null,
            dateTime: []
        };
    }

    static contextType = LocationContext;

    componentDidMount() {
        const currentLocationToDisplay = localStorage.getItem('currentLocation');
        const currentLocationToDisplayId = localStorage.getItem('currentLocationId');
        const currentLocationToDisplayName = localStorage.getItem('currentLocationName');
        const currentLocationToDisplayLatitude = localStorage.getItem('currentLocationLatitude');
        const currentLocationToDisplayLongitude = localStorage.getItem('currentLocationLongitude');
        this.context.putCurrentLocation(currentLocationToDisplay, currentLocationToDisplayId, currentLocationToDisplayName, currentLocationToDisplayLatitude, currentLocationToDisplayLongitude);
        fetch(`http://heysmellproject-env.eba-uctmjbw3.us-east-2.elasticbeanstalk.com/air-quality/last_day?location=${encodeURIComponent(currentLocationToDisplayId)}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        allDayData: result,
                        currentDayMetaData: result[result.length - 1],
                        dateTime: result[result.length - 1].dateTime.split("T")
                    });
                    localStorage.setItem('currentDayMetaData', this.state.currentDayMetaData);
                    this.context.putCurrentMetadata(this.state.currentDayMetaData.co,
                                                    this.state.currentDayMetaData.co2,
                                                    this.state.currentDayMetaData.dus,
                                                    this.state.currentDayMetaData.hum,
                                                    this.state.currentDayMetaData.tmp,
                                                    this.state.currentDayMetaData.smk,
                                                    this.state.currentDayMetaData.lpg,
                                                    this.state.dateTime[1]);
                },
        // fetch(`http://heysmellproject-env.eba-uctmjbw3.us-east-2.elasticbeanstalk.com/air-quality/last_week?location=${encodeURIComponent(currentLocationToDisplayId)}`)
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             this.setState({
        //                 isLoaded: true,
        //                 allDayData: result,
        //                 currentDayMetaData: result[result.length - 1]
        //             });
        //             console.log(this.state.currentDayMetaData);
        //             localStorage.setItem('currentDayMetaData', this.state.currentDayMetaData);
        //             this.context.putCurrentMetadata(this.state.currentDayMetaData.co,
        //                                             this.state.currentDayMetaData.co2,
        //                                             this.state.currentDayMetaData.dus,
        //                                             this.state.currentDayMetaData.hum,
        //                                             this.state.currentDayMetaData.tmp,
        //                                             this.state.currentDayMetaData.smk,
        //                                             this.state.currentDayMetaData.lpg,
        //                                             this.state.currentDayMetaData.time);
        //         },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, currentDayMetaData} = this.state;
        if (error) {
            return <div>Oops..something went wrong: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <React.Fragment>
                    <div className="my_current_location">
                        <Map className="my_map" center={[this.context.locationLatitude, this.context.locationLongitude]}
                             zoom={13}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker
                                key={this.context.locationId}
                                position={[this.context.locationLatitude, this.context.locationLongitude]}
                                icon={myMarker}
                            />
                        </Map>
                        <MetadataWindow/>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default Location;