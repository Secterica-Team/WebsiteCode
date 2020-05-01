import React from 'react';

export default React.createContext({
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
    currentDayMetadataTime: null,
    putCurrentLocation: (currentLocation, locationId, locationName, locationLatitude, locationLongitude) => {
    },
    putCurrentMetadata: (currentDayMetadataCO, currentDayMetadataCO2, currentDayMetadataDust, currentDayMetadataHumidity, currentDayMetadataTemperature, currentDayMetadataSmoke, currentDayMetadataLPQ, currentDayMetadataTime) => {
    }
});