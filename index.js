/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling. 
 * They're for information purposes only.
 * 
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course. 
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session')
const path = require('path');
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

const app = express();

// Route setup. You can implement more in the future!
const ta01Routes = require('./routes/ta01');
const ta02Routes = require('./routes/ta02');
const ta03Routes = require('./routes/ta03');
const ta04Routes = require('./routes/ta04');
const prove01Route = require('./routes/prove/prove01');
const prove02Route = require('./routes/prove/prove02');
const prove08Route = require('./routes/prove/prove08');
const prove09Route = require('./routes/prove/prove09');
const prove10Route = require('./routes/prove/prove10');
const prove11Route = require('./routes/prove/prove11');
const prove12Route = require('./routes/prove/prove12');


app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // For view engine as Pug
  //.set('view engine', 'pug') // For view engine as PUG. 
  // For view engine as hbs (Handlebars)
  //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
  //.set('view engine', 'hbs')
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json()) // For parsing the body of a POST
  .use(
    session({
      // Simple and not very secure session
      secret: 'random_text',
      cookie: {
        httpOnly: false // Permit access to client session
      }
    })
  )
  .use('/ta01', ta01Routes)
  .use('/ta02', ta02Routes)
  .use('/ta03', ta03Routes)
  .use('/ta04', ta04Routes)
  .use('/prove01', prove01Route)
  .use('/prove02', prove02Route)
  .use('/prove08', prove08Route)
  .use('/prove09', prove09Route)
  .use('/prove10', prove10Route)
  .use('/prove11', prove11Route)
  .use('/prove12', prove12Route)
  
  .get('/', (req, res, next) => {
    // This is the primary index, always handled last. 
    res.render('pages/index', { title: 'Welcome to my CSE341 repo', path: '/' });
  })
  .use((req, res, next) => {
    // 404 page
    res.render('pages/404', { title: '404 - Page Not Found', path: req.url })
  });

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require('socket.io')(server);

io.on('connection', socket => {

  socket.on('disconnect', () => {
    console.log('CLient disconnected');
  });

  socket.on('add', name => {
    socket.broadcast.emit('refresh')
  })

  socket.on('delete', name => {
    socket.broadcast.emit('refresh')
  })

  socket.on('newUser', data => {
    // A new user logs in.
    const message = data.message;
    const newData = {
      message: message,
      type: "message",
      color: data.color
    }
    console.log('user logged')
    socket.broadcast.emit('newMessage', newData) // <-----TODO-----
  })
  socket.on('message', data => {
    // Receive a new message
    data.type = 'message';
    socket.broadcast.emit('newMessage', data);
  })
})