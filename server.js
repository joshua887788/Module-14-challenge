// server.js
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const db = require('./models');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Express session
app.use(
  session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(routes);

// Sync the database and start the server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
