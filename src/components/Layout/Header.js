import React from 'react';
import moment from 'moment';
import logo from '../../assets/music-notes-logo.png';

const Header = () => {
    const date = moment().format('dddd MMMM Do YYYY');

    return (
        <header>
            <div className="wrapper">
                <div className="headerContainer">
                    <div className="logoContainer">
                        <img src={logo} alt="The music notes logo" />
                    </div>
                    <p>{date}</p>
                </div>
            </div>
        </header>
    )
}

export default Header