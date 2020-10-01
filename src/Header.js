import React from 'react';
import moment from 'moment';

const Header = () => {
    const date = moment().format('dddd MMMM Do YYYY');

    return (
        <header>
            <div className="wrapper">
                <div className="headerContainer">
                    <h1>Music Notes <span>♫</span></h1>
                    <p>{date}</p>
                </div>
            </div>
        </header>
    )
}

export default Header