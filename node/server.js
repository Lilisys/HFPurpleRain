var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var PDFParser = require("pdf2json/PDFParser");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var outputCount = 0;


app.get('/scrape', function(req, res){

  //All the web scraping magic will happen here
  searchGoogle();


})

console.log('Server running on port 8081');

exports = module.exports = app;


app.get('/', function(req, res) {
  res.json({message:'Hello World'});
})


//app.use('/api', router);
app.listen('8081');

function searchGoogle() {
	var url = 'https://www.google.com/search?q=net+neutrality&as_filetype=pdf&num=25'
	request(url, function(error, response, html) {

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
        		performRequestOnGoogleResult(a.substring(7,a.length));
        	}
        })
  	}

  })
}

function performRequestOnGoogleResult(url) {
	request(url, function(error, response, html) {


		if (!error)
		{

		    var pdfParser = new PDFParser();

		    pdfParser.on("pdfParser_dataError", errData => console.error("error: ", errData.parserError) );
		    pdfParser.on("pdfParser_dataReady", pdfData => {
		    	//console.log(getRawTextContent());
		        fs.writeFile(outputCount + ".json", JSON.stringify(pdfData));
		        outputCount++;
		    });

		    pdfParser.loadPDF("./fulltext.pdf");
		}

	})

}