const express = require ("express");
const router = express.Router()
const db = require ("./db")

router.get("/user", (req, res) => {
    //create sql query
    let sql = "select * from user"

    //run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message //pesan error
            }
        } else {
            response = {
                count: result.length, //jumlah data
                user: result //isi data
            }
        }
        res.json(response) //send response
    })
})

//end point akses data siswa berdasarkan id_siswa tertentu
router.get("/user/:id", (req, res) => {
    let data = {
        id_siswa: req.params.id_user
    }
    //create sql query
    let sql = "select * from siswa where ?"

    //run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message //pesan error
            }
        } else {
            response = {
                count: result.length, //jumlah data
                user: result //isi data
            }
        }
        res.json(response) //send response
    })
})

//end point menyimpan data siswa
router.post("/user", (req, res) => {

    //prepare data
    let data = {
        nama_user : req.body.nama_user,
        username : req.body.username,
        password : req.body.password
    }

    //create sql query insert
    let sql = "insert into user set ?"

    //run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) //send response
    })
})

//end point mengubah data siswa
router.put("/user", (req, res) => {

    //prepare data
    let data = [
        //data
        {
            nama_user : req.body.nama_user,
            username : req.body.username,
            password : req.body.password
        },

        //parameter (primary key)
        {
            id_user : req.body.id_user
        }
    ]

    //create sql query update
    let sql = "update user set ? where ?"

    //run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) //send response
    })
})

//end point menghapus data siswa berdasarkan id_siswa
    router.delete("/user/:id", (req, res) => {
    //prepare data
    let data = {
        id_user: req.params.id_user
    }

    //create query sql delete
    let sql = "delete from user where ?"

    //run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) //send response
    })
})

module.exports = router