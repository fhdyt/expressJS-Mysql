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
    
});

router.post('/signin', (req, res) => {
    const { email, password} = req.body;

    if(!email || !password) {
        return res.status(422).send({ error: 'Check Your Email and Password' });
    }
    else{
        const sql    = "SELECT * FROM USER WHERE USER_EMAIL= ?";
        db.query(sql,[email], function (error, result){
            if(error){
                console.log(error)
            }else{
                if(result.length >0) {
                    if(result[0].USER_PASSWORD != password) {
                        return res.status(422).send({ error: 'Wrong Password' });
                    }
                    else {
                        const token = jwt.sign({ userId: result.insertId }, 'MY_SECRET_KEY' );
                        res.send({ token : token });
                    }
                }
                else {
                    return res.status(422).send({ error: 'Email Not Found' });
                }
            }
        });
    }

});

module.exports = router;