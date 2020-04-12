// TODO generateAvailability doesn't work
// needs to talk to backend -- which is
// is currently throwing errors

const removeElementChildren = function(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
};

const renderDays = function(days, numberOfDays, fullMonth) {
	const month = document.querySelector('#month').value;
	console.log(month);
	let d = new Date();
	for (let i = 1; i <= numberOfDays; i++) {
		if (i >= d.getDate() || fullMonth) {
			const day = document.createElement('option');
			day.value = i;
			day.innerHTML = i;
			days.appendChild(day);
		}
	}
};

const adjustDays = function(numberOfDays) {
	let days = document.querySelector('#date');
	removeElementChildren(days);
	const none = document.createElement('option');
	none.value = 'none';
	none.innerHTML = '-- Date --';
	days.appendChild(none);
	let d = new Date();
	let fullMonth = true;
	if (document.getElementById('month').selectedIndex == d.getMonth() + 1) fullMonth = false;
	renderDays(days, numberOfDays, fullMonth);
};

const monthChange = function(event) {
	const month = event.target.value.toUpperCase();
	console.log(month);
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

const generateTimeSlotOnTheHour = function(timeSlots, i) {
	let time = `${i > 12 ? i - 12 : i}:00${i < 12 ? 'AM' : 'PM'}`;
	let timeSlot = document.createElement('div');
	timeSlot.classList.add('available');
	timeSlot.classList.add('time-slot');
	timeSlot.id = 'T' + time;
	let h3 = document.createElement('h3');
	h3.innerHTML = time;
	timeSlot.appendChild(h3);
	timeSlots.appendChild(timeSlot);
};

const generateTimeSlotOnHalfHour = function(timeSlots, i) {
	let time = `${i > 12 ? i - 12 : i}:30${i < 12 ? 'AM' : 'PM'}`;
	let timeSlot = document.createElement('div');
	timeSlot.classList.add('available');
	timeSlot.classList.add('time-slot');
	timeSlot.id = 'T' + time;
	let h3 = document.createElement('h3');
	h3.innerHTML = time;
	timeSlot.appendChild(h3);
	timeSlots.appendChild(timeSlot);
};

// When the user clicks anywhere outside of the modal, close it
const showTimeSlots = function() {
	const timeSlots = document.querySelector('#slots');
	removeElementChildren(timeSlots);
	for (let i = 9; i < 18; i++) {
		generateTimeSlotOnTheHour(timeSlots, i);
		generateTimeSlotOnHalfHour(timeSlots, i);
	}
};

const openModal = function(appointmentData) {
	let { month, date, year, time } = appointmentData;
	document.querySelector('#appointment-notes').value = '';
	scheduleModal.style.display = 'block';
	const appointmentTime = document.querySelector('#appointment-date');
	appointmentTime.innerHTML = `${month}/${date}/${year} ${time}`;
	document.querySelector('#time-buffer').value = `${month} ${date} ${year} ${time}`;
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
const scheduleModal = document.getElementById('schedule-apt-modal');

// close modal
window.onclick = function(event) {
	if (event.target == scheduleModal) {
		scheduleModal.style.display = 'none';
	}
};

// close modal
const span = document.getElementsByClassName('close')[0];
span.onclick = function() {
	scheduleModal.style.display = 'none';
};

document.querySelector('#confirm-appointment').addEventListener('click', () => {
	scheduleModal.style.display = 'none';
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

const initDatePicker = function() {
	let date = new Date(Date.now());
	document.getElementById('month').selectedIndex = date.getMonth() + 1;
	monthChange({ target: { value: document.getElementById('month').value } });
	document.getElementById('date').selectedIndex = 1;
	document.getElementById('year').value = date.getFullYear();
	chooseDate(); // get appointments for today's date
};

showTimeSlots(); // render time slots to DOM
initDatePicker();
