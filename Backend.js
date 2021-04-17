var express = require('express');
var cors = require('cors');
var bodyParser = require( 'body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.json());
    
var users = [
    
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
    let ispresent = "NO";
    let i = 0;
    let n = users.length;
    for(i = 0; i < n; i++) {
        if(users[i].username === u && users[i].password === p) {
            ispresent = "YES";
            break;
        }
    }
    return ispresent;
}


app.post('/v1/OAuth2', (req, res) => {
    let authData = req.body;
    //let present = AuthUser(authData.username, authData.password);
    console.log(req.body);
    res.end(JSON.stringify({
        "ispresent" : "yes"
    }));
});

checkuser = (u) => {
    let i = 0;
    let n = users.length;
    let  found = "NO";
    while(i < n) {
        if(users[i].username === u.username || users[i].email === u.email) {
            found = "YES";
            break;
        }
        
        i++;
    }
    return found;
}

app.post('/api/addUser', (req, res) => {
    
    let usr = req.body;
    //users.push(usr);
    let found = checkuser(usr);
    console.log(found);
    if(found == "NO") {
        users.push(usr);
        console.log(users);

    }
    res.end(JSON.stringify(
        {
            userExist : found
        }
    ));
    
    
    
    
});



var server = app.listen(8081, () => {
    console.log("Listening...");
});