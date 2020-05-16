import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";
import "./MainPage.css";
import LocationContext from '../context/location-context'


const myMarker = new Icon({
    iconUrl: require("../my_marker_location.svg"),
    iconSize: [50, 55]
});

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            locations: [],
            activeLocation: null
        };
    }

    static contextType = LocationContext;

    componentDidMount() {
        this.context.putCurrentLocation(null, null);
        fetch("http://heysmellproject-env.eba-uctmjbw3.us-east-2.elasticbeanstalk.com/air-quality/locations")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        locations: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleClick = () => {
        this.props.history.push("/location")
    };

    render() {
        const {error, isLoaded, locations, activeLocation} = this.state;
        //const [activeLocation, setActiveLocation] = React.useState(null);
        if (error) {
            return <div>Oops..something went wrong: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <React.Fragment>
                    <Map center={[49.21377, 24.03404]} zoom={8}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {locations.map(location => (
                            <Marker
                                key={location.id}
                                position={[location.latitude, location.longitude]}

                                onMouseOver={() => {
                                    this.setState({
                                        activeLocation: location
                                    });
                                }}

                                onMouseOut={() => {
                                    this.setState({
                                        activeLocation: null
                                    })
                                }}

                                onClick={() => {
                                    this.setState({
                                        activeLocation: location
                                    });
                                    this.handleClick();
                                    this.context.putCurrentLocation(location, location.id, location.name, location.latitude, location.longitude);
                                    localStorage.setItem('currentLocation', location);
                                    localStorage.setItem('currentLocationId', location.id);
                                    localStorage.setItem('currentLocationName', location.name);
                                    localStorage.setItem('currentLocationLatitude', location.latitude);
                                    localStorage.setItem('currentLocationLongitude', location.longitude);
                                }}
                                icon={myMarker}
                            />
                        ))}
                        {activeLocation && (
                            <Popup
                                position={[
                                    activeLocation.latitude,
                                    activeLocation.longitude
                                ]}
                                onClose={() => {
                                    this.setState({
                                        activeLocation: null
                                    })
                                }}
                            >
                                <div>
                                    <h2>{activeLocation.name}</h2>
                                </div>
                            </Popup>
                        )}
                    </Map>
                </React.Fragment>
            );
        }
    }
}

export default MainPage;