import { backend_url } from '$lib/stores';
import axios from '../config/axios';

backend_url.subscribe((value) => {
	axios.defaults.baseURL = value;
});

export const getAllDemoNames = async () => {
	const { data } = await axios.get('/demo');
	return data;
};

export const getSingleDemoData = async (id: number) => {
	const { data } = await axios.get(`/demo/${id}`);
	return data;
};

export const processUserFile = async (file: File) => {
	const formData = new FormData();
	formData.append('file', file);
	const { data } = await axios.post('/demo', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
	return data;
};
