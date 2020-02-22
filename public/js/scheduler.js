// const date = new Date(Date.now());
// const date2 = new Date('01/03/1995');
// console.log(date.getDate());
// console.log(date2.getMonth());

// array of arrays => sub-array of objects => object = {day}
// let appointments = {
// 	year2020: {
// 		JANUARY: [ { date: '5', time: '9:30AM' }, { date: '5', time: '2:00PM' }, { date: '5', time: '2:30PM' } ],
// 		FEBRUARY: [],
// 		MARCH: [],
// 		APRIL: [],
// 		MAY: [],
// 		JUNE: [],
// 		JULY: [],
// 		AUGUST: [],
// 		SEPTEMBER: [],
// 		OCTOBER: [],
// 		NOVEMBER: [],
// 		DECEMBER: []
// 	}
// };
let appointments = [
	{ year: 2020, month: 'january', day: 5, time: '9:30AM' },
	{ year: 2020, month: 'january', day: 5, time: '2:30PM' },
	{ year: 2020, month: 'january', day: 5, time: '3:00PM' }
];

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

const generateAvailability = function(month, day, year) {
	appointments.forEach((appointment) => {
		if ((appointment.month == month.toLowerCase(), appointment.year == year, appointment.day == day)) {
			let slot = document.querySelector(`#T${appointment.time.split(':').join('')}`);
			slot.classList.remove('available');
			slot.classList.add('unavailable');
			slot.removeEventListener('click', () => {});
		}
	});
};

// When the user clicks anywhere outside of the modal, close it

const chooseDate = function() {
	const month = document.querySelector('#month').value;
	const day = document.querySelector('#day').value;
	const year = document.querySelector('#year').value;

	let slots = document.querySelector('#slots');
	while (slots.firstChild) {
		slots.removeChild(slots.firstChild);
	}

	const timeSlotsSection = document.querySelector('#slots');
	for (let i = 9; i < 18; i++) {
		let time = `${i > 12 ? i - 12 : i}:00${i < 12 ? 'AM' : 'PM'}`;
		let timeSlot = document.createElement('div');
		timeSlot.classList.add('time-slot');
		timeSlot.id = 'T' + time.split(':').join('');
		let h3 = document.createElement('h3');
		h3.innerHTML = time;
		timeSlot.appendChild(h3);
		timeSlotsSection.appendChild(timeSlot);
		time = `${i > 12 ? i - 12 : i}:30${i < 12 ? 'AM' : 'PM'}`;
		timeSlot = document.createElement('div');
		timeSlot.classList.add('time-slot');
		timeSlot.id = 'T' + time.split(':').join('');
		h3 = document.createElement('h3');
		h3.innerHTML = time;
		timeSlot.appendChild(h3);
		timeSlotsSection.appendChild(timeSlot);
	}

	document.querySelectorAll('.time-slot').forEach((slot) => {
		slot.classList.add('available');
	});
	generateAvailability(month, day, year);

	// open modal
	document.querySelectorAll('.available').forEach((availableSlot) => {
		availableSlot.addEventListener('click', (event) => {
			document.querySelector('#appointment-notes').value = '';
			modal.style.display = 'block';
			const appointmentTime = document.querySelector('#appointment-date');
			const appointment = `${month} ${day} ${year}, ${event.target.innerHTML}`;
			appointmentTime.innerHTML = appointment;
			document.querySelector('#time-buffer').value = appointment;
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
	console.log(appointment, notes);
});
