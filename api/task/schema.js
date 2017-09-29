const graphql = require('graphql');
const task = require('./model');

let taskType = new graphql.GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    type: { type: graphql.GraphQLString },
    description: { type: graphql.GraphQLString }
  }
});

let schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      task: {
        type: new graphql.GraphQLList(taskType),
        resolve: async () => {
          const t = await task.find({});
          return t;
        }
      }
    }
  })
});

module.exports = schema;
