import axios from '../config/axios';

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
	console.log(file);
	formData.append('file', file);
	const { data } = await axios.post('/demo', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
	return data;
};
