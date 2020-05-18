import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';

const Ingredients = () => {
    const [ userIngredients, setUserIngredients ] = useState([]);

    // Deleted because of fetched by filter
    // useEffect(() => {
    //     fetch('https://react-hooks-update-65c60.firebaseio.com/ingredients.json').then(
    //         response => response.json()
    //     ).then(responseData => {
    //         const loadedIngredients = [];
    //         for (const key in responseData) {
    //             loadedIngredients.push({
    //                 id: key,
    //                 title: responseData[key].title,
    //                 amount: responseData[key].amount
    //             });
    //         }
    //         setUserIngredients(loadedIngredients);
    //     });
    // }, []);

    useEffect(() => {
        console.log('RENDERING INGREDIENTS', userIngredients);
    }, [userIngredients]);

    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        setUserIngredients(filteredIngredients);
    }, []);

    const addIngredientsHandler = ingredient => {
        fetch('https://react-hooks-update-65c60.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            setUserIngredients(prevIngredients => [
                ...prevIngredients,
                { id: responseData.name, ...ingredient}
            ]);
        });
    };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientsHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  );
}

export default Ingredients;
