const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.json({
    message: "Hello docker 3000"
  })
})

app.listen(3000, () => {
  console.log("hello docker 3000")
})