import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { AuthorEntity } from './author.entity';

const mockedAuthor: AuthorEntity = {
  id: 1,
  created_at: new Date(),
  updated_at: new Date(),
  name: 'test',
  bio: 'testBio',
  birth_date: new Date(),
  books: [
    {
      id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      title: 'test',
      isbn: 'test',
      published_at: new Date(),
      author_id: 1,
    }
  ]
}

const mockAuthorService = {
  create: jest.fn().mockReturnValue(mockedAuthor),
  getAll: jest.fn().mockReturnValue([mockedAuthor]),
  update: jest.fn().mockImplementationOnce(() => Promise.resolve()),
  delete: jest.fn().mockImplementationOnce(() => Promise.resolve()),
};
describe('Author Controller', () => {
  let controller: AuthorController;
  let service: AuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuthorController],
      providers: [
        {
          provide: AuthorService,
          useValue: mockAuthorService,
        },
      ],
    }).compile();

    controller = module.get<AuthorController>(AuthorController);
    service = module.get<AuthorService>(AuthorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an author', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(mockedAuthor);
    const author = await service.create({
      name: 'test',
      bio: 'testBio',
      birth_date: new Date(),
    });
    expect(author).toEqual(mockedAuthor);
  });

  it('should get all authors', async () => {
    jest.spyOn(service, 'getAll').mockResolvedValue([mockedAuthor]);
    const author = await service.getAll();
    expect(author).toEqual([mockedAuthor]);
  });

  it('should update an author', async () => {
    jest.spyOn(service, 'update').mockResolvedValue();
    const author = await service.update(1, {
      name: 'changedName',
    });
    expect(author);
  });

  it('should delete an author', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue();
    const author = await service.delete(1);
    expect(author);
  });
});
