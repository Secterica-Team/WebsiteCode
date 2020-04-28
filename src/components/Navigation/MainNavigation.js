import React from 'react';
import {NavLink} from 'react-router-dom';
import LocationContext from '../../context/location-context';
import './MainNavigation.css';

const mainNavigation = props => (
    <LocationContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation__logo">
                        <NavLink to="/main">
                            <img src={require('../../Logo.svg')} alt="Logo"/>
                        </NavLink>
                    </div>
                    <nav className="main-navigation__item">
                        <ul>
                            {!context.currentLocation && <li>
                                <button type="button">Choose your station</button>
                            </li>}
                            {context.currentLocation && <li>
                                <button type="button">Convert to PDF</button>
                            </li>}
                            {context.currentLocation && <li>
                                <button type="button">Convert To Excel</button>
                            </li>}
                        </ul>
                    </nav>
                </header>
            );
        }}
    </LocationContext.Consumer>
);

export default mainNavigation;