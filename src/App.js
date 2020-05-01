import React from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import MainPage from './pages/MainPage';
import Location from './pages/Location';
import MainNavigation from './components/Navigation/MainNavigation';
import LocationContext from './context/location-context';

class App extends React.Component {
    state = {
        currentLocation: null,
        locationId: null,
        locationName: null,
        locationLatitude: null,
        locationLongitude: null,
        currentDayMetadataCO: null,
        currentDayMetadataCO2: null,
        currentDayMetadataDust: null,
        currentDayMetadataHumidity: null,
        currentDayMetadataTemperature: null,
        currentDayMetadataSmoke: null,
        currentDayMetadataLPQ: null,
        currentDayMetadataTime: null
    };

    putCurrentLocation = (currentLocation, locationId, locationName, locationLatitude, locationLongitude) => {
        this.setState({
            currentLocation: currentLocation,
            locationId: locationId,
            locationName: locationName,
            locationLatitude: locationLatitude,
            locationLongitude: locationLongitude
        });
    };
    putCurrentMetadata = (currentDayMetadataCO, currentDayMetadataCO2, currentDayMetadataDust, currentDayMetadataHumidity, currentDayMetadataTemperature, currentDayMetadataSmoke, currentDayMetadataLPQ, currentDayMetadataTime) => {
        this.setState({
            currentDayMetadataCO: currentDayMetadataCO,
            currentDayMetadataCO2: currentDayMetadataCO2,
            currentDayMetadataDust: currentDayMetadataDust,
            currentDayMetadataHumidity: currentDayMetadataHumidity,
            currentDayMetadataTemperature: currentDayMetadataTemperature,
            currentDayMetadataSmoke: currentDayMetadataSmoke,
            currentDayMetadataLPQ: currentDayMetadataLPQ,
            currentDayMetadataTime: currentDayMetadataTime
        });
    };

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <LocationContext.Provider
                        value={{
                            currentLocation: this.state.currentLocation,
                            locationId: this.state.locationId,
                            locationName: this.state.locationName,
                            locationLatitude: this.state.locationLatitude,
                            locationLongitude: this.state.locationLongitude,
                            currentDayMetadataCO: this.state.currentDayMetadataCO,
                            currentDayMetadataCO2: this.state.currentDayMetadataCO2,
                            currentDayMetadataDust: this.state.currentDayMetadataDust,
                            currentDayMetadataHumidity: this.state.currentDayMetadataHumidity,
                            currentDayMetadataTemperature: this.state.currentDayMetadataTemperature,
                            currentDayMetadataSmoke: this.state.currentDayMetadataSmoke,
                            currentDayMetadataLPQ: this.state.currentDayMetadataLPQ,
                            currentDayMetadataTime: this.state.currentDayMetadataTime,
                            putCurrentLocation: this.putCurrentLocation,
                            putCurrentMetadata: this.putCurrentMetadata
                        }}>
                        <MainNavigation/>
                        <main className="main-content">
                            <Switch>
                                <Redirect from="/" to="/main" exact/>
                                <Route path="/main" component={MainPage}/>
                                <Route path="/location" component={Location}/>
                            </Switch>
                        </main>
                    </LocationContext.Provider>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
