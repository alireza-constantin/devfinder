const getdata = async () => {
	try {
		const res = await axios.get('https://api.github.com/users/defunkt');
		console.log(res);
	} catch (error) {
		console.log(error);
	}
};

getdata();
