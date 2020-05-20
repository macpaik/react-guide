import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import useHttp from "../../hooks/http";
import './Search.css';

const Search = React.memo(props => {
    const { onLoadIngredients } = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();
    const {isLoading, data, error, sendRequest, clear} = useHttp();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredFilter === inputRef.current.value) {
                const query = enteredFilter.length === 0
                    ? ''
                    : `?orderBy="title"&equalTo="${enteredFilter}"`;
                sendRequest(
                    'https://react-hooks-update-65c60.firebaseio.com/ingredients.json' + query,
                    'GET'
                );
                fetch('https://react-hooks-update-65c60.firebaseio.com/ingredients.json' + query).then(
                    response => response.json()
                ).then(responseData => {
                    const loadedIngredients = [];
                    for (const key in responseData) {
                        loadedIngredients.push({
                            id: key,
                            title: responseData[key].title,
                            amount: responseData[key].amount
                        });
                    }
                    onLoadIngredients(loadedIngredients);
                });
            }
        }, 500);
        // clean up function
        return () => {
            clearTimeout(timer);
        };
    }, [enteredFilter, onLoadIngredients, inputRef]);

    useEffect(() => {
        if (!isLoading && !error &&)
    }, [data, isLoading, error]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
              ref={inputRef}
              type="text"
              value={enteredFilter}
              onChange={event =>
                  setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
