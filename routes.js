const express = require("express")
const app = express()

// Importing All Routes
const ping = require("./routes/ping")
const users = require("./routes/users")
const venues = require("./routes/venues")
app.use(ping)
app.use(users)
app.use(venues)


module.exports = app
