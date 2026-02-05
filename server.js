const express = require('express')
const app = express()
const port = 3000


app.use('/static', express.static('static'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
  res.send('Dit is niet fantastisch!!!!')
})

app.get('/login', (req, res) => {
  res.send('Dit is de login pagina')
})

app.get('/user', (req, res) => {
  res.send('Dit is de user pagina')
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