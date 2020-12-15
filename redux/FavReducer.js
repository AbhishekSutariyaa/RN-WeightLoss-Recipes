import {RECIPE_DATA} from '../Data';

export const ADD_TO_FAV = 'ADD_TO_FAV';
export const REMOVE_FROM_FAV = 'REMOVE_FROM_FAV';
export const SET_FILTER = 'SET_FILTER';

const initialState = {
  favorite: [],
  meal: RECIPE_DATA,
  filteredMeals: RECIPE_DATA,
  isVegEnabled: true,
  isNonVegEnabled: true,
};

const favItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAV:
      return {...state, favorite: [...state.favorite, action.payload]};
    case REMOVE_FROM_FAV:
      const existingIndex = state.favorite.findIndex(
        (meal) => meal === action.payload,
      );
      if (existingIndex >= 0) {
        const updatedFavMeals = [...state.favorite];
        updatedFavMeals.splice(existingIndex, 1);
        return {...state, favorite: updatedFavMeals};
      }
    case SET_FILTER:
      const {isVegEnabled, isNonVegEnabled} = action.payload;
      const filterData = state.meal.filter((item) => {
        if (item.type == 'veg' && isVegEnabled) return true;
        if (item.type == 'nonveg' && isNonVegEnabled) return true;
      });

      // console.log('=======filterData===', filterData);
      return {
        ...state,
        isVegEnabled,
        isNonVegEnabled,
        filteredMeals: filterData,
      };
  }
  return state;
};

export default favItemsReducer;
