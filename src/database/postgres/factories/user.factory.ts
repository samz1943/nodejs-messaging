import { setSeederFactory } from 'typeorm-extension';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

export const UserFactory = setSeederFactory(User, async (faker) => {
    const user = new User();
    user.username = faker.internet.userName();
    user.password = await bcrypt.hash("1234", 10);

    return user;
})
