const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/scheduler', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
});

// mongoose.connect('mongodb+srv://dev:vander123>@dev0-cccrm.gcp.mongodb.net/test?retryWrites=true&w=majority', {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useFindAndModify: false
// });
