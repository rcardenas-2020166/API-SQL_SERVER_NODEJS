const Categorias = require('./db.categoria');
const Categoria = require('./categoria');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

//Documentación con Swagger//
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = 
{
    swaggerDefinition :
    {
        info : 
        {
            version : '1.0.1',
            title : 'API REST Categorias.',
            description : 'API REST Categorias',
            contact : 
            {
                name : 'Rodrigo Cárdenas Developer'
            },
            servers : [ 'http://localhost:8090' ]
        }
    },
    apis : [ 'api.js' ]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api', router);

//SWAGGER//

//--LISTAR CATEGORIAS--//
/**
 * @swagger
 * /api/categorias:
 *  get:
 *      description: Use para obtener todas las categorias
 *      responses:
 *          '200':
 *              description: Listados Correctamente
 */

//--BUSCAR CATEGORIA x ID--//
/**
 * @swagger
 * /api/categoria/{id}:
 *  get:
 *    description: Obtener categoria por ID
 *    parameters:
 *      - in: path
 *        name: id
 *    responses:
 *        '200':
 *          description: Categoria obtenida correctamente
 */


//--CREAR CATEGORIA--//
/**
 * @swagger
 * /api/categoria/create:
 *  post:
 *      description: Crear una nueva categoria
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: "body"
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              example:
 *                 cat_id: ""
 *                 cat_nom: "Categoria 1"
 *                 cat_obs: "Categoria 1"
 *      responses:
 *        '200':
 *          description: Categoria guardada correctamente
 *          content:
 *              application/json:
 *                type: object
 */


//--ACTUALIZAR CATEGORIA--//
/**
 * @swagger
 * /api/categoria/update:
 *  post:
 *      description: Actualizar una categoria
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: "body"
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              example:
 *                cat_id: "1"
 *                cat_nom: "Actualizar Categoria 1"
 *                cat_obs: "Actualizar Categoria 1"
 *      responses:
 *        '200':
 *          description: Categoria actualizada correctamente
 *          content:
 *              application/json:
 *                type: object
 */


//--ELIMINAR CATEGORIA--//
/**
 * @swagger
 * /api/categoria/delete:
 *  post:
 *      description: Eliminar una categoria
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: "body"
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              example:
 *                cat_id: "7"
 *      responses:
 *        '200':
 *          description: Categoria eliminada correctamente
 *          content:
 *              application/json:
 *                type: object
 */

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