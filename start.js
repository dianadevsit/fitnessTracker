const mongoose = require('mongoose');
//import enviormental variables from variables.env
require('dotenv').config({ pat: 'variables.env' });
//connecting to db and will handle if connection is bad
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; 
//tell mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🚫🚫🚫🚫 ERROR → ${err.message}`);
});
//import all models
require('./models/Profile');
require('./models/Fitness');
require('./models/User');
//start app
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});