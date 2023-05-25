const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost/thoughtsdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=> {
    console.log('Connected to MongoDB');
}).catch((error)=>{
    console.error('Failed to connect', error);
});
app.use('/api',routes);


app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});