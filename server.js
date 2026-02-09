const express = require('express')
const app = express()
const port = 3000

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use('/static', express.static('static'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// index page
app.get('/', function(req, res) {
  res.render('static/index');
});

// about page
app.get('/about', function(req, res) {
  res.render('static/about');
});

// about page
app.get('/user', function(req, res) {
  res.render('static/about');
});

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