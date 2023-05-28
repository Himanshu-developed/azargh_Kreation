import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './app.module';
describe('AppController (e2e)', () => {
  let app: any;
  let moduleFixture: TestingModule;

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users (GET)', () => {
    it('should return an array of users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .expect(200);
    });
  });

  describe('/users/:id (GET)', () => {
    it('should return a user detail', async () => {
      const userId = 1;
      const response = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200);
    });
  });

  describe('/users (POST)', () => {
    it('should create a new user', async () => {
      const newUser = {
        "phone":9934937907,
        "image":"",
        "firstName":"himanshu",
        "lastName":"Raj"
    };
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .expect(201);
    });
  });

  describe('/users (PUT)', () => {
    it('should update a user', async () => {
      const updatedUser = {
        "userId":6,
        "fieldsToUpdate":["firstName", "lastName"],
        "newValues":["himanshu", "kumar", "1234567890"],
        "oldValues":["hello", "test", "0000000000"],
        "userDetailId":4
    };
      const response = await request(app.getHttpServer())
        .put('/users')
        .send(updatedUser)
        .expect(200);
    });
  });

  describe('/users/:id (DELETE)', () => {
    it('should delete a user', async () => {
      const userId = 1;
      await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .expect(200);
    });
  });
});
