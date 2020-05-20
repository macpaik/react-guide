import React, { useReducer, useState, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from './Search';
import useHttp from '../../hooks/http';

const ingredientReducer = (currentIngredients, action) => {
    switch (action.type) {
        case 'SET':
            return action.ingredients;
        case 'ADD':
            return [...currentIngredients, action.ingredient];
        case 'DELETE':
            return currentIngredients.filter(ing => ing.id !== action.id);
        default:
            throw new Error('Should not get there!');
    }
};

const Ingredients = () => {
    const [ userIngredients, dispatch ] = useReducer(ingredientReducer, []);
    const { isLoading, error, data, sendRequest, reqExtra, reqIdentifier, clear } = useHttp();
    // const [ userIngredients, setUserIngredients ] = useState([]);
    // const [ isLoading, setIsLoading ] = useState(false);
    // const [ error, setError ] = useState();

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
        if (!isLoading && !error && reqIdentifier === 'REMOVE_IDENTIFIER') {
            dispatch({ type: 'DELETE', id: reqExtra });
        } else if (!isLoading && reqIdentifier === 'ADD_IDENTIFIER') {
            dispatch({ type: 'ADD', ingredient: { id: data.name, ...reqExtra }})
        }
    }, [data, reqExtra, reqIdentifier]);

    const filteredIngredientsHandler = useCallback(filteredIngredients => {
        // setUserIngredients(filteredIngredients);
        dispatch({type: 'SET', ingredients: filteredIngredients});
    }, []);

    const addIngredientsHandler = useCallback(ingredient => {
        // setIsLoading(true);
        // dispatchHttp({type: 'SEND'});
        // fetch('https://react-hooks-update-65c60.firebaseio.com/ingredients.json', {
        //     method: 'POST',
        //     body: JSON.stringify(ingredient),
        //     headers: { 'Content-Type': 'application/json' }
        // }).then(response => {
        //     // setIsLoading(false);
        //     dispatchHttp({type: 'RESPONSE'});
        //     return response.json();
        // }).then(responseData => {
        //     // setUserIngredients(prevIngredients => [
        //     //     ...prevIngredients,
        //     //     { id: responseData.name, ...ingredient}
        //     // ]);
        //     dispatch({type: 'ADD', ingredient: { id: responseData.name, ...ingredient}})
        // });
        sendRequest(
            'https://react-hooks-update-65c60.firebaseio.com/ingredients.json',
            'POST',
            JSON.stringify(ingredient),
            ingredient,
            'ADD_INGREDIENT'
        );
    }, []);

    const removeIngredientHandler = useCallback(ingredientId => {
        // setIsLoading(true);
        // dispatchHttp({type: 'SEND'});
        // fetch(
        //     `https://react-hooks-update.firebaseio.com/ingredients/${ingredientId}.json`,
        //     {
        //         method: 'DELETE'
        //     }
        // ).then(response => {
        //     // setIsLoading(false);
        //     dispatchHttp({type: 'RESPONSE'})
        //     // setUserIngredients(prevIngredients =>
        //     //     prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
        //     // );
        //     dispatch({type: 'DELETE', id: ingredientId})
        // }).catch(error => {
        //     // setError(error.message);
        //     // setIsLoading(false);
        //     dispatchHttp({type: 'ERROR', errorMessage: error.message})
        // });
        sendRequest(
            `https://react-hooks-update-65c60.firebaseio.com/ingredients/${ingredientId}.json`,
            'DELETE',
            null,
            ingredientId,
            'REMOVE_INGREDIENT'
        );
    }, [sendRequest]);

    const clearError = useCallback(() => {
        // setError(null);
        // dispatchHttp({type: 'CLEAR'})
        clear();
    }, []);

    const ingredientList = useMemo(() => {
        return (
            <IngredientList
                ingredients={userIngredients}
                onRemoveItem={removeIngredientHandler}
            />
        );
    }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
        {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <IngredientForm
          onAddIngredient={addIngredientsHandler}
          loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
          {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
