// scripts/seed-agents.js
const mongoose = require('mongoose');
const path = require('path');

// ✅ Correct way to load .env.local
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

console.log('🔗 Connecting to MongoDB...');

const agents = [
  { name: 'Priya Sharma', email: 'priya@metrohome.com', phone: '+91 98765 43210', zone: 'west_delhi', rating: 4.8 },
  { name: 'Rahul Verma', email: 'rahul@metrohome.com', phone: '+91 98765 43211', zone: 'gurugram', rating: 4.7 },
  { name: 'Anjali Gupta', email: 'anjali@metrohome.com', phone: '+91 98765 43212', zone: 'west_delhi', rating: 4.9 },
  { name: 'Vikram Singh', email: 'vikram@metrohome.com', phone: '+91 98765 43213', zone: 'gurugram', rating: 4.6 }
];

async function seedAgents() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    
    // Clear existing agents
    const deleted = await db.collection('agents').deleteMany({});
    console.log(`🗑️ Cleared ${deleted.deletedCount} existing agents`);

    // Insert new agents
    const result = await db.collection('agents').insertMany(agents);
    console.log(`✅ Inserted ${result.insertedCount} agents\n`);

    console.log('📋 Agents seeded:');
    agents.forEach((agent, i) => {
      console.log(`  ${i+1}. ${agent.name} (${agent.zone}) - ${agent.phone}`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Done!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedAgents();