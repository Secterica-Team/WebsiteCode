import React, {Component} from 'react';
import "./Location.css";
import LocationContext from '../context/location-context'

class Location extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            currentDayMetaData: null
        };
    }

    static contextType = LocationContext;

    componentDidMount() {
        const currentLocationToDisplay = localStorage.getItem('currentLocation');
        const currentLocationToDisplayId = localStorage.getItem('currentLocationId');
        this.context.putCurrentLocation(currentLocationToDisplay, currentLocationToDisplayId);
        fetch(`http://heysmellproject-env.eba-uctmjbw3.us-east-2.elasticbeanstalk.com/air-quality/last_day?location=${encodeURIComponent(currentLocationToDisplayId)}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        currentDayMetaData: result[result.length - 1]
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
        const {error, isLoaded, currentDayMetaData} = this.state;
        if (error) {
            return <div>Oops..something went wrong: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="my_current_location">
                    <h1>Location</h1>
                </div>

            );
        }
    }
}

export default Location;