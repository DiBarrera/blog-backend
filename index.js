const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3001;
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

app.get("/api/v1/", (req,res) => {
    res.send("Endpoint para recuperar la url del avatar, req.files sigue apareciendo vacío")
})

mongoose.connect(
    `mongodb://${IP_SERVER}:${PORT_DB}/webpersonalblog`,
    { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
        if(err) {
            throw err
        } else {
            console.log("La conexion a la base de datos es correcta.")

            app.listen(port, () => {
                console.log("######################");
                console.log("###### API REST ######");
                console.log("######################");
                console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
            })
        }
    }
);