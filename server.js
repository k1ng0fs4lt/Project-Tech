const express = require('express')
const app = express()
const port = 3000

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/static', express.static('static'));
app.use(express.urlencoded({extended: true}))

// index page
app.get('/', function(req, res) {
  res.render('index');
});

// about page
app.get('/about', function(req, res) {
  res.render('about');
});

// add page
app.get(`/add`, function(req, res) {
  res.render(`add`);
})

// add page
app.get(`/detail`, function(req, res) {
  res.render(`detail`);
})



// about page
app.get('/inloggen', function(req, res) {
  const inlogGegevens = {gebruikersnaam: "kevin", wachtwoord: "1234"}
  res.render('inloggen');
});

app.post(`/ingelogd`, function(req, res){
  if(req.body.gebruikersnaam == "kevin" || req.body.wachtwoord == "1234"){
    res.send(`U bent ingelogd`)
  } else {
    res.send(`U bent niet ingelogd`)
  }
})

// add page
app.get(`/registreren`, function(req, res) {
  res.render(`registreren`);
})

app.post('/geregistreerd', addUser)

function addUser(req, res) {
  res.send(`U bent geregistreerd met:
    gebruikersnaam: ${req.body.gebruikersnaam},
    wachtwoord: ${req.body.wachtwoord}`)
}


app.get(`/ifelse`, function(req, res){
  res.render(`ifelse`, {
    age: 11
  });
})

app.get(`/loop`, function(req, res){
  res.render(`loop`);
})













app.get('/user/:id', (req, res) => {
  const userId = req.params.id; 
  res.send(`User ID is: ${userId}`);
})

app.get('/about', (req, res) => {
  res.send('Dit is de about pagina!')
})

app.get('/register', (req, res) => {
  res.send('Dit is de registreer pagina!')
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use((req, res, next) => {
  res.status(404).send("404 Not Found – the page does not exist");
});

