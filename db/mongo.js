 const mongoose = require('mongoose');
 const project = mongoose.createConnection('mongodb://localhost:27017/project');
 
 module.exports = {
     project
 };
 