const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('static'));

// app.get('/', (req, res) => {
//     res.send('<h1>Hello World!</h1><br/><a href="/about">About</a>');
// });
    
// app.get('/about', (req, res) => {
//     res.send('<h1>О нас</h1><br/><a href="/">Главная</a>');
// });





app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 
