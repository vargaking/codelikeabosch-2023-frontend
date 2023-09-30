export const radian = (degree: number) => (degree * Math.PI) / 180;

export const textSplitter = (text: string, length: number) => {
	if (text.length > length) {
		return text.slice(0, length) + '...';
	}
	return text;
};
