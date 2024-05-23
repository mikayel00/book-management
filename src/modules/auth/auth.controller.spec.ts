import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const mockedUser = {
  email: 'test@test.com',
  password: 'test123',
}

const mockedJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNzE2NDUyMDI5fQ.5fhfwbiiuc5Ur1b6a41jFDqiHqKhUoUzmTVr8rknEj8';

const mockAuthService = {
  signUp: jest.fn().mockReturnValue(mockedUser.email),
  login: jest.fn().mockReturnValue({ token: mockedJwt }),
};
describe('Auth Controller', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register an user', async () => {
    jest.spyOn(service, 'signUp').mockResolvedValue({ email: mockedUser.email });
    const user = await service.signUp({
      email: 'test@mail.com',
      password: 'test123',
    });
    expect(user).toEqual({ email: mockedUser.email });
  });

  it('should login an user', async () => {
    jest.spyOn(service, 'login').mockResolvedValue({ token: mockedJwt });
    const user = await service.login(mockedUser);
    expect(user).toEqual({ token: mockedJwt });
  });
});
