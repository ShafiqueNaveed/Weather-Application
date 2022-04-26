const path = require('path')
const express = require('express')
const hbs= require('hbs')
const forecast = require("./utilites/forecast")
const geocode = require('./utilites/Geocode')

//express(): is a function we call it to create a express application
const app = express()

// here we are define paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// app.set: allows us to set a value for a given express settings
// Also setup Handlebars engine and location
app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.get: it lets us config. server if someone visit this route
app.get('' , (req , res)=>{
    res.render('index' , {
        title : 'Weather App',
        name: 'Shafique Naveed'
    })
})

app.get('/about',(req , res)=>{
    res.render('about',{
        title:'About Page',
        name:'Shafique Naveed'
    })
})

app.get('/weather' , (req , res)=>{
    if(!req.query.address){
        return  res.send({
            error: 'You must provide a address'
        })
    }

    const address = req.query.address
        geocode(address, (error, { lattitude, longitude, location } = {}) => {
            if(error){
                return res.send({ error })
            }
            
            forecast(lattitude , longitude, (error , forecastdata)=>{
                if(error){
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastdata,
                    location,
                    address: req.query.address,
                })
                
            })
    
        })
    
    })


app.get('/help' , (req , res)=>{
    res.render('help' , {
        msg: 'If u want help call me HOT!',
        title: 'Help',
        name: 'Shafique Naveed'
    })
})

app.get('/help/*',(req, res)=>{
    res.render("errorHandler", {
        name: "Shafique Naveed",
        title: "404",
        errorMessage: "Help Article Not Found",
    });
})

app.get('*',(req, res)=>{
    res.render('errorHandler' , {
        name: 'Shafique Naveed',
        title: '404' ,
        errorMessage: 'Page Not Found'
    })
})

// we use app.listen to start up server with the port and run a msg
app.listen(3000 , ()=>{
    console.log('Server is Start running')
})
