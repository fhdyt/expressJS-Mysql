const express = require('express');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');

const app = express();


app.use(bodyParser.json());

const PORT = process.env.PORT || 3000

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.use(authRoutes);
app.use(profileRoutes);

app.listen(PORT, () => {
    console.log(`Server Running... ${PORT}`);
})
