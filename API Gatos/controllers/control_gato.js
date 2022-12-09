const Gato = require('../models/model_gato');   //importamos el modelo gato

//GET '/gato'
const obtenerTodosGatos = (req, res, next) => {
    Gato.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

//POST '/gato'
const nuevoGato = (req, res, next) => {
     //verifica si un gato con un ID YA EXISTE en la BD
    Gato.findOne({ id: req.body.id }, (err, data) => {

        //if el videojuego no existe en la BD, agregalo...
        if (!data) {
            //creamos un nuevo objeto gato con ayuda del modelo Gato y con req.body
            const nuevoGato = new Gato({
                id: req.body.id,
                nombre: req.body.nombre,
                color: req.body.color
            })

            // guardamos este objeto en la base de datos
            nuevoGato.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        //si hay un error o el gato ya esta en la BD, regresa este mensaje...        
        }else{
            if(err) return res.json(`Algo salió mal :(... por favor intentalo de nuevo.${err}`);
            return res.json({message:"El gato ya existe!"});
        }
    })   
};

//GET '/gato/:id'
const obtenerUnGato = (req, res, next) => {
    let id = req.params.id; //obten el id del gato

    //encuentra un gato especifico con ese id
    Gato.findOne({id:id}, (err, data) => {
    if(err || !data) {
        return res.json({message: "El gato no existe!"});
    }
    else return res.json(data); //regresa el gato encontrado
    });
};

//POST '/gato/:id'
const nuevoComentario= (req, res, next) => {
    let id = req.params.id; 
    let nuevoComentario = req.body.comentario; 

    const comentario = {
        comentario: nuevoComentario
    }

    Gato.findOne({id:id}, (err, data) => {
        if(err || !data || !nuevoComentario ) {
            return res.json({message: "El gato no existe!"});
        }
        else {
            data.comentarios.push(comentario);
            //guarda los cambios en la BD
            data.save(err => {
                if (err) { 
                    return res.json({message: "La actualización de los comentarios ha fallado :(", error:err});
                }
            return res.json(data);
            })  
        } 
    })
};

//DELETE '/gato/:id'
const borrarUnGato = (req, res, next) => {
    let id = req.params.id; // get the name of tea to delete

    Gato.deleteOne({id:id}, (err, data) => {
    //if there's nothing to delete return a message
    if( data.deletedCount == 0) return res.json({message: "El gato no existe!"});
    //else if there's an error, return the err message
    else if (err) return res.json(`Algo ha sucedido, intentalo de nuevo. ${err}`);
    //else, return the success message
    else return res.json({message: "Gato eliminado."});
    });
};


module.exports = {
    nuevoGato,
    obtenerTodosGatos,
    obtenerUnGato,
    nuevoComentario,
    borrarUnGato
};