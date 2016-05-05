var express = require('express');
var path = require('path')
var fs = require('fs');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200'
  //log: 'trace'
});

var app = module.exports = express();
app.use(require('prerender-node').set('prerenderToken', 'u1qUx4lJfTyXfD5vp4t5')); 
app.use(express.static(path.join(__dirname, 'public'))); 

var usersFilePath = path.join(__dirname, 'data.json');
// This will ensure that all routing is handed over to AngularJS 
app.get('/', function(req, res){ 
  res.sendFile('index.html', { root: path.join(__dirname, 'public') }); 
});

app.get('/api/getmeds',function(req,res){	
	//var readable = fs.createReadStream(usersFilePath);
	//readable.pipe(res)	
	client.search({
		  index: 'cp',
		  type:'sections',
          size:1000
		  //q: '*'
		}, function (error, response) {
			var hits = response.hits.hits;
			var hitsRes = [];
			console.log(hits.length);
			for( var index=0;index<=hits.length-1;index++)
			{
				var hit = hits[index];
				hitsRes.push(hit._source);
			}
			res.send(JSON.stringify(hitsRes));
		});
});

//app.listen(8081); 
app.listen(process.env.PORT || 8081)
console.log('App is running on port : 8081')