var db = require('../db/models');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.get = (req, res) => {
    
    let att = req.params.att;
    let val = req.params.val;
    
    db.materia.findAll({
        attributes: ["clave","nombre","periodo","ht","hp","creditos","bloque","nucleo","optabilidad","division"],
       /* where: { [att]: {
            [Op.in]: [val, 'TC']
        }},*/
        order: ["periodo", "nombre"],
        raw: true
    }).then( arrMaterias => {
        return res.json( {"success":true, "msg":true, "materias":arrMaterias} );
    }).catch( error => {
        console.error(`Ha ocurrido un error al tratar de obtener las materias de la base de datos: ${error}`);
        return res.json( {"success":false, "msg":"Error al obneter las materias"} );
    });
};