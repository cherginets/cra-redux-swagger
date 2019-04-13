export const TMP_COUNT_PLUS = 'TMP_COUNT_PLUS';

const initialState = {
    count: 0,
};

export const counter = (state = initialState, action) => {
    switch (action.type) {
        case TMP_COUNT_PLUS:
            return {
                ...state,
                count: state.count + action.value
            };
        default:
            return state
    }
};

export function tmp_count_plus() {
    return (dispatch, getStore) => {
        dispatch({
            type: TMP_COUNT_PLUS,
            value: 1,
        });
    }
}
