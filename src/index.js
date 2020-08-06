const express = require('express');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(authRoutes);
app.use(profileRoutes);

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server Running... ${PORT}`);
})
