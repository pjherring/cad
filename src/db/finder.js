const { getConnection } = require('./bootstrap');
const config = require('config');
const mysql = require('mysql');

const generatePlaceholders = (cnt, str) => {
    return new Array(cnt).fill(str).join(',');
}
const generateDoublePlaceholder = (cnt) => generatePlaceholders(cnt, '??');
const generateSinglePlaceholder = (cnt) => generatePlaceholders(cnt, '?');

const queryCallback = (resolve, reject) => (err, results, fields) => {
    if (err) {
        return reject(err);
    }

    console.log('results ' + results);
    return resolve([results, fields]);
}

const getFinder = table => ({
    table,
    insert: (cols, vals) => {
        const sql = `INSERT INTO ${table}
                    (${generateDoublePlaceholder(cols.length)})
                    VALUES 
                    (${generateSinglePlaceholder(vals.length)})`;

        return new Promise((resolve, reject) => {
            getConnection().query(
                sql,
                [...cols, ...vals],
                queryCallback(resolve, reject)
            );
        });
    }
})

const truncate = (...tables) => {
    if (config.util.getEnv('NODE_ENV') !== 'testing') {
        throw `Can't truncate ${table} in a non testing environment`;
    }

    let truncate_sql = tables.map((table) => {
        return `TRUNCATE ${table};`;
    }).join(' ');

    getConnection().query(truncate_sql, (err) => {
            if (err) throw err;
    });
}


module.exports = {
    get: getFinder,
    truncate: truncate
};
