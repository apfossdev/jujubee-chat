const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require(`body-parser`);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let users = [];
let id = 1;

function signup(req,res){
  let userObject = {};


  userObject.username = req.headers.username;

  for(let i = 0; i < users.length; i++){
    if(userObject.username == users[i].username){
      return res.send(`User already exists`);
    }
  }

  userObject.password = req.headers.password;
  userObject.id = id;
  users.push(userObject);
  res.send(`User ${id} has been created successfully`);
  id++;
  // console.log(users);
}

function login(req,res){
  let userObject = req.body;
  userObject.username = userObject.username;
  userObject.password = userObject.password;

  for(let i = 0; i < users.length; i++){
    if(userObject.username == users[i].username){
      if(userObject.password == users[i].password){
        res.send(`User has been logged in successfully`);
      }
      else{
        res.send(`Incorrect Password entered`);
      }
    }
    else{
      res.send(`User doesn't exist`);
    }
  }
}


app.post("/signup", signup);
app.post("/login",login);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






