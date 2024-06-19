const express = require('express');
const cors = require('cors');
const serviceRoutes = require('./routes/serviceRoutes');
const sequelize = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', serviceRoutes);

sequelize.sync().then(() => console.log('Database connected'));

module.exports = app;
