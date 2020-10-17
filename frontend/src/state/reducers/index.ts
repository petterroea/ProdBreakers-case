import { combineReducers } from 'redux';

import { authentication } from './authentication';

const rootReducer = combineReducers({
    authentication,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export default rootReducer;
