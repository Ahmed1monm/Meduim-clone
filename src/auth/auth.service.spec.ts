import { TestBed } from '@automock/jest';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { IToken } from './interfaces/token.interface';

describe('Auth controller unit tests', () => {
  let authService: AuthService;
  let usersService: jest.Mocked<UserService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(AuthService).compile();
    usersService = unitRef.get(UserService);
    authService = unit;
  });
  it('should return token interface from login', async () => {
    const mockUsers: UserEntity[] = [
      {
        id: 1,
        username: 'test',
        password:
          '$2a$10$3ojOya2iD8QWecONRgBdT.vNYv2o1y6o9MDEIhl9CQQt9ppVmTKpm',
        name: 'test',
        bio: 'test',
        image: 'test',
        created_at: new Date(),
        type: null,
        comments: [],
        article: [],
      },
    ];
    usersService.findOneByUsername.mockResolvedValue(mockUsers[0]);

    const token: IToken = await authService.login({
      username: 'test',
      password: 'test',
    });
    console.log(token);
    expect(usersService.findOneByUsername).toHaveBeenCalled();
    expect(token).toHaveProperty('token');
  });

  it('should return token interface from register', async () => {
    const mockUser: UserEntity = {
      id: 1,
      username: 'test',
      password: '$2a$10$3ojOya2iD8QWecONRgBdT.vNYv2o1y6o9MDEIhl9CQQt9ppVmTKpm',
      name: 'test',
      bio: 'test',
      image: 'test',
      created_at: new Date(),
      type: null,
      comments: [],
      article: [],
    };

    usersService.create.mockResolvedValue(mockUser);

    const token: IToken = await authService.register({
      username: 'test',
      password: 'test',
      name: 'test',
      bio: 'test',
      image: 'test',
      type: 1,
    });
    console.log(token);
    expect(usersService.create).toHaveBeenCalled();
    expect(token).toHaveProperty('token');
  });
});
