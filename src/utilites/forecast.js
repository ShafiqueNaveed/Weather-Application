const request = require("request")

const forecast = (lattitude , longitude ,callback)=>{

    const url = "http://api.weatherstack.com/current?access_key=1a4bf194538fde9a0510ea8fdb800dec&query=" + encodeURIComponent(longitude) + ',' + encodeURIComponent(lattitude) + '&units=f'

    request({url, json : true},(error , {body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find Location' , undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out it feels like ' + body.current.feelslike + ' out') 
        }
    })
}

module.exports= forecast