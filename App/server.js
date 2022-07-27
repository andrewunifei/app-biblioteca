const express = require("express")
const cors = require("cors");
const path = __dirname + "/dist/";

const app = express()

app.use(express.static(path))
app.use(express.json());

// Determina se é produção ou desenvolvimento
if(process.env.NODE_ENV == 'production'){
    app.use(cors());

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Header',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
    
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).send({});
        }
        next();
    });
}
else{
    var corsOptions = {
        origin: "http://localhost:8081"
    };

    app.use(cors(corsOptions));
}

const db = require("./models");
db.sequelize.sync();

app.get('/', (req, res) => {
    res.sendFile(path + 'index.html')
});

appRouter = require("./routes/routes.js");
app.use("/api", appRouter);

const PORT = process.env.PORT  || 8080;
app.listen(PORT, () => {
    console.log("Servidor ouvindo na porta", PORT)
})