const { connect, connection } = require('mongoose');

const connectionString = 
process.env.MONGODB_URI || 'mongodb://localhost:27017/socialdb';
connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports = connection;