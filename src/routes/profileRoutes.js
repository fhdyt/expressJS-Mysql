const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../mysql');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/users', (req, res) => {
    const sql    = "SELECT * FROM KONF_WEB";
    db.query(sql, function (error, result, fields){
        if(error){
            console.log(error)
        } else {
            if(result.length > 0)
            {
            //     const hasil = result.map(function(el) {
            //     var o = Object.assign({}, el);
            //     const pembukaan    = "SELECT * FROM KONF_INFORMASI WHERE KONF_LINK='"+el.KONF_LINK+"'";
            //     const a = db.query(pembukaan, function (error, result_a, fields){
            //     console.log(result_a[0].KONF_LINK)
            //     })
            //    o.pembukaan = a;
            //     return o;
               // })
                return res.send(result);
            }
            else
            {
                return res.status(422).send({ error: 'Wrong Password' });
            }
        }
    });

});

router.get('/users/:id', (req, res) => {
    const id = req.params.id;

    const sql    = "SELECT * FROM USER WHERE USER_ID = ? ";
    db.query(sql,[ id ], function (error, result, fields){
        if(error){
            console.log(error)
        } else {
            if(result.length > 0)
            {
                return res.send(result);
            }
            else
            {
                return res.status(422).send({ error: 'Wrong Password' });
            }
        }
    });

});

router.put('/users', (req, res) => {
    const { email, password, name, id }= req.body;
    console.log(email)
    const sql    = "UPDATE USER SET USER_EMAIL = ?, USER_PASSWORD = ?, USER_NAME = ? WHERE USER_ID = ?";
    db.query(sql,[ email, password, name, id ], function (error, result, fields){
        if(error){
            console.log(error)
        } else {
            if(result.affectedRows >= 1) {
                return res.send('Update Success');
            }
            else {
                return res.status(422).send({ error: 'Something Wrong' });
            }
        }
    });
});

router.delete('/users', (req, res) => {
    const { id }= req.body;
    const sql    = "DELETE FROM USER WHERE USER_ID = ? ";
    db.query(sql,[ id ], function (error, result, fields){
        if(error){
            console.log(error)
        } else {
            if(result.affectedRows == 1) {
                return res.send('Deleted');
            }
            else {
                return res.status(422).send({ error: 'Something Wrong' });
            }
        }
    });
});


module.exports = router;
