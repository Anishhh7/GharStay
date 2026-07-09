require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const User = require('./../models/userModel');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

async function createSuperAdmin() {
  try {
    await mongoose.connect(DB);
    console.log('✅ Connected to DB');

    const existing = await User.findOne({ email: 'owner@raithane.com' });
    if (existing) {
      console.log('⚠️ SuperAdmin already exists');
      process.exit();
    }

    await User.create({
      name: 'Raithane Owner',
      email: 'owner@raithane.com',
      password: 'ChangeThisPassword123',
      role: 'superAdmin',
    });

    console.log('✅ SuperAdmin created successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

createSuperAdmin();