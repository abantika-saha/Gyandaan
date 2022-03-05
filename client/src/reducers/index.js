import { combineReducers } from 'redux';

import auth from './auth';
import blogs from './blog';
import open from './open';
import doubts from './doubts';
import meetings from './meetings';


export const reducers = combineReducers({ auth,blogs,open, doubts ,meetings});


