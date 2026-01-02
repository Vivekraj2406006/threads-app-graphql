import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

async function init(){
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
// create a Graphql server
const gqlserver = new ApolloServer({
  typeDefs:`
  type Query {
  hello : String
  say(name:String):String
  }

  `,
  resolvers:{
    Query:{
      hello:()=>`Hey There I am a graphql server`,
      say:(_,{name}:{name:String})=>`Hello ${name}, Welcome to Graphql Server`
    }
  }
});


// start the gqlserver
await gqlserver.start();

app.use('/graphql',expressMiddleware(gqlserver));

app.get('/',(req,res)=>{
  return res.end('This is Home')
})

app.listen(PORT,()=>{console.log(`app is listening on PORT http://localhost:${PORT}`)})

}
init() ;
