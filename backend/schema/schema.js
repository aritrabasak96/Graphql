// -------------- READ THE WHOLE DOCS CAREFULLY -----------



// we define the schema in this file

const graphql = require("graphql");

// destructure an object from graphql
// create a dummy data
let book = [

    {name:"javascript",genre:"javscript book",id:1,authorid:1},
    {name:"python",genre:"python book",id:2,authorid:2},
    {name:"golang",genre:"golang book",id:3,authorid:3}

]


let author = [

    {name:"Angela Yu",age:29,id:1},
    {name:"Youtube",age:24,id:2},
    {name:"freecodecamp",age:12,id:3}

]



const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLInt,GraphQLList} = graphql;
// data types in graphql
/**
 *   GraphQLId
 *   GraphQLString
 *
*/

//
// define ObjectType
const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({

        id:{type:GraphQLInt},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},

        // relationship with AuthorType
        author:{
            // 1 to 1 relationship
            // one Book belongs to one Author
            type: AuthorType,
            // for 1 to many relationship
            // type: new GraphQLList(AuthorType)


            // resole function for author
            resolve(parent,argv){


                // parent is the actual book array
                // parent has the access to the authorid
                let input_data = parent.authorid;

                function findauthor(data){
                    return data.id === input_data
                }
                // author is your array name
                return author.find(findauthor)
            }
        }
    })
});


//
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields:()=>({
        id: {type:GraphQLInt},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});



// define RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{

        // with this root query you can still access
        // author informations because in your schema you create a
        // relationship with author and book.

       // book(id:123){
       //   name
       //   author{
       //     name
       //   }
       // }

        book:{
            type:BookType,
            args:{id:{type:GraphQLInt}},


            // resole function for book
            resolve(parent,argv){

                // here we write all the code to get data from the database

               // find book and return
                let input_data = argv.id;

                function findbook(book){
                    return book.id === input_data
                }
                return book.find(findbook)
            }
        },
        author:{
            type: AuthorType,
            agrs: {id: {type: GraphQLInt}},
            resolve(parent,argv){


              // find the perticular author and return


            }
        },
        // if you want to return all the data
        authors:{

           type: new GraphQLList(AuthorType),
           resolve(parent,argv){

               // return all authors informations
               return author
           }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})
