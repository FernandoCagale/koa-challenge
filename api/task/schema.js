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
        type: taskType,
        args: {
          id: {
            type: graphql.GraphQLString
          }
        },
        resolve: async (obj, args) => {
          const t = await task.findOne({_id: args.id});
          return t;
        }
      }
    }
  })
});

module.exports = schema;
