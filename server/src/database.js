const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'flytyper_db',
    username: 'postgres',
    password: '',
    host: 'localhost',
    port: 5432,
    ssl: true,
    clientMinMessages: 'notice', //Ask Liya
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
db.sequelize = sequelize;

module.exports = db;


