const bcrypt = require('bcrypt');
var passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const session = require('express-session');

const Sequelize = require('sequelize');
const req = require('express/lib/request');
const sequelize = new Sequelize('arthur', 'root', 'tl1wlndw', {
    host: "localhost",
    dialect: 'mysql'
})

const users = sequelize.define('users', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
})

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (username, password, done) => {
    users.findOne({
        where:{
            email: username
        }
    }).then((user) =>{
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    return done(null, user);
                }else{
                    return done(null, false);
                }
            }) 
        }else{
            return done(null, false);
        }
    });
})); 

passport.serializeUser((user, done)=>{
    done(null, user.id); 
});

passport.deserializeUser((id, done)=>{
    users.findOne({ 
        where: {
            id: id 
        }
    }).then(user => {
      done(null, user);
        
    }).catch(err => done(err));
});