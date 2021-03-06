const request=require('request')
/*const url='http://api.weatherstack.com/current?access_key=7e8ae7abd740cdc49d5f51d67c2a3f03&query=37.8267,-122.4233&units=f'
request({url:url, json:true},(error, response)=>{
    if(error){
        console.log('Unable to connect to weather service')
    }else if(response.body.error){
        console,log('Unable to find location')
    }else{
    
    console.log(response.body.current.weather_descriptions[0]+  'it is currently' +response.body.current.temperature + ' degrees out. It feels like' +response.body.current.feelslike)
    }
})*/
const forecast=(latitude, longitude, callback)=>{
    const url='http://api.weatherstack.com/current?access_key=7e8ae7abd740cdc49d5f51d67c2a3f03&query='+latitude+','+longitude+'&units=f'
    request({url, json:true},(error, {body})=>{
        
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            //console.log(body.current.weather_descriptions[0].humidity)
            callback(undefined, body.current.weather_descriptions[0] +". It is currently " +body.current.temperature +" degrees. feels like " +body.current.feelslike + " centigrades")
        }
    })
}

module.exports=forecast