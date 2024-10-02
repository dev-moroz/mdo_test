import axios from 'axios';

const url = process.env.VUE_APP_API_URL

const auth = async(username, password) => {
    try {
        const response = await axios.post(
            url + '/auth/login/ ',
            {username, password}
        )
        const token = response.data.key;
        localStorage.setItem('authToken', token);

        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    } catch (error) {
        console.error('Error during login:', error);
    }
}

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');  // Или токен из Vuex
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

const create = async(data) => {
    const response = await axios.post(
    url + `/appeals/v1.0/appeals/`,
        data
    )
    console.log('response', response)
    return response?.data?.results;
}

const getHomes = async() => {
    const response = await axios.get(
        url + `/geo/v2.0/user-premises/`
    )
    return response.data.results
}

// const getApartment = async(premise_id) => {
//     const response = await axios.get(
//         url + `/geo/v1.0/apartments/?premise_id=${premise_id}&search=`
//     )
//     return response.data.results
// }
//
// const editData = async({data, appeal_id}) => {
//     const response = await axios.patch(
//         url + `/appeals/v1.0/appeals/${appeal_id}`,
//         data
//     )
//     return response.data.results
// }

const testSearch = async(query) => {
    let stringQuery
    if(query?.length) stringQuery = query.map(item => {
        return `?${item.key}=${item.value}`
    }).join('')


    // Дом (premise_id) // Дропдаун-автокоплит GET https://dev.moydomonline.ru/api/geo/v2.0/user-premises/?search=...
    // Квартира (apartment_id) // Дропдаун-автокоплит GET https://dev.moydomonline.ru/api/geo/v1.0/apartments/?premise_id={premise_id}&search=



    const response = await axios.get(
    url + `/geo/v2.0/user-premises${stringQuery}`
    )
    console.log('response', response)
    return response.data.results;
}
export { auth, getData, create, testSearch, getHomes };

// async function getConditionRules({offset, search}) {
//     let query = `&offset=${offset}`
//     if(search) query = search + query
//
//     return defaultApiInstance.get(`/conditionsRules?q=${query}`);
// }