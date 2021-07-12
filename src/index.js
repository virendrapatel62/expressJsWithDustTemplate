const express = require('express')

const logger  = require('logger-line-number')

const dust = require('dustjs-linkedin')
const consolidate = require('consolidate')
const app = express()
const faker = require('faker')
const port = 3000

// app.engine( '.dust' , dust.engine({
//     // Use dustjs-helpers
//     useHelpers: true
//   }))

app.engine('.dust' , consolidate.dust)
app.use(express.static('public'))

app.get("/" , (req , res)=>{
   res.redirect('/students')
})


app.get("/students" , (req , res)=>{
    logger.log(req.url)
     const students = new Array(10).fill().map((el , index)=>(
        {
            name: faker.name.findName(),
            id : index+1,
            profile : faker.image.avatar() , 
            description  :  faker.lorem.words(100), 
            rollnumber : Math.ceil((Math.random()*1000000000))
        }))
        res.set('Cache-Control', 'public, max-age=0'); // one year
    res.render('index.dust' , {students})
})



app.listen(port , ()=>{
    logger.log("Application is listening at post " + port )
})



dust.helpers.isEven = function(chunk, context, bodies, params) {
    logger.log("isEven Dust Helper")
    const {value} = params
    
   return value % 2 == 0 ;
}
dust.helpers.shortDescription = function(chunk, context, bodies, params) {
    
    logger.log("Short Description Helper")
    const {description} = params
    const newDescription = description.length > 20 ? description.substring(0 , 20) : description 
    chunk.write(newDescription)
    chunk.write("....")
    return chunk;
}

