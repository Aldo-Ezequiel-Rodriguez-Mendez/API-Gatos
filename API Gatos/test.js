let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url= 'http://localhost:8080';

//GET todos los gatos
describe('Obtiene gatos: ',()=>{ 
    it('Deberia obtener todos los gatos', (done) => {
        chai.request(url) 
            .get('/gato')
            .send()
            .end( function(err,res){
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });
}); 

//GET solo 1 gato
describe('Obtiene un solo gato: ',()=>{ 
    it('Deberia obtener solo un gato mediante su ID', (done) => {
        chai.request(url) 
            .get('/gato')
            .send({id:"6"})
            .end( function(err,res){
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });
}); 

//POST insertar un videojuego
describe('Inserta un gato: ',()=>{ 
    it('Deberia de insertar un nuevo gato', (done) => {
        chai.request(url) 
            .post('/gato')
            .send({id:"6", nombre:"Mochi", color:"color mochi"})
            .end( function(err,res){
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });
}); 

//POST actualizar comentarios en un gato
describe('Actualizar comentarios de un gato: ',()=>{ 
    it('Deberia de actualizar los comentarios de un gato', (done) => {
        chai.request(url) 
            .post('/gato')
            .send({id:"6", comentarios:"Nuevo comentario al gato"})
            .end( function(err,res){
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });
}); 

//DELETE eliminar un solo gato
describe('Eliminar un solo videojuego: ',()=>{ 
    it('Deberia de eliminar solo un gato mediante su ID', (done) => {
        chai.request(url) 
            .post('/gato')
            .send({id:"6"})
            .end( function(err,res){
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });
}); 