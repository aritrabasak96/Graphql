
## Graphql Documentation

> graphql with nodejs

First Describe the schema of graphql

**What Schema Will Describe?**

It Describe the object type, the relationship between those object types.The data on the graph and how we retrive the data from that graph.

```javascript
const graphql = require("graphql")

const {GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql
```

**How To Define a ObjectType**

This is how you create schema

```javascript


const BookType = new GraphQLObjectType({
    name:'Book' // name of the object/collections

    // why fields() is a function

    // Because if we do not wrap it with a function then later on when we have multiple types and one type has a relationship with other type, then that case one type may not know what the other type is?


    fields:() => ({ // what data fields your object/collection contains
       id: {type: GraphQLString}, // graphql is strictly type query language, so you have to define type
       bookname: {type:GraphQLString},
       genre: {type:GraphQLString}
    })
})
```


**What is Root Queries?**

> Root Queries defines how users jump into the graph and grab/get data from it


```javascript

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{   
        book:{  // the exact name, how you query
            type:BookType, // your object type name

            // how the query will look like from the
            // frontend
            /**
             *  book{
             *     name
             *     genre
             *   }
             *
            */
            args:{id:{type:GraphQLString}},
            // this will look like this
            /**  
             *   -> give me the book whose id is 123
             *   book(id:123){
             *      name
             *      genre
             *    }
             *
            */
           // when we receive the query, the resolve func
           // will fire
           resolve(parent,argv){

            // book(id=123){
            //
            // }
            //
            // argv means => {id:123}

           }
        }
    }
})

```

**How To Export The Schema**

```javascript

   // schema.js file
   module.exports = new GraphQLSchema({
       query: RootQuery
   })

   // app.js file
   const schema = require('schema');

   app.use('/graphql',graphqlHTTP({
       schema:schema
   }))

```

**Mutation In Graphql**

Mutations are allows us to change or mutate our data
That means update,create,delete data  

```javascript

 const Mutation = new GraphQLObjectType({

     name:'Mutation',
     fields:{
         // addAuthor mutation
         addAuthor:{
             type:'AuthorType',
             args:{
                 name:{type: new GraphQLNonNull(GraphQLString)}, // name must be a string and it should be not bull
                 age:{type:GraphQLInt}
             },
             resolve(parent,args){

                // Author is the mongoose model
                // when you want to save data in monodb database  
                let author = new Author({
                    name: args.name,
                    age: args.age
                })

                return author.save() // save and return the result
             }
         }
     }
 })


 // schema.js file
   module.exports = new GraphQLSchema({
       query: RootQuery,
       mutation:Mutation
   })


 // query from front end
 mutation{
     addAuthor(name:'aritra',age:24){
         name, // what data you want to return back
         age   // after saving the data
     }
 }

```

**What is Query Variables?**

Add Dynamic Variables to mutation

```javascript

   // query from frontend
   mutation($name:String!,$age:Number!){  // String! => has to be string but not null
      addAuthor(name:$name,age:$age){
          name,
          age
      }
   }

```

Using React and apollo server you can pass data


**Front-end View**

> what is Apollo Server?

Graphql does not understand anything about javascript or Reactjs. So we need to figure out a way so that we can bind Graphql with Reactjs (frontend). Thats why Apollo comes into this picture.
Apollo is a GraphQL client


```bash

  npm install @apollo/client graphql  

```
