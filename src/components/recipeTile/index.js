import React from 'react';
import './style.css';

export default function RecipeTile({ recipe }) {
    return (
        <div className='recipeTile' >
            <img className='recipeTile__img' src={recipe['recipe']['image']} alt='your Food' />
            <p className='recipeTile__name' >{recipe['recipe']['label']}</p>
        </div>
    )
}
