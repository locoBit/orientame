'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('materia', {
      clave: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      periodo: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ht: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      hp: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      creditos: {
        allowNull: false,
        type: Sequelize.DECIMAL
      },
      bloque: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nucleo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      optabilidad: {
        allowNull: false,
        type: Sequelize.STRING
      },
      division: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
        updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('materia');
  }
};