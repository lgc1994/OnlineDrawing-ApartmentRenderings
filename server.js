var http = require("http"),
url = require("url"),
path = require("path"),
fs = require("fs");
var pathname;
 
http.createServer(function(req, res) { 
	pathname=__dirname+url.parse(req.url).pathname;
	if (path.extname(pathname)=="") {
	pathname+="/";
	}
	if (pathname.charAt(pathname.length-1)=="/"){
	pathname+="index.html";
	}
switch(path.extname(pathname)){
case ".html":
res.writeHead(200, {"Content-Type": "text/html"});
break;
case ".js":
res.writeHead(200, {"Content-Type": "text/javascript"});
break;
case ".css":
res.writeHead(200, {"Content-Type": "text/css"});
break;
case ".gif":
res.writeHead(200, {"Content-Type": "image/gif"});
break;
case ".jpg":
res.writeHead(200, {"Content-Type": "image/jpeg"});
break;
case ".png":
res.writeHead(200, {"Content-Type": "image/png"});
break;
default:
res.writeHead(200, {"Content-Type": "application/octet-stream"});
}

fs.readFile(pathname,function (err,data){
res.end(data);
});
}).listen(8080, "127.0.0.1");

console.log("Server running at http://127.0.0.1:8080/");