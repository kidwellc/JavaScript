// The API toolkit for making REST systems easily
const express = require('express');
// A good solution for handling JSON data in routes
const bodyParser = require('body-parser');
// Node JS modules for filesystem access
const fs = require('fs');
// Our database connection
// This will be a JSON object of our programmers
// and can be accessed as if it was any other javascript
// object
const database = require('./programmers.json');

// Make an instance of our express application
const app = express();
// Specify our > 1024 port to run on
const port = 3000;

// Apply our middleware so our code can natively handle JSON easily
app.use(bodyParser.json());

// We must have our list of programmers to use
if (!fs.existsSync('./programmers.json')) {
  throw new Error('Could not find database of programmers!');
}

// Build our routes
app.get('/', (req, res) => res.json(database));

app.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (id < database.length) {
        res.status(200).send(database[req.params.id]);
    }
    else {
        res.status(404).send(`Record with ID: ${id} Not Found!`);
    }
});
    
app.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    console.log('++++++ Body');
    console.log(req.body);
    if (id >= database.length) {
        res.status(404).send(`Record with ID: ${id} Not Found!`);
    }
    else {
        console.log('++++++ Original database');
        console.log(database);
        database[id] = req.body;
        console.log('++++++ Modified database');
        console.log(database);
        res.status(201).send(`Updated Record ${id}`);
    }
});

app.post('/', function(req,res){
        console.log('++++++ Body');
        console.log(req.body);
        database[database.length] = req.body;
        console.log('++++++ Modified database');
        console.log(database);
        res.status(201).send(`Record Added`);
});        

// IMPLEMENT A ROUTE TO HANDLE ALL OTHER ROUTES AND RETURN AN ERROR MESSAGE

app.listen(port, () => {
  console.log(`It's alive on port ${port}`);
});
