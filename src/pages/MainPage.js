import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";
import "./MainPage.css";


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
    render() {
        const {error, isLoaded, locations} = this.state;
        //const [activeLocation, setActiveLocation] = React.useState(null);
        if (error) {
            return <div>Oops..something went wrong: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <React.Fragment>
                <Map center={[49.839684, 24.029716]} zoom={13}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {locations.map(location => (
                        <Marker
                            key={location.id}
                            position={[location.latitude, location.longitude]}
                            onMouseUp = {() => {
                                this.setState({
                                    activeLocation: location
                                })

                            }}
                            onMouseDown = {() => {
                                this.setState({
                                    activeLocation: null
                                })
                            }}

                        />
                    ))}
                    {this.state.activeLocation && (
                    <Popup
                        position={[
                            this.state.activeLocation.latitude,
                            this.state.activeLocation.longitude
                        ]}
                        onClose = {() => {
                            this.setState({
                                activeLocation: null
                            })
                        }}
                    >
                        <div>
                            <h2>{this.state.activeLocation.name}</h2>
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