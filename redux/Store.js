import {createStore} from 'redux';
import favItemsReducer from './FavReducer';

const store = createStore(favItemsReducer);

export default store;
