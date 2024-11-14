import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import UserSeeder from './user.seeder';
import ChatSeeder from './chat.seeder';

export default class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    await new UserSeeder().run(dataSource, factoryManager);
    await new ChatSeeder().run(dataSource, factoryManager);
  }
}
