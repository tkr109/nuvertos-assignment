const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database');
const Compound = require('./models/Compound');

const app = express();

app.use(cors());
app.use(bodyParser.json());


const compoundRoutes = require('./routes/compoundRoutes');
const authRoutes = require('./routes/authRoutes');


app.use('/api/compounds', compoundRoutes);
app.use('/api/auth', authRoutes);


sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => console.error('Error syncing database:', err));

module.exports = app;  