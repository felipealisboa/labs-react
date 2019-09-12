import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const usersReducer = (currentUsers, action) => {
  switch (action.type) {
    case 'SET':
      return action.users;
    case 'SORT':
      return currentUsers.sort(usr => usr.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const listUsers = () => {
  const [userUserList, dispatch] = useReducer(usersReducer, []);
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    clear
  } = useHttp();

  useEffect(() => {
      if (!isLoading && !error === 'SORT_USERS') {
        dispatch({ type: 'SORT', id: reqExtra });
      });
    }
  }, [data, reqExtra, isLoading, error]);

  const filteredUsersHandler = useCallback(filteredUsers => {
    dispatch({ type: 'SET', users: filteredUsers });
  }, []);

  const sortUsersHandler = useCallback(user => {
    sendRequest(
      'https://localhost:3001',
      'POST',
      JSON.stringify(user),
      user,
      'SORT_USERS'
    );
  }, [sendRequest]);

  const removeIngredientHandler = useCallback(
    ingredientId => {
      sendRequest(
        `https://react-hooks-update.firebaseio.com/ingredients/${ingredientId}.json`,
        'DELETE',
        null,
        ingredientId,
        'REMOVE_INGREDIENT'
      );
    },
    [sendRequest]
  );

  const userList = useMemo(() => {
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
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
};

export default listUsers;
