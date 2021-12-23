const express = require("express")
const app = express()
app.use(express.json()); 
const https = require("https")
const port = process.env.PORT || 3000
const bodyParser = require("body-parser");
const { json } = require("express/lib/response");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));



app.get("/", function(req, res){
    res.render("index");
});

app.post("/result", function(req, res){
    
    const she = req.body.heName
    const he = req.body.hiName
    const request = require('request');
    const options = {
    method: 'GET',
    url: 'https://love-calculator.p.rapidapi.com/getPercentage',
    qs: {sname: she, fname: he},
    headers: {
        'x-rapidapi-host': 'love-calculator.p.rapidapi.com',
        'x-rapidapi-key': '9889318a48msh784d907daf98745p130267jsn02d42e913214',
        useQueryString: true
    }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        const data = JSON.parse(body)
        const lovePercentage = data.percentage + "%"
        const loveDescription = data.result
        res.render("result", {desc: loveDescription, perc: lovePercentage});
        
    });
});

// app.get("/result", function(req, res){
//     res.render("result")
//     console.log(req.body.heName);
// }); 


app.listen(port, function(req, res){
    console.log("This is working on PORT @ 3000");
})

