var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({
  contactPoints: ['18.213.32.39'],
  localDataCenter: 'datacenter1'
});
client.connect(function (err, result) {
  console.log('Cassandra connected');
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  client.execute(getAllUsers, [], function (err, result) {
    if (err) {
      res.status(404).send({ msg: err });
    } else {
      res.json(result);
    }
  })
});

module.exports = router;
var getAllUsers = 'Select * From curhapp.users';
