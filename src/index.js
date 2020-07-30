const express = require('express');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.json());
app.use(authRoutes);

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Listening on Port 3000');
})