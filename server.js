const express = require('express');
const app = express();
var ejs = require('ejs');
var _ = require('lodash');

//airtable
const airtable = require("airtable");
const base = airtable.base("appH81X67TStprrkF");

//base "Weekly Report"
const news = base("Weekly Report");
const all = news.select({view: "Main View"})

//base "Type"
const type = base("Type");
const all_type = type.select({view: "Grid view"})

// ...
app.set('view engine', 'ejs');

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));
// ...

app.get('/', (req, res) => {
  all.firstPage((error, records)=>{
  var datas = [];
  if(error){
    console.log('Error on airtable data fetch');
  }
  if( records ){
    for (var i = 0; i < records.length; i++) {
      (function (i) {
        if( records[i].fields ) {
          var fAttchmnt = _.first(records[i].fields['Attachment']);

          if( _.has( fAttchmnt, 'url') ) {
            records[i].fields.img = fAttchmnt.url;
          } else{
            records[i].fields.img = 'https://dl.airtable.com/3WxUtpN8SQaLCDckypZW_thumb%20(2).jpeg';
          }

          datas.push(records[i].fields);
        }
      })(i);
    }
  }
  // console.log(records);
  res.render('index', {
      datas: datas
  });
  })
});

app.get('/details', (req, res)  => {
  res.render('details');
});

port = process.env.PORT || 7000;

const server = app.listen(port, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});