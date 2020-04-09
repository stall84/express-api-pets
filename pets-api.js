
// Bring in required modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// intitialize body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// PORT initialization
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
})
