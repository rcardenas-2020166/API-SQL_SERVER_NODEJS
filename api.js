const Categorias = require('./db.categoria');
const Categoria = require('./categoria');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', router);

//Todas las Categorías//
router.route('/categorias').get((req, res) =>{
    Categorias.getCategorias().then(result => {
        res.json(result[0]);
    })
})

//Categoría por ID//
router.route('/categoria/:id').get((req, res) =>{
    Categorias.getCategoria(req.params.id).then(result => {
        res.json(result[0]);
    })
})

//Crear Categoría//
router.route('/categoria/create').post((req, res) =>{
    let categoria = { ...req.body };
    Categorias.insertCategoria(categoria).then(result => {
        res.json(result[0]);
    })
})

//Actualizar Categoría//
router.route('/categoria/update').post((req, res) =>{
    let categoria = { ...req.body };
    Categorias.updateCategoria(categoria).then(result => {
        res.json(result[0]);
    })
})


//Eliminar Categoría//
router.route('/categoria/delete').post((req, res) =>{
    let categoria = { ...req.body };
    Categorias.deleteCategoria(categoria).then(result => {
        res.json(result[0]);
    })
})

const port = process.env.PORT || 8090;
app.listen(port);
console.log(`Proyecto iniciado en el Puerto ${ port }.`)