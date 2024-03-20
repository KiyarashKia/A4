/********************************************************************************
*  WEB322 – Assignment 04
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Kiarash Kia Student ID: 108688235 Date: 03/20/2024

*  Published URL: https://determined-rose-skunk.cyclic.app/
********************************************************************************/

// https://t.ly/s8wxY

const { log } = require("console");
const legoData = require("./modules/legoSets");

legoData.initialize();

const express = require('express');
const path = require('path');
const app = express();
const HTTP_PORT = process.env.PORT || 4050;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, '/views/home.html'));
  res.render('home');
  });

  app.get('/about', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/about.html'));
    res.render('about');
  });

app.get('/lego/sets', (req, res) => {
    console.log(req.query.theme);
    if (req.query.theme){
      legoData.getSetsByTheme(req.query.theme)
      .then(themeSets => {
        res.send(themeSets);
      })
      .catch(error => {
          console.error(error);
          res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
      });
    }
    else {
      legoData.getAllSets()
      .then(sets => {
          res.send(sets);
      })
      .catch(error => {
          console.error(error);
          res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
      });
    }
  });

app.get('/lego/sets/:set_num', (req, res) => {
    legoData.getSetByNum(req.params.set_num)
    .then(set => {
      res.send(set);
    })
    .catch(error => {
        console.error(error);
        res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
    });
  });

  app.all('*', (req, res) => { 
    res.status(404).sendFile(path.join(__dirname, '/views/404.html')); 
  }); 

  app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));