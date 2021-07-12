const express = require('express')
const dust = require('express-dustjs')
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

    const students = new Array(10).fill().map((el , index)=>(
        {
            name: faker.name.findName(),
            id : index+1,
            profile : faker.image.avatar() , 
            description  :  faker.lorem.words(4), 
            rollnumber : Math.ceil((Math.random()*1000000000))
        }))
        res.set('Cache-Control', 'public, max-age=0'); // one year
    res.render('index.dust' , {students})
})


app.get("/students" , (req , res)=>{
    res.json({
        students : new Array(10).fill().map((el , index)=>({
            name:'virendra - '+index,
            id : index+1,
            rollnumber : Math.ceil((Math.random()*1000000000))
            }))
    })
})



app.listen(port , ()=>{
    console.log(`application is listing at ${port}`)
}  )

