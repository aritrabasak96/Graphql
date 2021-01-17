const express =  require("express")
const { graphqlHTTP } = require("express-graphql") // express-graphql helps express to understand graphql and creates a express server that can run graphql api
const schema = require('./schema/schema.js');


const app = express()


// now express can not handle any graphql query, but when we send a request to localhost:3000/graphql/......  then graphqlHTTP function will trigger and the rest of that can handle by this
app.use("/graphql",graphqlHTTP({
    
   // define a schema, how the data on our graph will look
   schema:schema,
   graphiql:true // to test graphql from the browser 
}))


app.listen("3000",()=>{
  
   console.log("graphql express server start")
})
