const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const users = require('./db/users');
const app = express();
const request = require('request');
const fetch = require('node-fetch');

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.json({
        message: 'Hello!'
    });
});



/*app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.create(req.body).then((message) => {
        res.json(message);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
});*/

app.post('/createUser', (req, res) => {
    users.createUser(req.body).then((is_saved) => {
        console.log(is_saved);
        if(is_saved == true)
        { res.json({
            message: 'Created User'
          });
        }
        else
        {  res.json({
            message: 'User with this login exist'
          });
        }
    }).catch((error) => {
      console.error(error);
        res.status(500);
        res.json(error);
    });
});


app.post('/addStation', (req, res) => {
    users.addStation(req.body.login, req.body.password, req.body.id).then((added) => {
        console.log(added);
        if(added == true)
        { res.json({
            message: 'Station added'
          });
        }
        else
        {  res.json({
            message: 'Station not added'
          });
        }
    }).catch((error) => {
      console.error(error);
        res.status(500);
        res.json(error);
    });
});

app.post('/delStation', (req, res) => {
    users.delStation(req.body.login, req.body.password, req.body.id).then((deleted) => {
        console.log(deleted);
        if(deleted == true)
        { res.json({
            message: 'Station deleted'
          });
        }
        else
        {  res.json({
            message: 'Station not deleted'
          });
        }
    }).catch((error) => {
      console.error(error);
        res.status(500);
        res.json(error);
    });
});

app.post('/stations', (req, res) => {
    console.log(req.body);
    users.allStations(req.body.login, req.body.password).then((stations) => {
    res.json({message: stations});
    }).catch((error) => {
      console.error(error);
        res.status(500);
        res.json(error);
    });
});

app.post('/login', (req, res) => {
    users.login(req.body.login, req.body.password).then((logged) => {
    res.json({message: logged});
    }).catch((error) => {
      console.error(error);
        res.status(500);
        res.json(error);
    });
});


/*
login
getWszystkiePrzystanki
get przystankiUzytkownika
dodajPrzystanek
usunPrzystanek




*/

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});



/*
var request = require("request");
*/
