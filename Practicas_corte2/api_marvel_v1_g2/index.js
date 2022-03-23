const express = require('express');
const { mongoose } = require('mongoose');
const my_app = express();
const port = 4000;
const routerApi = require('./routes');

require('dotenv').config();
routerApi(my_app)

my_app.listen(port, () => {
  console.log('Port active');
});

/* Endpoint: http://localhost:4000 */
my_app.get('/', (req, res) => {
  res.send('Api marvel V1');
});

mongoose
  .connect(process.env.MONGODB_STRING_CONNECTION)
  .then(() => console.log('Success connection'))
  .catch((error) => {
    console.error(error);
  });
