const path = require('path');
const fs = require('fs');

// const person = {
//     name: "Ivan",
//     surname: "Ivanov",
//     age: 30,
//     city: "Moscow"
// };

const pathToFile = path.join(__dirname, 'person.json');

// fs.writeFileSync(pathToFile, JSON.stringify(person, null, 2));

const userDate = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
userDate.age -= 10;
userDate.city = "Saint-Petersburg";
fs.writeFileSync(pathToFile, JSON.stringify(userDate, null, 2));
