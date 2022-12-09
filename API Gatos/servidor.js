const express = require("express")
const rutas = require('./routes/ruta_gato'); //IMPORTAMOS LAS RUTAS
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require("cors");
const path = require("path");
const compression = require('compression');
const swaggerUI  = require('swagger-ui-express');
const swaggerJsDoc  = require('swagger-jsdoc');


require('dotenv').config();

const app = express();

app.use(helmet({contentSecurityPolicy: false,}));
app.use(compression());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Gatos',
            version: '1.0.0',      
        },
        servers:[{url: "http://localhost:8080/"}],  
    },
        
        apis: [`${path.join(__dirname,"./routes/ruta_gato.js")}`],  
};


app.use(cors({origin: '*'}));

app.use(express.json());
app.use("/",rutas)  //USAMOS LAS RUTAS que estan dentro de ruta_gato

app.use('/public', express.static(path.join(__dirname,"./public"))); 

app.route('/').get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

//CONEXION A LA BASE DE DATOS DE MONGO DB
mongoose.connect(
    'mongodb+srv://myriam:myriam@cluster0.uukvxes.mongodb.net/?retryWrites=true&w=majority',{ 
        useUnifiedTopology: true, 
        useNewUrlParser: true, 
    }, 
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

app.listen(8080, () => {
    console.log('Servidor express escuchando en puerto 8080');
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));