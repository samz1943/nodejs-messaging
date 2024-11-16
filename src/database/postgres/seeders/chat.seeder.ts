import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../models/User';
import { Chat } from '../models/Chat';
import { DataSource } from 'typeorm';

export default class ChatSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const userRepository =  dataSource.getRepository(User);
    const users = await userRepository.find();

    const chatRepository =  dataSource.getRepository(Chat);
    await chatRepository.insert([
      {
        name: "Chat 1",
        type: "private",
        participants: [users[0], users[1]],
      },
      {
        name: "Chat 2",
        type: "group",
        participants: users
      },
    ]);
    
    const chatFactory = await factoryManager.get(Chat);
    const numChats = 20;

    for (let i = 0; i < numChats; i++) {
      const randomUsers = users
      .sort(() => 0.5 - Math.random()) // Shuffle users
      .slice(0, Math.floor(Math.random() * 3) + 2); // Take a random number of users (between 2 and 4)

      await chatFactory.save({
        name: `Chat ${i + 1}`,
        type: Math.random() > 0.5 ? "private" : "group",
        participants: randomUsers,
      });
    }
  }
}
