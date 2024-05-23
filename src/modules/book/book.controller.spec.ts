import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookEntity } from './book.entity';

const mockedBook: BookEntity = {
  id: 1,
  created_at: new Date(),
  updated_at: new Date(),
  title: 'test',
  isbn: 'test',
  published_at: new Date(),
  author_id: 1,
  author: {
    id: 1,
    created_at: new Date(),
    updated_at: new Date(),
    name: 'test',
    bio: 'testBio',
    birth_date: new Date(),
  }
}

const mockBookService = {
  create: jest.fn().mockReturnValue(mockedBook),
  getAll: jest.fn().mockReturnValue([mockedBook]),
  update: jest.fn().mockImplementationOnce(() => Promise.resolve()),
  delete: jest.fn().mockImplementationOnce(() => Promise.resolve()),
};
describe('Book Controller', () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an book', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(mockedBook);
    const book = await service.create({
      title: 'test',
      isbn: 'test',
      published_at: new Date(),
      author_id: 1,
    });
    expect(book).toEqual(mockedBook);
  });

  it('should get all books', async () => {
    jest.spyOn(service, 'getAll').mockResolvedValue([mockedBook]);
    const book = await service.getAll();
    expect(book).toEqual([mockedBook]);
  });

  it('should update an book', async () => {
    jest.spyOn(service, 'update').mockResolvedValue();
    const book = await service.update(1, {
      title: 'changedTitle',
    });
    expect(book);
  });

  it('should delete an book', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue();
    const book = await service.delete(1);
    expect(book);
  });
});
