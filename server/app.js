const express = require('express');
const graphqlHTTP = require("express-graphql"); //this is the ONLY route you need

const app = express(); //need to run an express API

app.use('/graphql', graphqlHTTP({}));

app.listen(4000, () => {
  console.log("now listening on port 4000");
})
