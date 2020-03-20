const http = require("http");
const pug = require("pug");

const compiledFunction = pug.compileFile("template.pug");
const port = 3000;

const server = http.createServer((req, res) => {
    const generatedTemplate = compiledFunction({
        name: 'Vincent'
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(generatedTemplate);
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
});