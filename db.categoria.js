var config = require('./dbconfig');
const sql = require('mssql');

async function getCategorias()
{
    try 
    {
        const pool = await sql.connect(config);
        const categorias = await pool.request()
            .query('SP_LIST_CATEGORIAS');
        return categorias.recordsets;
    } 
    catch (err) 
    {
        console.log(err);
    }
}


async function getCategoria(CAT_ID)
{
    try 
    {
        const pool = await sql.connect(config);
        const categoria = await pool.request()
            .input('input_parameter', sql.Int, CAT_ID)
            .query('SELECT * FROM TM_CATEGORIA WHERE CAT_ID =  @input_parameter');
        return categoria.recordsets;
    } 
    catch (err) 
    {
        console.log(err);
    }
}


async function insertCategoria(categoria)
{
    try 
    {
        const pool = await sql.connect(config);
        const newCategoria = await pool.request()
            .input('cat_id', sql.Int, categoria.cat_id)
            .input('cat_nom', sql.VarChar, categoria.cat_nom)
            .input('cat_obs', sql.VarChar, categoria.cat_obs)
            .execute('SP_INSERT_CATEGORIA');
        return newCategoria.recordsets;
    } 
    catch (err) 
    {
        console.log(err);
    }
}


async function updateCategoria(categoria)
{
    try 
    {
        const pool = await sql.connect(config);
        const updateCategoria = await pool.request()
            .input('cat_id', sql.Int, categoria.cat_id)
            .input('cat_nom', sql.VarChar, categoria.cat_nom)
            .input('cat_obs', sql.VarChar, categoria.cat_obs)
            .execute('SP_UPDATE_CATEGORIA');
        return updateCategoria.recordsets;
    } 
    catch (err) 
    {
        console.log(err);
    }
}


async function deleteCategoria(categoria)
{
    try 
    {
        const pool = await sql.connect(config);
        const deleteCategoria = await pool.request()
            .input('cat_id', sql.Int, categoria.cat_id)
            .execute('SP_DELETE_CATEGORIA');
        return deleteCategoria.recordsets;
    } 
    catch (err) 
    {
        console.log(err);
    }
}

module.exports = 
{
    getCategorias : getCategorias,
    getCategoria : getCategoria,
    insertCategoria : insertCategoria,
    updateCategoria : updateCategoria,
    deleteCategoria : deleteCategoria
} 