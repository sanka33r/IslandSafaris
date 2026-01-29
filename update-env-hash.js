const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const password = 'Admin@123';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

const envPath = path.join(__dirname, '.env.local');
let envContent = fs.readFileSync(envPath, 'utf8');

// Replace the line starting with ADMIN_PASSWORD_HASH
envContent = envContent.replace(/^ADMIN_PASSWORD_HASH=.*$/m, `ADMIN_PASSWORD_HASH=${hash}`);

fs.writeFileSync(envPath, envContent);
console.log('Successfully updated ADMIN_PASSWORD_HASH in .env.local');
console.log('Password is: Admin@123');
console.log('New Hash is:', hash);
