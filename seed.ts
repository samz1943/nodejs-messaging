import mongoose from 'mongoose';
import { AppDataSource } from './src/config/postgres';
import { messageSeeder } from './src/database/mongo/seeders/message.seeder'
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    await AppDataSource.initialize();
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');

    // Run each seeder
    console.log('Seeding Messages...');
    await messageSeeder(AppDataSource);

    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await AppDataSource.destroy()
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedDatabase();
