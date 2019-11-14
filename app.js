const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const routes = require('./routes/index');
const helpers = require('./helpers');
/* note to be deleted once required has been finished. add: error handle, passport, 
express-valid, flash(?), cookie paser (?),*/
//create our express app
const app = express();