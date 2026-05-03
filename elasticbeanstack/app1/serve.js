
const express = require("express")
const app = express()


app.get("/", (req, res) => res.send("Hello from node js in elastic bean stack"))

const port = process.env.PORT || 8081;

app.listen(port, () => console.log("App started at " + port))