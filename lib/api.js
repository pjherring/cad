const express = require('express');

const bodyParser = require('body-parser');

const {graphqlExpress, graphiqlExpress} = require('apollo-server-express');

const schema = require('./schema');

const db = require('./db');

const startApp = async () => {
    let app = express();

    app.use(
        '/graphql',
        bodyParser.json(),
        graphqlExpress({schema})
    );

    const PORT = 3000;

    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql'
    }));

    app.listen(PORT, () => {
        console.log(`Running on ${PORT}.`);
    });
}

const start = async () => {
    await db.connect();
    startApp();
}
