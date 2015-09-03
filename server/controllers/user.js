var express = require('express');
var neo4j = require('neo4j');

var router = express.Router();

var db = new neo4j.GraphDatabase('http://neo4j:123456@localhost:7474');

router.post('/', function (req, res) {
    console.log("Insert User: " + JSON.stringify(req.body));

    db.cypher({
        query: 'CREATE (u:User {user})',
        params: {
            user: req.body
        }
    }, function (err, results) {
        if (err) {
            res.status(500).json(err);
        }else {
            res.status(200).end();
        }
    });

});

router.get('/:id', function (req, res) {
    console.log("Select User: " + req.params.id);

    db.cypher({
        query: 'MATCH (user:User {id: {id}}) RETURN user',
        params: {
            id: parseInt(req.params.id, 10)
        },
        lean: true
    }, function (err, results) {
        if (err) {
            res.status(500).json(err);
            return;
        }

        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        if (results.length === 0 || !results[0].user) {
            res.status(404).json({message: "user not found!"});
        }
        else {
            res.status(200).json(results[0].user);
        }
    });
});

router.put('/:id', function (req, res) {
    console.log("Update User: " + req.params.id + " => " + JSON.stringify(req.body));

    var user = req.body;
    user.id = parseInt(req.params.id, 10);

    db.cypher({
        query: 'MATCH (u:User {id: {id}}) SET u={user}',
        params: {
            id: user.id,
            user: user
        }
    }, function (err) {
        if (err) {
            res.status(500).json(err);
        }else {
            res.status(200).end();
        }
    });
});

router.delete('/:id', function (req, res) {
    console.log("Delete User: " + req.params.id);

    db.cypher({
        query: 'MATCH (u:User {id: {id}}) DELETE u',
        params: {
            id: parseInt(req.params.id, 10)
        }
    }, function (err) {
        if (err) {
            res.status(500).json(err);
        }else {
            res.status(200).end();
        }
    });
});

module.exports = router;