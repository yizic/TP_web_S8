const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')
const pug = require("pug");
var file = process.argv[2];

const port = 3000;

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

if(!file){
    console.error('file name missing');
    process.exit(1)
}

app.get('/', (req, res) => res.send('Hello World'));

app.get('/data', function (req, res) {

    fs.readFile(file,'utf8', (err,data) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        var results = data.toString().split(/\r\n|\n/)
        var tab = [];
        for (let result of results) {
            user = result.split(';');
            tab.push(`${user[0]}`);
            tab.push(`${user[1]}`)
        }
        console.log(tab[1])
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