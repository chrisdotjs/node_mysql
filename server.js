// Load our App Server using Express
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

app.use(morgan('short')) // || combined

// users/id: Route
app.get('/users/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = mysql.createConnection({
        host: 'localhost', // IP
        database: 'mysql_db1',
        user: 'root',
        password: '20792079'
    })

/*    const queryString = "SELECT * FROM airport_frequencies \
    WHERE airport_ident = 'KLAX' \
    LIMIT 5;"
*/

    const queryString = "SELECT * FROM users \
    WHERE id = ? \
    AND first_name = 'Draymond' \
    OR last_name = 'Durant' \
    OR first_name = 'Stephen' \
    OR first_name = 'Brian';"

    const userId = req.params.id
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            res.sendStatus(500)
//            return
            throw err
        }

    console.log("I think we fetched users successfully")
//        res.json(rows)

/*        const users = rows.map((row) => {
            return {firstName: row.first_name, lastName: row.last_name}
        })
        res.json(users)
*/        
    res.json(rows)
})

//    res.end()
})

// Root Route
app.get("/", (req, res) => {
    console.log("Responding to root route")
    res.send("Hello World!")
})

// users Route
app.get("/users", (req, res) => {
    var user1 = {firstName: "Stephen", lastName: "Curry"}
    var user2 = {firstName: "Kevin", lastName: "Durant"}

    res.json([user1, user2])
})

// localhost:3003
app.listen(3003, () => {
    console.log("Express Server is up and listening on Port 3003, Connected to database")
})
