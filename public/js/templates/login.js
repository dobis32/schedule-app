console.log('login js');
const login = async function() {
	const username = document.querySelector('#username-input').value;
	const password = document.querySelector('#password-input').value;
	let result = await (await postData(`/user/login`, { username, password })).json();
	console.log(result);
};
