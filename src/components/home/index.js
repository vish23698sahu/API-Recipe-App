import React, { useState, Fragment, useEffect } from 'react'
import axios from 'axios';
import './style.css';
import RecipeTile from '../recipeTile';
import Navbar from '../navbar';
import SingleRecipe from '../singleRecipe';
import { YOUR_APP_ID } from '../../key';
import { YOUR_APP_KEY } from '../../key';

export default function Home() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [healthLabel, setHealthLabel] = useState('vegan');
    const [showHome, setShowHome] = useState(true);

    let selectDish;
    const randomDish = [
        {
            dishId: 1,
            queryName: 'rice'
        },
        {
            dishId: 2,
            queryName: 'juice'
        },
        {
            dishId: 3,
            queryName: 'paneer'
        },
        {
            dishId: 4,
            queryName: 'tofu'
        },
        {
            dishId: 5,
            queryName: 'lemon'
        },
        {
            dishId: 6,
            queryName: 'croissant'
        },
        {
            dishId: 7,
            queryName: 'jeera'
        },
        {
            dishId: 8,
            queryName: 'potato'
        },
        {
            dishId: 9,
            queryName: 'spinach'
        },
        {
            dishId: 10,
            queryName: 'noodles'
        },
    ]
    selectDish = Math.floor((Math.random() * 10));
    // console.log(selectDish);
    var dishOfTheDay = randomDish[selectDish].queryName;
    // console.log(dishOfTheDay);

    let singleHomeRecipeUrl = `https://api.edamam.com/search?q=${dishOfTheDay}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&cuisineType=chinese&healthLabels=${healthLabel}`;

    var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&cuisineType=chinese&healthLabels=${healthLabel}`;

    let singleImage = [];
    let singleLabel = [];

    //On Home, below form show random Recipe images : when some one lands on Home
    function getRecipesSingle() {
        axios.get(singleHomeRecipeUrl).then((result) => {
            console.log('data useeffect', result.data);
            setRecipes(result.data.hits);
        }).catch((e) => {
            console.log(e.message);
        });
    }

    useEffect(() => {
        getRecipesSingle();
    }, [showHome]);

    async function getRecipes() {
        var result = await axios.get(url);
        setRecipes(result.data.hits);
        console.log(result.data);
    }

    function onSubmit(e) {
        e.preventDefault();
        setShowHome(false);
        getRecipes();
    }

    const onBahuClickHandler = async () => {
        setShowHome(false);
        setQuery('indian');
        var result = await axios.get(url);
        setRecipes(result.data.hits);
        console.log(result.data);
    }

    const onLunchDinnerClickHandler = async () => {
        setShowHome(false);
        setQuery('Lunch Dinner');
        var result = await axios.get(url);
        setRecipes(result.data.hits);
        console.log(result.data);

    }

    const onHomeClickHandler = () => {
        setQuery('');
        setShowHome(true);
    }

    return (
        <Fragment>
            <div>
                <Navbar onHomeClick={onHomeClickHandler} onBahuClick={onBahuClickHandler} onLunchDinnerClick={onLunchDinnerClickHandler} />
            </div>
            <div className='home' >
                <h1>Delicious Recipes on Finger Tips</h1>
                <form className='app__searchForm' onSubmit={onSubmit} >
                    <input
                        type='text'
                        className='app__input'
                        placeholder='enter ingredient'
                        value={query}
                        onChange={(e) => { setQuery(e.target.value) }}
                    />
                    <input className='app__submit' type='submit' value='Search' />
                    <select className='home__healthLabels'>
                        <option onClick={() => setHealthLabel('vegan')}>vegan</option>
                        <option onClick={() => setHealthLabel('vegetarian')}>vegetarian</option>
                        <option onClick={() => setHealthLabel('paleo')}>paleo</option>
                        <option onClick={() => setHealthLabel('dairy-free')}>dairy-free</option>
                        <option onClick={() => setHealthLabel('gluten-free')}>gluten-free</option>
                        <option onClick={() => setHealthLabel('wheat-free')}>wheat-free</option>
                        <option onClick={() => setHealthLabel('low-sugar')}>low-sugar</option>
                        <option onClick={() => setHealthLabel('egg-free')}>egg-free</option>
                        <option onClick={() => setHealthLabel('peanut-free')}>peanut-free</option>
                        <option onClick={() => setHealthLabel('soy-free')}>soy-free</option>
                        <option onClick={() => setHealthLabel('fish-free')}>fish-free</option>
                    </select>
                </form><br />

                {
                    showHome &&
                    <div>
                        <p className='home__homeText'>Get Ready to encounter World wide Mouth Watering Recipes </p>
                        {recipes.forEach(recipe => {
                            singleImage.push(recipe['recipe']['image']);
                            singleLabel.push(recipe['recipe']['label']);
                        })}
                        <SingleRecipe imageSrc={singleImage[0]} labelText={singleLabel[0]} />
                    </div>
                }

                {!showHome && <div className='home__recipes'>
                    {recipes.map((recipe) => {
                        return <RecipeTile recipe={recipe} />
                    })}
                </div>}
            </div>
        </Fragment>
    )
}
