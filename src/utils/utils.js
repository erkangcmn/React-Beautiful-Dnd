import axios from 'axios'


export const BASE_URL = 'https://607be1e167e65300175735e2.mockapi.io/'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
})


export { axiosInstance }
