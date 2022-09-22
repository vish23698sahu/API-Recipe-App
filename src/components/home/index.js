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
    const [singleRecipe, setSingleRecipe] = useState([]);
    const [healthLabel, setHealthLabel] = useState('vegan');
    const [showHome, setShowHome] = useState(true);
    let isNew;
    let isLunchD;

    let selectDish;
    const randomDish = [
        {
            dishId: 1,
            queryName: 'rice'
        },
        {
            dishId: 2,
            queryName: 'curd'
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
        {
            dishId: 11,
            queryName: 'muffins'
        },
        {
            dishId: 12,
            queryName: 'Icecream'
        }
    ]
    selectDish = Math.floor((Math.random() * 12));
    var dishOfTheDay = randomDish[selectDish].queryName;
    let selectOneFromArray;

    if (selectDish === 12) selectOneFromArray = 0;
    if (selectDish === 6) selectOneFromArray = 1;
    else selectOneFromArray = Math.floor((Math.random() * 10));

    let singleHomeRecipeUrl = `https://api.edamam.com/search?q=${dishOfTheDay}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&cuisineType=chinese&healthLabels=${healthLabel}`;

    var url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&cuisineType=chinese&healthLabels=${healthLabel}`;

    let singleImage = [];
    let singleLabel = [];

    //On Home, below form show random Recipe images : when some one lands on Home
    function getRecipesSingle() {
        axios.get(singleHomeRecipeUrl).then((result) => {
            console.log('data useeffect', result.data);
            setSingleRecipe(result.data.hits);
        }).catch((e) => {
            console.log(e.message);
        });
    }

    useEffect(() => {
        getRecipesSingle();
    }, []);

    const onHomeClickHandler = () => {
        setQuery('');
        setShowHome(true);
    }

    async function getRecipes() {
        var result = await axios.get(url);
        setRecipes(result.data.hits);
    }

    function onSubmit(e) {
        e.preventDefault();
        setShowHome(false);
        getRecipes();
        console.log('Data on Click', recipes);
    }

    const onNewbieClickHandler = () => {
        isNew = 1;
        setQuery('easy');
        setShowHome(false);
        getRecipes();
        console.log('query ', query);
        console.log('Data Easy', recipes);
    }

    const onLunchDinnerClickHandler = () => {
        isLunchD = 1;
        setQuery('Lunch Dinner');
        setShowHome(false);
        getRecipes();
        console.log('query', query);
        console.log('Data Lunch Dinner', recipes);
    }

    useEffect(() => {
        if (isNew === 1) {
            setQuery('easy');
        }
        if (isLunchD === 1) {
            setQuery('Lunch Dinner');
        }
    }, [onNewbieClickHandler, onLunchDinnerClickHandler]);

    return (
        <Fragment>
            <div>
                <Navbar onHomeClick={onHomeClickHandler} onNewbieClick={onNewbieClickHandler} onLunchDinnerClick={onLunchDinnerClickHandler} />
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
                        {singleRecipe.forEach(recipe => {
                            singleImage.push(recipe['recipe']['image']);
                            singleLabel.push(recipe['recipe']['label']);
                        })}
                        <SingleRecipe imageSrc={singleImage[selectOneFromArray]} labelText={singleLabel[selectOneFromArray]} />
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
