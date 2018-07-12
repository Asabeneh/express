const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require("body-parser");

// http.createServer()
let id = 1;
const messages = [];

app.use(bodyParser.json());

// const messages = [
//     {
//         id:1,
//         name:'Toni Antti',
//         content:'I am learning React',
//         read:true
//     },
//     {
//         id: 2,
//         name: 'Antti Sami',
//         content: 'I am learning Node',
//         read: false
//     },
//     {
//         id: 3,
//         name: 'Maki Antti',
//         content: 'I am learning JavaScript',
//         read: false
//     }
// ];


app.get('/',(req,res) => {
    res.send('hi')
});

app.get('/messages',(req,res) => {
    res.json(messages)
});

app.get('/messages/:id', (req,res) => {
    const index = Number(req.params.id);
    let flag = false;
    for(let i = 0; i < messages.length; i++){
        if(messages[i].id === index){
            res.json(messages[i]);
            flag = true;
            break; 
        }

    }
    // console.log(req.url);
    // res.send(req.params.id);
    // res.send(messages[index]);
    if(!flag){
        res.send('Cannot find any messsages with this id.')
    }

});

app.post('/messages/',(req,res) => {
    const body = req.body;
    // const newMessage = {
    //     id:1,
    //     name:'Asabeneh Yetayeh',
    //     content:'Teaching Node.js',
    //     read:true
    // };
    const newMessage = {
        id:id++,
        name:body.name,
        content:body.content,
        read:body.read
    };
    messages.push(newMessage);
    res.send("A new message is added")
});

app.delete('/messages/:id',(req, res) => {
    const index = Number(req.params.id);
    let flag = false;
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].id === index) {
           messages.splice(i,1);
            flag = true;
            break;
        }

    }

    if (!flag) {
        res.send('Cannot delete')
    }
        else {
            res.send('Message with ID' + id + ' has been deleted')
        }
       
    });



app.listen(3000,() =>{
    console.log('The server is runnin on port 3000.');
    
})