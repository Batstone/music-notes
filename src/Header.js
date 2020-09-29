import React, { Component } from 'react';
import moment from 'moment';

const Header = () => {
    const date = moment().format('dddd MMMM Do YYYY');

    return (
        <header>
            <div class="wrapper">
                <div class="header-container">
                    <h1>Music App</h1>
                    <p>{date}</p>
                </div>
            </div>
        </header>
    )
}

export default Header