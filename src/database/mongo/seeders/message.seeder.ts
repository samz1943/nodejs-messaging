import { faker } from '@faker-js/faker';
import { Chat } from '../../postgres/models/Chat';
import { Message } from '../models/Message';
import { DataSource } from 'typeorm';


export const messageSeeder = async (appDataSource: DataSource) => {
  await Message.deleteMany();

  const chatRepository =  appDataSource.getRepository(Chat);
  const chats = await chatRepository.find({ relations: ['participants'] });
  const messages = [];

  for (let i = 0; i < 30; i++) {
    const randomChat = chats[Math.floor(Math.random() * chats.length)];

    if (randomChat.participants.length === 0) continue;

    const randomParticipant = randomChat.participants[Math.floor(Math.random() * randomChat.participants.length)];

    messages.push({
      chatId: randomChat.id,
      senderId: randomParticipant.id,
      content: faker.lorem.sentence(),
    });
  }

  await Message.insertMany(messages);
};
