// метод express, с помощью npm, аналог работы http, только удобнее и проще

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('static'));

// метод app.use, должен стоять перед основными обработчиками, иначе он не будет работать
app.use((req, res, next) => {
    console.log('Поступил запрос', req.method, req.url);
    next(); // если next() не вызывается, то сайт не будет загружаться
});

app.get('/', (req, res) => {
    res.sendFile('static/index.html');  // отправляет файл index.html, чтобы не писать код в обработчике, можно просто добавить готовый файл html, в данном варианте не нужно указывать полный путь к файлу, достаточно указать только его имя

    //  res.sendFile(path.join(__dirname, '/index.html'));  // отправляет файл index.html, чтобы не писать код в обработчике, можно просто добавить готовый файл html
    // res.send('<h1>Добро пожаловать на мой сайт!</h1>'); 
});

app.get('/about', (req, res) => {
    res.send('<h1>О нас</h1>');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});