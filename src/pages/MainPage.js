import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon} from "leaflet";
import "./MainPage.css";

class MainPage extends Component {
    render() {
        return (
            <Map center={[49.839684, 24.029716]} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </Map>
        );
    }
}

export default MainPage;