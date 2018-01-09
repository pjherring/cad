const {makeExecutableSchema} = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type Conversation {
        id: ID!
        flow: [Statement]!
        ip: String!
    }
    
    interface Statement {
        id: ID!
        content: String!
    }

    type Prompt implements Statement {
        id: ID!
        content: String!
        alt_content_hard: String
        alt_content_easy: String
        responses: [Response]!
    }

    type Response implements Statement {
        id: ID!
        preview: String!
        content: String!
        nextPrompt: Prompt
        isEnd: Boolean!
    }

    type Query {
        allConversations: [Conversation!]!
    }

    type Mutation {
        createConversation(flow: [ID]!, ip: String!): Conversation
    }
`;

module.exports = makeExecutableSchema({typeDefs, resolvers});
