// TODO generateAvailability doesn't work
// needs to talk to backend -- which is
// is currently throwing errors

const postData = async function(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *client
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response;
};

const getData = async function(url = '') {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		// headers: {
		// 	'Content-Type': 'application/json'
		// 	// 'Content-Type': 'application/x-www-form-urlencoded',
		// },
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer' // no-referrer, *client
	});
	return response;
};

const adjustDays = function(numberOfDays) {
	let days = document.querySelector('#date');
	while (days.firstChild) {
		days.removeChild(days.firstChild);
	}
	const none = document.createElement('option');
	none.value = 'none';
	none.innerHTML = '-- Date --';
	days.appendChild(none);
	let d = new Date();
	for (let i = 1; i <= numberOfDays; i++) {
		if (i >= d.getDate()) {
			const day = document.createElement('option');
			day.value = i;
			day.innerHTML = i;
			days.appendChild(day);
		}
	}
};

const monthChange = function(event) {
	const month = event.target.value;
	switch (month) {
		case 'JANUARY':
			adjustDays(31);
			break;
		case 'FEBRUARY':
			adjustDays(28);
			break;
		case 'MARCH':
			adjustDays(31);
			break;
		case 'APRIL':
			adjustDays(30);
			break;
		case 'MAY':
			adjustDays(31);
			break;
		case 'JUNE':
			adjustDays(30);
			break;
		case 'JULY':
			adjustDays(31);
			break;
		case 'AUGUST':
			adjustDays(31);
			break;
		case 'SEPTEMBER':
			adjustDays(30);
			break;
		case 'OCTOBER':
			adjustDays(31);
			break;
		case 'NOVEMBER':
			adjustDays(30);
			break;
		case 'DECEMBER':
			adjustDays(31);
			break;
	}
};

const generateAvailability = function(appointments) {
	console.log('appointments for that date', appointments);
	appointments.forEach((appointment) => {
		let slot = document.getElementById(`${appointment.time}`);
		slot.classList.remove('available');
		slot.classList.add('unavailable');
		slot.removeEventListener('click', () => {});
	});
};

// When the user clicks anywhere outside of the modal, close it
const showTimeSlots = function() {
	const timeSlots = document.querySelector('#slots');
	while (timeSlots.firstChild) timeSlots.removeChild(timeSlots.lastChild);
	for (let i = 9; i < 18; i++) {
		let time = `${i > 12 ? i - 12 : i}:00${i < 12 ? 'AM' : 'PM'}`;
		let timeSlot = document.createElement('div');
		timeSlot.classList.add('available');
		timeSlot.classList.add('time-slot');
		timeSlot.id = 'T' + time;
		let h3 = document.createElement('h3');
		h3.innerHTML = time;
		timeSlot.appendChild(h3);
		timeSlots.appendChild(timeSlot);
		time = `${i > 12 ? i - 12 : i}:30${i < 12 ? 'AM' : 'PM'}`;
		timeSlot = document.createElement('div');
		timeSlot.classList.add('available');
		timeSlot.classList.add('time-slot');
		timeSlot.id = 'T' + time;
		h3 = document.createElement('h3');
		h3.innerHTML = time;
		timeSlot.appendChild(h3);
		timeSlots.appendChild(timeSlot);
	}
};

const openModal = function(appointmentData) {
	let { month, date, year, time } = appointmentData;
	document.querySelector('#appointment-notes').value = '';
	modal.style.display = 'block';
	const appointmentTime = document.querySelector('#appointment-date');
	const appointment = `${month} ${date} ${year} ${time}`;
	appointmentTime.innerHTML = appointment;
	document.querySelector('#time-buffer').value = appointment;
};

const chooseDate = async function() {
	const month = document.querySelector('#month').selectedIndex;
	const date = document.querySelector('#date').selectedIndex + (new Date().getDate() - 1);
	const year = parseInt(document.querySelector('#year').value);
	showTimeSlots();
	let response = await getData(`/appointments?year=${year}&month=${month}&date=${date}`);
	let data = await response.json();
	if (data.result) generateAvailability(data.appointments);
	// open modal
	document.querySelectorAll('.available').forEach((availableSlot) => {
		availableSlot.addEventListener('click', (event) => {
			let appointmentData = {
				time: event.target.innerHTML,
				month,
				date,
				year
			};
			openModal(appointmentData);
		});
	});
};

// get modal DOM element
const modal = document.getElementById('myModal');

// close modal
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};

// close modal
const span = document.getElementsByClassName('close')[0];
span.onclick = function() {
	modal.style.display = 'none';
};

document.querySelector('#confirm-appointment').addEventListener('click', () => {
	modal.style.display = 'none';
	const appointment = document.querySelector('#time-buffer').value;
	const notes = document.querySelector('#appointment-notes').value;
	let [ month, date, year, time ] = appointment.split(' ');
	postData('/appointments/make', { month, date, year, time: `T${time}`, notes })
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			let { result, appointment } = data;
			if (result) generateAvailability([ appointment ]);
		});
});

let date = new Date(Date.now());
showTimeSlots(); // render time slots to DOM
document.getElementById('month').selectedIndex = date.getMonth() + 1;
monthChange({ target: { value: document.getElementById('month').value } });
document.getElementById('date').selectedIndex = 1;
document.getElementById('month').selectedIndex = date.getMonth() + 1;
document.getElementById('year').value = date.getFullYear();
chooseDate(); // get appointments for today's date
