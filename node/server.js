var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var PDFParser = require("pdf2json/PDFParser");
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');
var url = require('url');


var outputCount = 0;



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.listen('8081');

console.log('Server running on port 8081');

exports = module.exports = app;

app.get('/', function(req, res) {

  var dictionary = [];
	var google_url = 'https://www.google.com/search?q=net+neutrality&as_filetype=pdf&num=25'

	request(google_url, function(error, response, html) {

  	if (!error)
  	{
  		var $ = cheerio.load(html);

        var count = 0;
        
        $('.r').filter(function(){
        	var r = $(this);

        	var entry = r["0"]["children"];

      		count++;


        	for (var i = 0; i < entry.length; i++) {
        		var a = entry[i]["attribs"]["href"];
        		console.log(count, a.substring(7,a.length));

            dictionary.push(r.first().text());

        		//performRequestOnGoogleResult(a.substring(7,a.length));
        	}
       })
  	}
    
    res.json({message:dictionary});
  })

})

function performRequestOnGoogleResult(file_url) {
	request(file_url, function(error, response, html) {


		if (!error)
		{
        var file = fs.createWriteStream(outputCount + "file.pdf");
        outputCount++;

/*
    try {
      var request = https.get(url, function(response) {
        response.pipe(file);
        file.close();
      });
    } catch (err) {
      var request = http.get(url, function(response) {
        response.pipe(file);
        file.close();
      });
    }
  */

    var options = {
      host: url.parse(file_url).host,
      port: 80,
      path: url.parse(file_url).pathname
    };

    var file_name = outputCount + "file.pdf";
    var file = fs.createWriteStream(file_name);

    http.get(options, function(res) {
      res.on('data', function(data) {
            file.write(data);
      }).on('end', function() {
          file.end();
          console.log(file_name + ' downloaded');
      });
    }); 

/*
		    var pdfParser = new PDFParser();

		    pdfParser.on("pdfParser_dataError", errData => console.error("error: ", errData.parserError) );
		    pdfParser.on("pdfParser_dataReady", pdfData => {
		        fs.writeFile(outputCount + ".json", JSON.stringify(pdfData));
		        outputCount++;
		    });

		    pdfParser.loadPDF("./fulltext.pdf");
*/
		}

	})

}