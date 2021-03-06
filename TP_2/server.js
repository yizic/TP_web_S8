const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')
const pug = require("pug");


var file = process.argv[2];

const port = 3000;

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('Hello World'));

app.get('/cities', function (req, res) {
    fs.readFile(path.join(__dirname, './cities.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        var results = JSON.parse(data);

        console.log(results['cities'])
        
        res.statusCode = 200
        res.setHeader('Content-Type','text/html')
        res.render('template2.pug', { tab: results['cities'], name: 'vincent', message: 'Hello there!'})
    
    })
});

app.post('/cities', function (req, res) {

    fs.stat(__dirname, './cities.json', function(err) {
        if (!err) {
            console.log('file or directory exists');
        }
        else if (err.code === 'ENOENT') {
            console.log('file or directory does not exist, it must be created');
        }
    });
})

app.get('/data', function (req, res) {

    if(!file){
        console.error('file name missing');
        process.exit(1)
    }

    fs.readFile(file,'utf8', (err,data) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        var results = data.toString().split(/\r\n|\n/)
        var tab = [];
        for (let result of results) {
            user = result.split(';');
            tab.push(`${user[0]} : ${user[1]}`);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html')
        res.render('template.pug', { tab: tab, name: 'vincent', message: 'Hello there!'})
    })
});

app.listen(port, () => console.log(`exemple app listening on port ${port}!`));

/*
-----------------------------------------------

const http = require('http');
const pug = require("pug");
const fs = require('fs')
var file = process.argv[2];
var content;

if(!file){
    console.error('file name missing');
    process.exit(1)
}

const compiledFunction = pug.compileFile('./template.pug')
const port = 3000;

const server = http.createServer((req, res) => {
        const generatedTemplate = compiledFunction({
            name: 'vincent'
        });

        fs.readFile(file,'utf8', (err,data) => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
            var results = data.toString().split(/\r\n|\n/)
            var tab = '<table>';
            for (let result of results) {
                user = result.split(';');
                tab += `<tr><td>${user[0]}</td><td>${user[1]}</td></tr>`
            }
            tab += '<style type="text/css">td { border-bottom: 1px solid #ddd; }</style>'
            tab += '</table>';

            
        res.statusCode = 200;
        res.setHeader('Content-Type','text/html')
        res.end(generatedTemplate + tab)
        })
    }
)

server.listen(port, () => {
    console.log('Server running at port' + port)
})
*/