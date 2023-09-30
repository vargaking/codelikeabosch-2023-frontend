import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://dene.sh/bosch/api',
	headers: {
		'Content-Type': 'application/json'
	}
});

export default axiosInstance;
