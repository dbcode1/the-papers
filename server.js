// main entry
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
connectDB();
require('dotenv').config();
app.use(express.json({ extended: false }));

process.env.DEBUG = true;

//  apply middleware to all requests
//app.use(limiter);

app.use('/api/search-news', require('./routes/searchNews'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/card', require('./routes/card'));
app.use('/api/container', require('./routes/container'));


// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));  });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
