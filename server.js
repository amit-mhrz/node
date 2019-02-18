const express = require('express');
const app = express();
var ejs = require('ejs');

//airtable
const airtable = require("airtable");
const base = airtable.base("applhVSojCvSFtpSz");
const news = base("News");
const all = news.select({view: "All view"})

// ...
app.set('view engine', 'ejs');

// serve static files from the `public` folder
app.use(express.static(__dirname + '/public'));
// ...

app.get('/', (req, res) => {

  all.firstPage((error, records)=>{

  if(error){
    console.log('error');
  }

  const names = records.map(record => record.get("Title"));
  const desc = records.map(record => record.get("Description"));

    res.render('index', {
    title: 'Homepage',
    namelist: names,
    desclist: desc
  });
})


});

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});