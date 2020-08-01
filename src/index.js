const express = require('express');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(authRoutes);
app.use(profileRoutes);

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Listening on Port 3000...');
})