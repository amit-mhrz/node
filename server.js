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

  const names         = records.map(record => record.get("Title"));
  const image         = records.map(record => record.get("Image"));
  const desc          = records.map(record => record.get("Description"));
  const content_type  = records.map(record => record.get("Content Type"));
  const cities        = records.map(record => record.get("City"));
  const focus_area    = records.map(record => record.get("Focus Area"));
  const impact        = records.map(record => record.get("Impact"));
  console.log(image);

    res.render('index', {
    title: 'Homepage',
    namelist: names,
    image: image,
    desclist: desc,
    ctype: content_type,
    cities: cities,
    focus_area: focus_area,
    impact: impact
  });
})


});

port = process.env.PORT || 7000;

const server = app.listen(port, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});