import { combineReducers } from 'redux'
import {permanent} from './permanent'
import {global} from './global'

import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
};

export default combineReducers({
    permanent: persistReducer(persistConfig, permanent),
    global,
})
