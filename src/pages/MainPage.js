import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer, Circle, CircleMarker} from "react-leaflet";
import {Icon} from "leaflet";
import "./MainPage.css";
import {useHistory} from "react-router-dom";
import {Redirect} from "react-router-dom";
import  LocationContext from '../context/location-context'


const myMarker = new Icon({
    iconUrl: require("../my_marker_location.svg"),
    iconSize: [50,55]
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
                <Map center={[49.839684, 24.029716]} zoom={9}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {locations.map(location => (
                        <Marker
                            key={location.id}
                            position={[location.latitude, location.longitude]}

                            onMouseOver = {() => {
                                this.setState({
                                    activeLocation: location
                                });
                            }}

                            onMouseOut = {() => {
                                this.setState({
                                    activeLocation: null
                                })
                            }}

                            onClick={() => {
                                this.setState({
                                    activeLocation: location
                                });
                                this.handleClick();
                                this.context.putCurrentLocation(location, location.id);
                            }}
                            icon = {myMarker}
                        />
                    ))}
                    {activeLocation && (
                    <Popup
                        position={[
                            activeLocation.latitude,
                            activeLocation.longitude
                        ]}
                        onClose = {() => {
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