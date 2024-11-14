import { setSeederFactory } from 'typeorm-extension';
import { Chat } from '../models/Chat';

export const ChatFactory = setSeederFactory(Chat, async (faker) => {
    const chat = new Chat();
    chat.name = faker.lorem.sentence();
    chat.type = Math.random() > 0.5 ? "private" : "group";

    return chat;
})
