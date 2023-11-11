const express = require("express")
const app = express()


app.use(require("./routes/ping"))
app.use(require("./routes/users"))
app.use(require("./routes/venues"))
app.use(require("./routes/courts"))


module.exports = app
