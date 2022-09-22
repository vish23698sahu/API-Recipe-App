import React from 'react'
import Logo from '../../media/FoodRecipeLogo.png';
import './style.css';

export default function Navbar(props) {
    return (
        <div className='navbar'>
            <div className='navbar__img'>
                <img src={Logo} onClick={props.onHomeClick} height='60px' width='70px' alt='Food Recipe Logo' />
                <span onClick={props.onHomeClick} className='navbar__homeText'>Fooodze</span>
            </div>
            <div className='navbar__item1' >Tips and Tricks</div>
            <div className='navbar__item2' onClick={props.onNewbieClick}>Newbie Dishes</div>
            <div className='navbar__item3' onClick={props.onLunchDinnerClick}>Easy Lunch & Dinners</div>
        </div>
    )
}
