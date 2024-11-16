import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../models/User';
import { DataSource } from 'typeorm';
import bcrypt from 'bcryptjs';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repository =  dataSource.getRepository(User);
    await repository.insert([
      {
        username: 'test',
        password: await bcrypt.hash("1234", 10),
      },
      {
        username: 'test2',
        password: await bcrypt.hash("1234", 10),
      },
      {
        username: 'test3',
        password: await bcrypt.hash("1234", 10),
      }
    ]);
    
    const userFactory = await factoryManager.get(User);
    await userFactory.saveMany(5);
  }
}
