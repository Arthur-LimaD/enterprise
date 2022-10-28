const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
var passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }
const cors = require('cors')
const cookieParser = require('cookie-parser')
var path = require('path');

const app = express();
const req = require('express/lib/request');
const { signedCookie } = require('cookie-parser');
const { Console } = require('console');
const port = 80;
 
app.listen(port,()=> {
    console.log('Servidor Rodando!');
})

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('public', path.join(__dirname, '/public'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(cookieParser());


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})

sequelize.authenticate().then(function(){
    console.log("MySql connected!")
}).catch(function(erro){
    console.log("Error at connecting to MySql: "+erro)
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
    },
    company : {
        type: Sequelize.JSON
    }
})

//users.sync({force: true})

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: oneDay,
        sameSite: true,
        resave: false,
        secure: false,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/register', async(req, res)=> {

    let {name} = req.body;
    let {email} = req.body;
    let {password} = req.body;

    var hashedPassword = await bcrypt.hash(password, 10);

    users.findOne({
        where:{
            email: email
        }
    }).then((user)=> {
        if(!user){
            users.create({
                name: name,
                email: email,
                password: hashedPassword,
                company: new Array()
            })
            res.status(200).send('Sucess')
        }else{
            res.status(409).send('alreadyExists')
        }
    })

})


require('./configs/auth')

app.post('/login', 
    passport.authenticate('local', {failureRedirect: '/loginfail'}),
 (req, res)=> {

    var {name} = req.user;
    var {email} = req.user;
    var {id} = req.user;
    
    res.status(200).send({id, name, email})
    
})

app.get('/loginfail', (req, res)=> {
    console.log('ACESS DENIED')
    res.status(401).send("User's Password and Email dont match or Email Don't Registered!")
})

app.get('/home', (req, res)=> {

    if(req.user){
        
        users.findOne({
            where: {
                id: req.user.id
            }
        }).then((user)=> {
            var name = user.name;
            var email = user.email;
            var company = user.company;
            console.log(company)
            res.status(200).send({name, email, company});
        })

    }else{
        res.status(401).send('Unauthorized');
    }
    
    
})

app.post('/logout', (req, res, next)=> {


    req.logout(function(err) {
        if (err) { return next(err); }
        req.user = {}
        res.clearCookie('connect.sid');
        res.status(200).send('Ok');
        
    });
    
    
})

app.post('/company/new', (req, res)=> {

    if(req.user){

        let newCompany = req.body;
        newCompany = {...newCompany, data: new Array()}
        users.findOne({
            where: {
                id: req.user.id
            }
        }).then((user)=> {
            var companies = user.company;
            companies.push(newCompany);
            companies.forEach((o, i) => o.id = i + 1);
            users.update(
                { company: companies },
                { where: { id: req.user.id } }
            )

            res.json(companies).status(200)
        })
    
    }else{

        res.status(401).send('Unauthorized')

    }
})

app.delete('/company/:id/delete', (req,res)=> {

    if(req.user){

        const id = Number(req.params.id)
        console.log(id)

        users.findOne({
            where: {
                id: req.user.id
            }
        }).then((user)=> {
            var companies = user.company;
            let newCompanies = companies.filter(company=> 
                company.id != id
            )
            console.log(newCompanies)
            users.update(
                { company: newCompanies },
                { where: { id: req.user.id } }
            )
            res.json(newCompanies).status(200)
        })

    }else{
        res.status(401).send('Unauthorized')
    }
})

app.put('/company/:id/edit/data', (req, res)=> {

    const id = Number(req.params.id)

    if(req.user){
        users.findOne({
            where: {
                id: req.user.id
            }
        }).then((user)=> {

            const companies = user.company;

            let thisCompany = companies.filter(company=> 
                company.id === id
            )

            let bodyKey = Object.keys(req.body)

            let thisData = thisCompany[0].data.filter((data)=> {

                if(Object.keys(data)[0] == bodyKey[0]){
                    return data
                }else{
                    return false
                }

            })

            if(thisData[0]){

                let newData = thisCompany[0].data.filter((data)=> {

                    if(Object.keys(data)[0] !== bodyKey[0]){
                        return data
                    }else{
                        return false
                    }
    
                })

                newData.push(req.body)
                thisCompany[0].data = newData

            }else{
                thisCompany[0].data.push(req.body)
            }

            thisCompany[0].data.sort((a, b)=> {
                a = Object.keys(a)[0]
                b = Object.keys(b)[0]
                if(a > b) return 1;
                if(a < b) return -1;
                return 0;
            })

            users.update(
                { company: thisCompany },
                { where: { id: req.user.id } }
            )

            res.json(thisCompany).status(200)
        })
    }else{

        res.status(401).send('Unauthorized')
        console.log('ACESS DENIED')

    }
})


app.put('/company/:id/edit/general', (req, res)=> {

    const id = Number(req.params.id)

    if(req.user){
        users.findOne({
            where: {
                id: req.user.id
            }
        }).then((user)=> {

            const companies = user.company;

            let thisCompany = companies.filter(company=> 
                company.id === id
            )

            thisCompany[0].name = req.body.name;
            thisCompany[0].value = req.body.value;
            thisCompany[0].segment = req.body.segment;
            thisCompany[0].description = req.body.description;

            var newCompanies = companies.filter(company=> 
                company.id !== id
            )

            newCompanies.push(thisCompany[0])

            users.update(
                { company: newCompanies },
                { where: { id: req.user.id } }
            )

            res.json(thisCompany).status(200)
        })
    }else{
        res.status(401).send('Unauthorized')
        console.log('ACESS DENIED')

    }
})