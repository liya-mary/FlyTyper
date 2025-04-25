const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'flytyper_db',
    username: 'postgres',
    password: '',
    host: 'localhost',
    port: 5432,
    ssl: true,
    clientMinMessages: 'notice',
    logging: false
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./model.js')(sequelize, DataTypes);

module.exports = db;


