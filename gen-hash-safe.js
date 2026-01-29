const bcrypt = require('bcryptjs');
const fs = require('fs');

const password = 'Admin@123';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

fs.writeFileSync('full-hash.txt', hash);
console.log('Full hash written to full-hash.txt');
