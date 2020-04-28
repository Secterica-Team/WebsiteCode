import React from 'react';
export default React.createContext({
    currentLocation: null,
    locationId: null,
    putCurrentLocation: (currentLocation, locationId) => {}
});