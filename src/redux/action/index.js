import axios from "axios";

export const ALL_COUNTRIES = "ALL_COUNTRIES";
export const FIND_NAME_COUNTRIES = "FIND_NAME_COUNTRIES";
export const GET_NAME_COUNTRY = "GET_NAME_COUNTRY";
export const FIND_ID_COUNTRY = "FIND_ID_COUNTRY";
export const GET_ALL_ACTIVITY = "GET_ALL_ACTIVITY";
export const CREATE_ACTIVITIES = "CREATE_ACTIVITIES"; 

//------------------ request pokemons ----------------

export const get_all_countries = () => async (dispatch) => {
    try {
        const getAllCountries = await axios.get("https://api-countries-deploy.vercel.app/countries__");
        return dispatch({
            type: ALL_COUNTRIES,
            payload: getAllCountries.data
        });
    } catch (error) {
        return dispatch({
            type: ALL_COUNTRIES,
            payload: {mensaje: error}
        });
    }
}

export const get_name_countries = (name) => async (dispatch) => {
    try {
        const getINameCountries = await axios.get(`https://api-countries-deploy.vercel.app/countries__/name?name=${name}`);
        return dispatch({
            type: FIND_NAME_COUNTRIES,
            payload: getINameCountries.data
        });
    } catch (error) {
        return dispatch({
            type: FIND_NAME_COUNTRIES,
            payload: {mensaje: error.message}
        });
    }
}

export const get_id_countries = (id) => async (dispatch) => {
    try {
        const getIdCountries = await axios.get(`https://api-countries-deploy.vercel.app/countries__/${id}`);
        return dispatch({
            type: FIND_ID_COUNTRY,
            payload: getIdCountries.data
        });
    } catch (error) {
        return dispatch({
            type: FIND_ID_COUNTRY,
            payload: {mensaje: error.message}
        });
    }
}

// --------- peticiones de las actividades------

export const get_all_activity = () => async (dispatch) => {
    try {
        const getAllActivities = await axios.get("https://api-countries-deploy.vercel.app/activity__");
        return dispatch({
            type: GET_ALL_ACTIVITY,
            payload: getAllActivities.data
        });
    } catch (error) {
        return dispatch({
            type: GET_ALL_ACTIVITY,
            payload: {mensaje: error}
        });
    }
}

export const create_activities = (obj) => async (dispatch) => {
    try {
        const createActivities = await axios.post(`https://api-countries-deploy.vercel.app/activity__`, obj);
        return dispatch({
            type: CREATE_ACTIVITIES,
            payload: createActivities.data
        });
    } catch (error) {
        return dispatch({
            type: CREATE_ACTIVITIES,
            payload: error
        });
    }
}

