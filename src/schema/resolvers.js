const conversations = [
    {
        id: 1,
        flow: [],
        ip: '128.0.0.1'
    },
    {
        id: 2,
        flow: [],
        ip: '128.0.0.1'
    },
    {
        id: 3,
        flow: [],
        ip: '128.0.0.1'
    }
];

module.exports = {
    Query: {
        allConversations: () => conversations
    },
    Mutation: {
        createConversation: (_, data) => {
            const newConversation = Object.assign({id: conversations.length + 1}, data);
            conversations.push(newConversation);
            console.log(data.flow);
            return newConversation;
        }
    }
};
