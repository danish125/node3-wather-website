const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const path= require('path') 
const express=require('express')
const hbs=require('hbs')
const geoCode = require('./utils/geocode')

const app=express()
const port=process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPaths=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPaths)

//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('',(req , res)=>{
    res.render('index',{
        title: "Weather App",
        name: "danish"
    })
})
app.get('/about',(req, res)=>{ 
    res.render('about', {
        title: "About",
        name: "Danish"
    })    
})
app.get('/help',(req, res )=>{
    res.render('help',{
        message: "we are here to help",
        title: 'Help',
        name: 'Danish Rehman'
    })
})
 
app.get('/weather',(req, res)=> {
   // console.log(req.query.address)
    if(!req.query.address){
        return res.send({
            error: 'no adress searched'
        })
    }else{
geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
    
    if(error){
        return res.send({
            error
        })
    }
   
    forecast(latitude, longitude, (error, forecastData) => {
        
        if(error){
            return res.send({
                error
            })
        }
        console.log(forecastData)
        console.log(location)
        //console.log(req.query,address)
        res.send({
            forecast: forecastData,
            location: location
            
            //forecast: forecastData.weatherDescription,
            //temperature: forecastData.temperature,
            //address: req.query.address
            //humidity: forecastData.humidity*/
           
        })
       
})
})

}
    
   
})
app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req, res)=>{
    res.render('error',{
        title: '404',
        errorText: 'help article not found',
        name: 'danish'
    })
})
app.get('*',(req, res)=>{
    res.render('error',{
        title: '404',
        errorText: 'page not found',
        name: 'danish'
    })
})
app.listen(port, ()=>{
    console.log('server is runnin on ' +port)
})