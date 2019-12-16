const db = require('./connection');

const User= require('./../models/user_model');



function getAll() {
    return users.find();
}

function createUser(user) {
    console.log(user)
    newUser = new User();
    newUser.login = user.login;
    newUser.password = user.password;
    var saved = false;
    return User.find({login: newUser.login}, function(err, us) {
      if (err) return handleError(err);
      console.log("Pusty?");
        if(us.length == 0)
        { console.log("Nie pusty");
          saved = true;
          return newUser.save(function (err) {
          if (err) return handleError(err);
            console.log("saved");
          });
        }
        else {
          saved = false;
          console.log("Pusty");
          return ;
        }
    }).then((us1)=>{
      console.log(saved);
      return saved;
    });
}


function addStation(login, password, id) {
    var added= false;
    return User.find({login: login, password: password}, function(err, us) {
      if (err) return handleError(err);
      console.log("Pusty?");
        if(us.length == 0)
        {
          added = false;
        }
        else {
          if(us[0].stations.includes(id)){
            added = false;return;}
        console.log(us[0]);
        console.log(us[0].stations);
        us[0].stations.push(id);
        added = true;
        return us[0].save(function(err) {
          if (err) return handleError(err);
          console.log("Added");
        });
        }
    }).then((us1)=>{
      console.log(added);
      return added;
    });
}

function delStation(login, password, id) {
    var deleted= false;
    return User.find({login: login, password: password}, function(err, us) {
      if (err) return handleError(err);
      console.log("Pusty?");
        if(us.length == 0)
        {
          deleted = false;
        }
        else {
        console.log(us[0]);
        console.log(us[0].stations);
        var index = us[0].stations.indexOf(id);
        if (index > -1) {
          us[0].stations.splice(index, 1);
        }
        else{
          deleted = false;return;
        }
        deleted = true;
        return us[0].save(function(err) {
          if (err) return handleError(err);
          console.log("Deleted");
        });
        }
    }).then((us1)=>{
      console.log(deleted);
      return deleted;
    });
}

function allStations(login, password) {
    var stations = [];
    return User.find({login: login, password: password}, function(err, us) {
      if (err) return handleError(err);
      console.log("Pusty?");
        if(us.length == 0)
        {
          return;
        }
        else {
          stations = us[0].stations;
          return;
        }
    }).then((us1)=>{
      return stations;
    });
}

function login(login, password) {
    var logged = false;
    return User.find({login: login, password: password}, function(err, us) {
      if (err) return handleError(err);
      console.log("Pusty?");
        if(us.length == 0)
        {
          return;
        }
        else {
          logged = true;
          return;
        }
    }).then((us1)=>{
      return logged;
    });
}



module.exports = {
    createUser,
    addStation,
    delStation,
    allStations,
    login
};
