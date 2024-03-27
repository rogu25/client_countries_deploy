import { ALL_COUNTRIES, FIND_NAME_COUNTRIES, FIND_ID_COUNTRY, GET_ALL_ACTIVITY, CREATE_ACTIVITIES } from "../action";

const initialState = {
    countries: [],
    mensaje: "",
    avisos:{},
    detalle_country: {},
    activities: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }

        case FIND_NAME_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                mensaje: action.payload.mensaje && action.payload.mensaje
            }
        case FIND_ID_COUNTRY:
            return {
                ...state,
                detalle_country: action.payload,
                mensaje: action.payload.mensaje && action.payload.mensaje
            }

        case GET_ALL_ACTIVITY:
            return {
                ...state,
                activities: action.payload
            }

        case CREATE_ACTIVITIES:
            return {
                ...state,
                avisos: action.payload.mensaje ? {
                    mensaje: action.payload.mensaje
                } : {error: action.payload.error}
            }

        default:
            return state;
    }
};

export default rootReducer;