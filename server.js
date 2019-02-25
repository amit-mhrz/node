const express = require('express');
const app = express();
var ejs = require('ejs');

//airtable
const airtable = require("airtable");
const base = airtable.base("appwCVWnPVFH8JbFq");
const news = base("Weekly Report");
const all = news.select({view: "Main View"})

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

  const name          = records.map(record => record.get("Title/Topic"));
  const type          = records.map(record => record.get("Type"));
  const date          = records.map(record => record.get("Date"));
  const clipping      = records.map(record => record.get("Clipping"));
  const publication   = records.map(record => record.get("Publication"));
  const link_1        = records.map(record => record.get("Link 1"));
  const author        = records.map(record => record.get("Author"));
  const image         = records.map(record => record.get("Attachment"));
  // console.log(image);

    res.render('index', {
    title: 'Homepage',
    title: name,
    type: type,
    date: date,
    clipping: clipping,
    publication: publication,
    link_1: link_1,
    author: author,
    image: image
  });
})


});

port = process.env.PORT || 7000;

const server = app.listen(port, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});