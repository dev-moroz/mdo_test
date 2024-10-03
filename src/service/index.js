import axios from 'axios';

const url = process.env.VUE_APP_API_URL

const auth = async(username, password) => {
    try {
        const response = await axios.post(
            url + '/auth/login/',
            {username, password}
        )
        if(response?.status === 200) {
            const token = response.data.key;
            localStorage.setItem('authToken', token);

            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            return true
        }else{
            console.error('Error during login, status is: ', response?.status);
            return false
        }
    } catch (error) {
        console.error('Error during login:', error);
        return false
    }
}

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const getData = async() => {
    const response = await axios.get(
    url + `/appeals/v1.0/appeals`
    )
    return response.data.results;
}

const getHomes = async() => {
    const response = await axios.get(
        url + `/geo/v2.0/user-premises/`
    )
    return response.data.results
}

const getFlats = async (homeId) => {
    const response = await axios.get(
        url + `/geo/v1.0/apartments/?premise_id=${homeId}`
    )
    return response.data.results
}

const createRequest = async (data) => {
    try {
        const response = await axios.post(
            url + `/appeals/v1.0/appeals/`,
            data
        )
        return response
    } catch (error) {
        return error.response.data.data
    }
}

const saveRequest = async (data) => {
    try {
        const response = await axios.patch(
            url + `/appeals/v1.0/appeals/${data.id}/`,
            data
        )
        return response
    } catch (error) {
        return error.response.data.data
    }
}

export { auth, getData, getHomes, getFlats, createRequest, saveRequest };