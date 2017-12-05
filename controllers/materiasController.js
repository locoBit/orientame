var db = require('../db/models');



exports.get = (req, res) => {
    
    console.log(req.params);
    
    db.materia.findAll({
        attributes: ["clave","nombre","periodo","ht","hp","creditos","bloque","nucleo","optabilidad","division"],
        raw: true
    }).then( arrMaterias => {
        return res.json( {"success":true, "msg":true, "materias":req.body} );
    }).catch( error => {
        console.error(`Ha ocurrido un error al tratar de obtener las materias de la base de datos: ${error}`);
        return res.json( {"success":false, "msg":"Error al obneter las materias"} );
    });
};