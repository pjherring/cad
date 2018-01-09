const config = require('config');
const mysql = require('mysql');
const finder = require('./finder');

const db_config = config.get('db');

let instance = null;

const connect = async () => {
    console.log(`Connecting to ${db_config.name}@${db_config.host}:${db_config.port}`);

    instance = mysql.createPool({
        database: db_config.name,
        host: db_config.host,
        port: db_config.port,
        user: db_config.user,
        password: db_config.password
    });
}

const getConnection = () => { 
    if (!instance) {
        throw "Please connect to the database before getting a connection.";
    }

    return instance;
}

module.exports = {
    connect: connect,
    getConnection: getConnection
};
