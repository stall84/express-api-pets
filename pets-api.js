
// Bring in required modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// intitialize body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// PORT initialization to the one set in environment or development of 4005
const PORT = process.env.PORT || 4005;

// create our (global) array of owner/pet objects
var owners = [
    { id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];


// Initializer/Listener
app.listen(PORT, () => {
    console.log(`Pets-API server is running/listening on PORT: ${PORT}`);
})

// GET /api/owners
app.get('/api/owners', (req,res) => {
    res.send(owners);
})

// GET /api/owners/:id
// route to get data for owners by id #
app.get('/api/owners/:id', (req,res) => {
    // logic to match the requested ID. Use parseInt method to turn the string returned to an integer
    let ownerID = parseInt(req.params.id);
    let currID = owners.find((element) => {
        return element.id === ownerID;
    });
    // add a 404 response if the ID parameter is not found in the global owners variable
    if (!currID) {
        res.status(404).send('The owner ID specified was not found (404)');
    };
    res.send(currID);
});

// POST /api/owners
// route to add new owners to owners variable. this will not allow adding pets, we will do that later on 
app.post('/api/owners', (req,res) => {
    console.log(`Received POST request at /api/owners on port: ${PORT}`);
    // create variable to store the new/next ID using the reduce method on the owners array to determine
    let nextID = owners.reduce((acc,element) => {
        if (element.id > acc) {
            return element.id;
        }
        return acc++
    }, 0) + 1
    // create/add-to owner - new object for new pet owner, their names, and an empty array-object for adding their pets.
    let newOwner = {
        id: nextID,
        name: req.body.name,
        pets: req.body.pets
    };
    owners.push(newOwner);
    res.send(`New owner object created: ${JSON.stringify(newOwner)}`);
});

// PUT /api/owners/:id
// route to update owners object in global owners array
app.put('/api/owners/:id', (req,res) => {
    console.log(`Received PUT request at /api/owners/:id on port ${PORT}`)
    // copy/paste code from above
    // logic to match the requested ID. Use parseInt method to turn the string returned to an integer
    let ownerID = parseInt(req.params.id);
    let currID = owners.find((element) => {
        return element.id === ownerID;
    });
    // add a 404 response if the ID parameter is not found in the global owners variable
    if (!currID) {
        res.status(404).send('The owner ID specified was not found (404)');
    };
    currID.name = req.body.name;
    res.send(`Successfully updated Owner's name to: ${currID.name}`);
});