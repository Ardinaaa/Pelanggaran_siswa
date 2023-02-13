//inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
//moment
const moment = require("moment")
// router
const siswaroute = require("./siswa")
const userroute = require("./user")
const pelanggaranroute = require("./pelanggaran")
const transaksiroute = require("./transaksi")


//implementasi
const app = express()
app.use(express.static(__dirname))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(siswaroute)
app.use(userroute)
app.use(pelanggaranroute)
app.use(transaksiroute)


app.listen(8000, () => {
    console.log("iya ini bisa")
})
