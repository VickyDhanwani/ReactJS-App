var express = require('express');
var cors = require('cors');
//var bodyParser = require( 'body-parser');

var app = express();
app.use(cors());

    
var users = [
    {
        username : 'abc',
        password : '#@Dsajf!2'
    }
]

app.get('/:username', (req, res) => {
    
    res.send(req.params.username)
});



var server = app.listen(8081, () => {
    console.log("Listening...");
});