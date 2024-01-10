const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
//db config
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '10.210.42.73',
        port : 3306,
        user : 'root',
        password : 'home1xfactory',
        database : 'To_do'
    }
});
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    knex.select().from('todo')
    .then(items=>{
        var data = JSON.parse(JSON.stringify(items));
        console.log(data) 
    })
    .catch(()=>{
        console.log('error')
    })
})

app.get('/todo/:id',(req,res)=>{
    console.log(req.params.id);
    knex.select()
    .from('todo')
    .where('id','=',req.params.id)
    .then(items=>{
        console.log(JSON.parse(JSON.stringify(items)));
    })
    .catch(error=>{
        console.log(error);
    })
})

app.post('/add_task',(req,res)=>{
    // console.log(req)
    const data = req.body;
    // console.log(data.todo);
    knex('todo').insert({todo:data.todo})
    .then(()=>{
        console.log('success');
    })
    .catch(()=>{
        console.log('error')
    })
})

app.put('/edit_task/:id',(req,res)=>{
    const data  = req.body;
    console.log(data)
    knex('todo').where('id', '=',req.params.id)
    .update({'status':data.status})
    .then(()=>{
        console.log('success');
    })
    .catch(error=>{
        console.log(error);
        console.log('error');
    })
    
})

app.delete('/delete_task/:id',(req,res)=>{
    const data =  req.body;
    knex('todo').where('id','=',req.params.id)
    .del()
    .then(()=>{
        console.log('deleted');
    })
    .catch(error=>{
        console.log(error);
    })
})

//post request to add the data

app.listen(port,()=>{
    console.log(`Port is ${port}`)
})
