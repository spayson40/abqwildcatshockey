// tools/createAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Admin = require('../server/models/Admin');

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const passwordHash = await bcrypt.hash('Passw0rd', 10);
  const admin = new Admin({ username: 'Admini$trator', passwordHash });

  await admin.save();
  console.log('✅ Admin user created');
  process.exit();
}

createAdmin();
