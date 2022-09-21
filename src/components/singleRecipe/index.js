import React from 'react';
import './style.css';

export default function SingleRecipe(props) {
    return (
        <div>
            <img className='single__img' alt='Recipe Dish' src={props.imageSrc} />
            <p className='single__label' >{props.labelText}</p>
        </div>
    )
}
