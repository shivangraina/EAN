const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

global.appRoot = path.resolve(__dirname);

const app = express();
const {
  authenticateToken,
} = require('./app/auth/AuthController/AuthenticateToken');

// require models here
const { db } = require('./app/models/connect');

// Indent response
app.set('json spaces', 2);

// to parse the data of Content-Type: application/json & application/x-www-form-urlencoded
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// enabling request from every url type.
app.use(cors());

// file storage paths
const filePath = path.resolve(__dirname, 'app', 'public');
app.use(express.static(filePath));

// Indent response
app.set('json spaces', 2);

// to parse the data of Content-Type: application/json & application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// enabling request from every url type.
app.use(cors());
// serve static files from here
app.use(express.static(path.join(__dirname, 'client/dashboard')));
app.use(express.static(path.join(__dirname, 'client/admin')));

// require routes here
const AuthRoutes = require('./app/auth/AuthRoutes/Authroute');
const noticeRoutes = require('./app/routes/noticeRoutes');
const tagsRoutes = require('./app/routes/tagsRoutes');
const teacherRoutes = require('./app/routes/adminRoutes');
const studentRoutes = require('./app/routes/studentRoutes');

const {
  activateAccount,
  activateAccountStudent,
} = require('./app/controllers/adminCtrl');

// list routes here
app.use('/api/auth', AuthRoutes);

app.use('/api/notice', authenticateToken, noticeRoutes);

app.use('/api/student', authenticateToken, studentRoutes);

app.use('/api/tags', authenticateToken, tagsRoutes);

app.use('/api/teacher', authenticateToken, teacherRoutes);

// no need to athenticate this api
app.get('/api/activateAccountTeacher', activateAccount);
app.get('/api/activateAccountStudent', activateAccountStudent);

// for react app
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static(path.join(__dirname, 'client/dashboard')));
  app.use(express.static(path.join(__dirname, 'client/admin')));
}

app.get('/dashboard', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dashboard', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'admin', 'index.html'));
});

app.get('/api', (req, res) => {
  res.send('Welcome To EAN app');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('Connected to EAN server...');
});
