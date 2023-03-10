const express = require ("express");
const router = express.Router()
const db = require ("./db")

router.post("/pelanggaran_siswa", (req,res)=>{
    let data = {
        id_siswa: req.body.id_siswa,
        id_user: req.body.id_user,
        waktu: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    
    let pelanggaran = JSON.parse(req.body.pelanggaran)
    let sql = "insert into pelanggaran_siswa set ?"

    db.query(sql, data, (error, result)=>{
        let response = null
        
        if(error){
            res.json({message: error.message})
        } else{
            let lastID = result.insertID

            let data = []
            for (let index = 0; index < pelanggaran.length; index++){
                data.push([
                    lastID, pelanggaran[index].id_pelanggaran
                ])
            }

            let sql = "insert into detail_pelanggaran_siswa values ?"

            db.query(sql, [data], (error, result)=>{
                if (error){
                    res.json({message: error.message})
                } else{
                    res.json({message: "data has been inserted"})
                }
            })
        }
    })
})

router.get("/pelanggaran_siswa", (req,res)=>{
    let sql = "select p.id_pelanggaran_siswa, p.id_siswa,p.waktu, s.nis, s.nama_siswa, p.id_user, u.nama_user" +
    " from pelanggaran_siswa p join siswa s on p.id_siswa = s.id_siswa" + 
    " join user u on p.id_user = u.id_user"

    db.query(sql, (error, result)=>{
        if (error){
            res.json({ message: error.message})
        } else{
            res.json({
                count: result.length,
                pelanggaran_siswa: result
            })
        }
    })
})

router.delete("/pelanggaran_siswa/:id_pelanggaran_siswa", (req,res)=>{
    let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa}

    let sql = "delete from detail_pelanggaran_siswa where ? "

    db.query(sql, param, (error, result)=>{
        if (error){
            res.json({message: error.message})
        } else{
            let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa}

            let sql = "delete from pelanggaran_siswa where ? "
            db.query(sql, param, (error, result)=>{
                if (error){
                    res.json({message: error.message})
                } else{
                    res.json({message: "Data has been deleted"})
                }
            })
        }
    })
})

module.exports = router