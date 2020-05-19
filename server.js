// main entry
const express = require('express');
const connectDB = require('./config/db');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
connectDB();
app.use(compression());
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

process.env.DEBUG = true;

const limiter = rateLimit({
	windowMs: 1000, // 1 second
	max: 1, // limit each IP to 1 requests per windowMs
});

//  apply middleware to all requests
//app.use(limiter);

app.use('/top-stories', require('./routes/topStories'));

app.use('/search-news', require('./routes/searchNews'));

app.use('/auth', require('./routes/auth'));

app.use('/user', require('./routes/user'));

app.use('/card', require('./routes/card'));

app.use('/container', require('./routes/container'));

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => {
	console.log(`Server  started on ${PORT}`);
});
