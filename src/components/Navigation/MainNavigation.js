import React from 'react';
import {NavLink} from 'react-router-dom';

import './MainNavigation.css';
const mainNavigation = props => (
    <header className="main-navigation">
        <div className="main-navigation__logo">
            <NavLink to= "/main">
                <img src={require('../../Logo.png')} alt ="Logo"/>
            </NavLink>
        </div>
        <nav className="main-navigation__item">
            <ul>
                <li>
                    <button type="button">Choose your station</button>
                </li>
            </ul>
        </nav>
    </header>
);

export default mainNavigation;