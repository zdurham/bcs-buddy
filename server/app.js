require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const { connect } = require('./models');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use(routes);

connect().then(() => {
  console.info('connected to mongodb instance');
  app.listen(PORT, () => {
    console.info(`App is listening on port: ${PORT}`);
  });
});
