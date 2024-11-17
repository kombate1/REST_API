const express = require('express');
const app = express();
const PORT = 5000;
const fs = require('fs');
//const data = fs.readFile('user.json');

// Middleware
app.use(express.json());
//enables json file to passed into the get function
app.get('/users', (req, res) => {
    fs.readFile('user.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.send('Error reading file');
        }
        res.send(data);
        });
    });
// 
 
app.get('/users/:id', (req, res) => {
    fs.readFile('user.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).send('Error reading file');
      }
      try {
        const users = JSON.parse(data);
        const { id } = req.params;
        const user = Object.values(users).find(user => user.id === parseInt(id));
  
        if (user) {
          res.json(user);
        } else {
          res.status(404).send('User not found');
        }
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).send('Error parsing JSON');
      }
    });
  });
  

  app.get('/users/profession/:profession', (req, res) => {
    fs.readFile('user.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).send('Error reading file');
      }
      try {
        const users = JSON.parse(data);
        const { profession } = req.params;
        const user_profession = Object.values(users).filter(user_profession => user_profession.profession.toLowerCase() === profession.toLowerCase());
  
        if (user_profession.length>0) {
          res.json(user_profession);
        } else {
          res.status(404).send('User not found');
        }
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).send('Error parsing JSON');
      }
    });
  });


  app.get('/users/name/:name', (req, res) => {
    fs.readFile('user.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return res.status(500).send('Error reading file');
      }
      try {
        const users = JSON.parse(data);
        const { name } = req.params;
        const user_name = Object.values(users).filter(user_name => user_name.name.toLowerCase() === name.toLowerCase());
  
        if (user_name) {  //need to check if there is a user name(greater than 0) before this can be evaluated as true
          res.json(user_name);
        } else {
          res.status(404).send('User not found');
        }
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).send('Error parsing JSON');
      }
    });
  });



  
// 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
