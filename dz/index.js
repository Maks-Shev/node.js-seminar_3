const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('static'));

let homeCount = 0;
let aboutCount = 0;

const countersFilePath = path.join(__dirname, 'count.json');

function loadCounters() {
    try {
       const data = fs.readFileSync(countersFilePath, 'utf-8');
       const counters = JSON.parse(data);
       homeCount = counters.homeCount;
       aboutCount = counters.aboutCount;
    } catch (error) {
      console.log('Ошибка чтения файла', error);
    }
};

function saveCounters() {
    const counters = {
        homeCount,
        aboutCount
    };
    fs.writeFileSync(countersFilePath, JSON.stringify(counters));
};

function sendFileWithCount (res, filePath, count) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Ошибка сервера');
        } else {
           if (data.includes('{{count}}')) {
            const modifiedData = data.replace('{{count}}', count.toString());
            res.send(modifiedData);
        } else {
            console.log('Плейсхолдер {{count}} не найден.');
            res.send(data);
        }}
    });
}

loadCounters(); 

app.get('/', (req, res) => {
    homeCount++;
    saveCounters();
    sendFileWithCount(res, path.join(__dirname, 'static', 'index.html'), homeCount);
});

app.get('/about', (req, res) => {
    aboutCount++;
    saveCounters();
    sendFileWithCount(res, path.join(__dirname, 'static', 'about.html'), aboutCount);
});

app.use((req, res) => {
    res.status(404).send('<h1>Страница не найдена</h1>');
});



app.listen(port, () => console.log(`Сервер запущен на порту: ${port}!`)) ;

