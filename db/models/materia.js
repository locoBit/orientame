'use strict';
module.exports = (sequelize, DataTypes) => {
  var materia = sequelize.define('materia', {
    clave: DataTypes.STRING,
    nombre: DataTypes.STRING,
    periodo: DataTypes.INTEGER,
    ht: DataTypes.DECIMAL,
    hp: DataTypes.DECIMAL,
    creditos: DataTypes.DECIMAL,
    bloque: DataTypes.INTEGER,
    nucleo: DataTypes.STRING,
    optabilidad: DataTypes.STRING,
    division: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return materia;
};