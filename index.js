const http = require('http');
const url = require('url');
const fs = require('fs');

const the404 = fs.readFile('404.html', function(err, data) {
    if(err){
        throw err;
    }else{
        return data;
    }
});

http.createServer(function(req, res) {

    const q = url.parse(req.url, true);
    let filename;
    if(q.pathname === "/"){
        filename = "." + "/index.html"
    }else{
        filename = "." + q.pathname;
    }

    fs.readFile(filename, function(err, data) {
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end(the404);
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });

}).listen(8080);

//http://localhost:8080/about.html
//http://localhost:8080/contact-me.html
