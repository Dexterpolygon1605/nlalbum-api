const express = require('express')

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = {
    user: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            numFavorites: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            numFavorites: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.user)
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.user[0].email && req.body.password === database.user[0].password) {
        res.json('success')
    } else {
        res.status(400).json('erro logging in');
    }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    database.user.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        numFavorites: 0,
        joined: new Date()
    })
    res.json(database.user[database.user.length - 1]);
})


app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.user.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('not found buddy')
    }
})


app.put('/favorites', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.user.forEach(user => {
        if (user.id === id) {
            found = true;
            user.numFavorites++;
            return res.json(user.numFavorites);
        }
    })
    if (!found) {
        res.status(404).json('not found buddy')
    }
})



app.listen(3000, () => {
    console.log('app is running on port 3000')
})

/*
/ --> res = this is working
/signin --> POST success/fail
/register --> POST = user
/profile/:userId --> GET = user
/song --> PUT --> user
/favorites --> POST = user
/support --> POST = support
*/