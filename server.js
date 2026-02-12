const express = require('express')
const app = express()
const port = 3000

const credentials = require(`./credentials.json`)
const users = credentials.users;


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
  res.render('inloggen');
});

app.post('/ingelogd', function(req, res) {

  const gebruikersnaam = req.body.gebruikersnaam;
  const wachtwoord = req.body.wachtwoord;

  const gebruiker = users.find(user => 
    user.gebruikersnaam === gebruikersnaam &&
    user.wachtwoord === wachtwoord
  );

  if (gebruiker) {
    res.send(`U bent ingelogd als: ${gebruiker.gebruikersnaam}`);
  } else {
    res.send("U bent niet ingelogd");
  }

});

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

