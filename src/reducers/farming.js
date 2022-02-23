import { RETREIVE_FARMERS, CREATE_FARMER } from "../actions/types";
const initialState = [];

const farmerReducer = (farming = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case RETREIVE_FARMERS:
            return payload;
        case CREATE_FARMER:
            return [...farming, payload];
        default:
            return farming;
    }
};
export default farmerReducer;
