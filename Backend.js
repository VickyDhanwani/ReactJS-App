var express = require('express');
var cors = require('cors');
var bodyParser = require( 'body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.json());
    
var users = [
    {
        username : "abc",
        password : "xyz"
    }
]

app.get('/api/userData', (req, res) => {
   //console.log(req);
    res.end(JSON.stringify(users));
    
});
app.get('/api/postsData', (req, res) => {
    //console.log(req);
     res.end(JSON.stringify(currentPosts));
     
 });
AuthUser = (u, p) => {
    let ispresent = false;
    let i = 0;
    let n = users.length;
    
    for(i = 0; i < n; i++) {
        if(users[i].username === u && users[i].password === p) {
            ispresent = true;
            break;
        }
    }
    return ispresent;
}


app.post('/v1/OAuth2', (req, res) => {
    let authData = req.body;
    let present = AuthUser(authData.username, authData.password);
    console.log(req.body);
    res.end(JSON.stringify({
        "isAuthenticated" : present
    }));
});

checkuser = (u) => {
    let i = 0;
    let n = users.length;
    let  found = false;
    while(i < n) {
        if(users[i].username === u.username) {
            found = true;
            break;
        }
        i++;
    }
    return found;
}

app.post('/v1/_api/addUser', (req, res) => {
    
    let usr = req.body;
    //users.push(usr);
    let found = checkuser(usr);
    let messgae;
    if(found === true) {
        messgae = "Can't add user, Username already exists";
    }
    else {
        message = "User added successfully";
    }
    console.log(found);
    if(found === false) {
        users.push(usr);
        console.log(users);
    }
    res.end(JSON.stringify(
        {
            useradded : !found,
            responseMessage : messgae
        }
    ));
    
    
    
    
});



var server = app.listen(8081, () => {
    console.log("Listening...");
});