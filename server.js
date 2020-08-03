'use strict';
require('dotenv').config();
const express = require('express');
// const agent = require('superagent');
const psql = require('pg');
const { urlencoded } = require('body-parser');
const { render } = require('ejs');
const server = express();
const client = new psql.Client({
    connectionLimit: 100,
    host:'192.168.198.1',
    user:'ahmed',
    password:'123',
    database:'psqltest',
    port: 5432,
    debug: false,
    multipleStatements: true
});
//psql -U postgres -h 192.168.198.1  
const PORT = process.env.PORT || 3030;

server.use(express.static('./public'));
server.use(urlencoded({extended:true}));
server.set('view engine','ejs');

server.get('/',(req,res)=>{
    client.query('select * from test;').then(data=>{
        res.send(data.rows)
    })
});



client.connect().then(()=>{

    server.listen(PORT,()=>{
        console.log('i am listining');
    })
})