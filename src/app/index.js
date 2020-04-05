const adjustDays = function(numberOfDays) {
	let days = document.querySelector('#day');
	while (days.firstChild) {
		days.removeChild(days.firstChild);
	}
	const none = document.createElement('option');
	none.value = 'none';
	none.innerHTML = '-- Day --';
	days.appendChild(none);
	for (let i = 1; i <= numberOfDays; i++) {
		const day = document.createElement('option');
		day.value = i;
		day.innerHTML = i;
		days.appendChild(day);
	}
};

const chooseDate = function(event) {
	console.log('hello there');
};

const monthChange = function(event) {
	const month = event.target.value;
	switch (month) {
		case 'JANUARY':
			adjustDays(31);
		case 'FEBRUARY':
			adjustDays(28);
		case 'MARCH':
			adjustDays(31);
		case 'APRIL':
			adjustDays(30);
		case 'MAY':
			adjustDays(31);
		case 'JUNE':
			adjustDays(30);
		case 'JULY':
			adjustDays(31);
		case 'AUGUST':
			adjustDays(31);
		case 'SEPTEMBER':
			adjustDays(30);
		case 'OCTOBER':
			adjustDays(31);
		case 'NOVEMBER':
			adjustDays(30);
		case 'DECEMBER':
			adjustDays(31);
	}
};

adjustDays(30);
