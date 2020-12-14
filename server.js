var http = require('http');
var fs = require('fs');
var url = require('url');

function start(route, handle){
    var server = http.createServer();
    server.on('request', doRequest);
    server.listen(8888);
    console.log('Server running!');

    function doRequest(req, res){
        var pathname = url.parse(req.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(handle, pathname);

        var number = Math.floor(Math.random() * 3);
        fs.readFile('./hello.html', 'UTF-8',
        function(err, data){
            var title = ["ページA", "ページB", "ページC"];
            var content = ["これはサンプルページです",
                "もう一つのコンテンツ",
                "最後のコンテンツ"];
            var data2 = data.
                replace(/@title@/g, title[number]).
                replace(/@content@/g, content[number]);
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(data2);
            res.end();
        });
    }
}

exports.start = start;