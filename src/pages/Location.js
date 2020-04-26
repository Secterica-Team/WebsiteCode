import React, {Component} from 'react';
import "./Location.css";
import  LocationContext from '../context/location-context'

class Location extends Component {

    static contextType = LocationContext;

    componentDidMount() {
        const currentLocationToDisplay = localStorage.getItem('currentLocation');
        const currentLocationToDisplayId = localStorage.getItem('currentLocationId');
        this.context.putCurrentLocation(currentLocationToDisplay, currentLocationToDisplayId);
    }

    render() {
        return(
            <div className="my_current_location">
            <h1>Location</h1>
            </div>

        );
    }
}
export default Location;