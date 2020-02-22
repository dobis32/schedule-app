const express = require('express');
const app = express();
const hbs = require('hbs'); // nodemon src/app.js -e js,hbs
const path = require('path');
const schedulerRouter = require('./routers/scheduler');
//require('./db/mongoose');

const port = process.env.PORT || 3001;
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(publicDirectoryPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(schedulerRouter);

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
