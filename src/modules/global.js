export const GLOBAL_SET_STATE = 'GLOBAL_SET_STATE';

const initialState = {
    authorized: true,
    section: false,
};

export const global = (state = initialState, action) => {
    switch (action.type) {
        case GLOBAL_SET_STATE:
            return {
                ...state,
                ...action.state || {}
            };
        default:
            return state
    }
};
