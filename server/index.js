const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv").config()


app.use(express.json());

app.use(cors({
    origin: "*"
}))
const db = require("./models")

const osobaRute = require("./routes/osoba-routes")
const mobitelRute = require("./routes/mobitel-routes")
const korisnikRute = require("./routes/korisnik-routes")
const commentRute = require("./routes/comments-routes")
const brandRute = require("./routes/brand-routes")

app.use("/", osobaRute);
app.use("/", mobitelRute);
app.use("/", korisnikRute);
app.use("/", commentRute);;
app.use("/", brandRute);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Its working!");
    })
});