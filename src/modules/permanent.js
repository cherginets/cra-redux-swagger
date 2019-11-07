export const PERMANENT_SET_STATE = 'PERMANENT_SET_STATE';

const initialState = {
    token: false,
    count: 0,
};

export const permanent = (state = initialState, action) => {
    switch (action.type) {
        case PERMANENT_SET_STATE:
            return {
                ...state,
                ...action.state || {},
            };
        default:
            return state
    }
};

export function permanent_clear() {
    return (dispatch, getStore) => {
        dispatch({
            type: PERMANENT_SET_STATE,
            state: initialState,
        });
    }
}
