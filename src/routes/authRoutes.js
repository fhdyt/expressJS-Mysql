const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../../mysql');

const router = express.Router();

router.post('/signup', (req, res) => {
    const { email,password } = req.body;
    try{
        const sql      = "INSERT INTO USER (USER_EMAIL, USER_PASSWORD) values (?,?)";
        db.query(sql,[ email, password ],function (error, result, fields){
        if(error){
            console.log(error);
            res.send(error);
        } else {
            console.log(result)
            const token = jwt.sign({ userId: result.insertId }, 'MY_SECRET_KEY' );
            res.send({ token : token });
        }
    });
    } catch (err) {
        return res.status(422).send(err.message)
    }
    
})

module.exports = router;