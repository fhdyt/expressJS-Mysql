const express = require('express');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const bodyParser = require('body-parser');
//const requireAuth = require('./middlewares/requireAuth');

const app = express();
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());



app.get('/', (req,res) => {
    res.json({'message': 'ok'});
});

app.use(authRoutes);


app.use(uploadRoutes);
app.use(profileRoutes);

app.listen(PORT, () => {
    console.log(`Server Running... ${PORT}`);
})
