const express = require('express')
const app = express()
const port = 3000

const bp = require('body-parser')
const cors = require('cors');
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors({
    origin: '*'
}))

const cassandra = require("cassandra-driver")
var client = new cassandra.Client({
    contactPoints: ['54.91.181.52'],
    localDataCenter: 'dc1',
    keyspace: 'kuliah'
});

client.connect(function (err, result) {
    console.log('Cassandra connected');
});

app.get('/all-mahasiswa', (req, res) => {
    const query = "select * from mahasiswa";
    client.execute(query, [], (err, result) => {
        if (err) {
            res.status(404).send({ msg: err })
        } else {
            res.json(result)
        }
    })
})

app.post('/add-mahasiswa', (req, res) => {
    const nama = req.body.nama
    const nim = req.body.nim

    const query = "insert into mahasiswa (nim, nama) values (?, ?)"
    client.execute(query, [nim, nama], (err, result) => {
        if (err) {
            res.status(404).send({ msg: err })
        } else {
            res.status(200).send({
                message: `insert ${nim} & ${nama} success`,
                success: true
            })
        }
    })
})

app.delete('/del-mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim

    const query = "delete from mahasiswa where nim = ?"
    client.execute(query, [nim], (err, result) => {
        if (err) {
            res.status(404).send({ msg: err })
        } else {
            res.json({
                message: `delete ${nim} success`,
                success: true
            })
        }
    })
})

app.patch('/update-mahasiswa', (req, res) => {
    const nim = req.body.nim
    const nama = req.body.nama

    const query = "update mahasiswa set nama = ? where nim = ? if exists"
    client.execute(query, [nama, nim], (err, result) => {
        if (err) {
            res.status(404).send({ msg: err })
        } else {
            res.status(200).send({
                message: `update ${nim} & ${nama} success`,
                success: true
            })
        }
    })
})

app.listen(port, () => {
    console.log("start")
})