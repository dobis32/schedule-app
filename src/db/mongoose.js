const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/node-http-req', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
});

// mongoose.connect('mongodb+srv://swoods1:sw32dbs95@srdptywoods-cccrm.gcp.mongodb.net/test?retryWrites=true&w=majority', {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useFindAndModify: false
// });
