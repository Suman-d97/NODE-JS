const http = require('http');

const port = 5000;
http.createServer(function(req,res){
    res.write('<h1> Wellcome to my World </h1>');
    res.end();
}).listen(port,function(err){
    if (err) {
        console.log(err);
        
    }else{
        console.log('Server is running successfully on port',port);
        
    }
})




// const http = require('http');


// const port=4000;
// http.createServer(function(req,res){
//     res.write("<h1>welcome to webskitters</h1>");
//     res.end();
// }).listen(port,function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("server is running on port",port);
//     }
// });