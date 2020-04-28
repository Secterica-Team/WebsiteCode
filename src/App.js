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
    locationId: null
  };

  putCurrentLocation = (currentLocation, locationId) => {
    this.setState({currentLocation: currentLocation, locationId: locationId});
  };

  render() {
    return (
        <BrowserRouter>
          <React.Fragment>
            <LocationContext.Provider
                value={{
                  currentLocation: this.state.currentLocation,
                  locationId: this.state.locationId,
                  putCurrentLocation: this.putCurrentLocation
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
