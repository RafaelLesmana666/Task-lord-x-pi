/* express-server */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

/* mongodb-server */
mongoose
    .connect("mongodb://127.0.0.1:27017/task-lord-x")
    .then(function (resolve, rejected) {
        console.log("koneksi ke database berhasil.. ");
    })
    .catch(function (rejected) {
        console.log("gagal koneksi ke database: ", rejected);
    });
mongoose.Promise = global.Promise;

/* express-listener */
const app = express();
const port = 5123;
const host = "127.0.0.1";
app.listen(port, host, function () {
    console.log(`server m'dengarkan di ${host}:${port}`);
});

/* middleware(s) */
// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// cors
let corsOptions = {
    origin: "http://127.0.0.1:5123",
    optionSuccessStatus: 200
}
app.use(cors());
// // routing
// const routes = require("./routes/route");
// app.use("/api", routes);
