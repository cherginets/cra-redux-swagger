export const GLOBAL_NODE_SET = 'GLOBAL_NODE_SET';
export const GLOBAL_SAVE_CHANGES = 'GLOBAL_SAVE_CHANGES';
export const GLOBAL_LANG_SET = 'GLOBAL_LANG_SET';
export const GLOBAL_CLEAR = 'GLOBAL_CLEAR';
export const GLOBAL_PAGE_CURRENT_SET = 'GLOBAL_PAGE_CURRENT_SET';
export const GLOBAL_SET_STATE = 'GLOBAL_SET_STATE';

const initialState = { node: {},
    nodes: [],
    changes: true,
    current_page: false,// Код текущей страницы
    current_config: {},
    mode: false,
    version: process.env.REACT_APP_VERSION,

    options_interfaces: [],
    options_interfaces_map: {},
};

export const global = (state = initialState, action) => {
    switch (action.type) {
        case GLOBAL_PAGE_CURRENT_SET:
            return {
                ...state,
                current_page: action.current_page,
            };
        case GLOBAL_NODE_SET:
            return {
                ...state,
                node: action.node,
            };
        case GLOBAL_CLEAR:
            return initialState;
        case GLOBAL_SET_STATE:
            return {
                ...state,
                ...action.state || {}
            };
        default:
            return state
    }
};

export function global_clear() {
    return (dispatch, getStore) => {
        dispatch({
            type: GLOBAL_CLEAR,
        });
    }
}

export function global_page_current_set(current_page) {
    return (dispatch, getStore) => {
        dispatch({
            type: GLOBAL_PAGE_CURRENT_SET,
            current_page: current_page
        });
    }
}

export function get_current_config(current_config) {
    return (dispatch, getStore) => {
        dispatch({
            type: GLOBAL_SET_STATE,
            current_config
        });
    }
}

export function global_set_version(version) {
    return (dispatch, getStore) => {
        dispatch({
            type: GLOBAL_SET_STATE,
            state: {version},
        });
    }
}

