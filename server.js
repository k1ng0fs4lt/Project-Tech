require('dotenv').config() 
const express = require('express')
const app = express()
const port = 3000;





const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
// Construct URL used to connect to database from info in the .env file
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?appName=${process.env.DB_NAME}?retryWrites=true&w=majority`;
// Create a MongoClient
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
})

// Try to open a database connection
client.connect()
  .then(() => {
    console.log('Database connection established')
  })
  .catch((err) => {
    console.log(`Database connection error - ${err}`)
    console.log(`For uri - ${uri}`)
  })


    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION);

async function listAllUsers(req, res){
  data = await collection.find().toArray()
  res.send(data);
  
}

app.get(`/gebruikers`, listAllUsers)

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




// add page
app.get(`/registreren`, function(req, res) {
  res.render(`registreren`);
})

// ---- Route ----
app.post("/geregistreerd", addUser);
 
async function addUser(req, res) {
  try {
    const gebruikersnaam = (req.body.gebruikersnaam || "").trim();
    const wachtwoord = req.body.wachtwoord || "";
 
    if (!gebruikersnaam || !wachtwoord) {
      return res.status(400).send("Voer allebei de velden in");
    }
 
    const usersCollection = db.collection(process.env.USERS_COLLECTION || "users");
 
    const bestaatAl = await usersCollection.findOne({ gebruikersnaam });
    if (bestaatAl) {
      return res.status(409).send("Deze gebruikersnaam bestaat al");
    }
 
    await usersCollection.insertOne({ gebruikersnaam, wachtwoord, createdAt: new Date() });
 
    return res.status(201).send(`U bent geregistreerd met gebruikersnaam: ${gebruikersnaam}`);
  } catch (err) {
    console.error("Registratie fout:", err);
    return res.status(500).send("Er ging iets mis bij het registreren");
  }
}

// about page
app.get('/inloggen', function(req, res) {
  res.render('inloggen');
});

app.post('/ingelogd', async function(req, res) {
  try {
    const db = client.db(process.env.DB_NAME);
    const usersCollection = db.collection(process.env.USERS_COLLECTION || "users");

    const gebruikersnaam = req.body.gebruikersnaam
    const wachtwoord = req.body.wachtwoord
    // 1. Zoek gebruiker op gebruikersnaam
    const gebruiker = await usersCollection.findOne({ gebruikersnaam: gebruikersnaam });


    if (!gebruiker) {
      return res.render('inloggen', { err: 'Gebruiker bestaat niet' });
    }

    // 2. Controleer wachtwoord
    if (gebruiker.wachtwoord !== wachtwoord) {
      return res.render('inloggen', { err: 'Wachtwoord klopt niet' });
    }

    // 3. Alles klopt
    res.render('ingelogd', { gebruiker: gebruiker.gebruikersnaam });

  } catch (err) {
    console.error(err);
    res.status(500).send("Er is iets fout gegaan");
  }
});


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

