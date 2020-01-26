import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
  return {
    ingredientName: name,
    type: actionTypes.ADD_INGREDIENT,
  };
};

export const removeIngredient = (name) => {
  return {
    ingredientName: name,
    type: actionTypes.REMOVE_INGREDIENT,
  };
};

export const setIngredients = (ingredients) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients: ingredients,
});

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};
export const initIngredients = () => (dispatch) => {
  axios
    .get('https://mwibusta-react-firebase.firebaseio.com/ingredients.json')
    .then(({ data }) => {
      dispatch(setIngredients(data));
    })
    .catch((error) => {
      dispatch(fetchIngredientsFailed());
    });
};
