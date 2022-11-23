import {createStore} from 'redux';
import myReducer from './MyReducer';
const myStore = createStore(myReducer);
export default myStore;