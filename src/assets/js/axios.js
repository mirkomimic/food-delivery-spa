import axios from 'axios'

axios.defaults.withXSRFToken = true;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000'