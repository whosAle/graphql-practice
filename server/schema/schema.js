const graphql = require('graphql');
const _ = require('lodash');
const Author = require('../models/author')
const Book = require('../models/book');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
 } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      genre: {type: GraphQLString},
      author: {
          type:AuthorType,
          resolve(parent, args){
            return Author.findById(parent.authorId)
          }
      }
  })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
              return Book.find({authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
       // book: {
       //     type: BookType,
       //     args: {id: {type: GraphQLID}},
       //     resolve(parent, args){
       //         return Book.findById(args.id)
       //     }
       // },
       // author:{
       //     type: AuthorType,
       //     args: {id: {type: GraphQLID}},
       //     resolve(parent, args){
       //         return Author.findById(args.id)
       //     }
       // },
       books: {
           type: new GraphQLList(BookType),
           resolve(parent, args){
              return Book.find({})
           }
       },
       authors: {
           type: new GraphQLList(AuthorType),
           resolve(parent, args){
              return Author.find({})
           }
       },
   }
})
