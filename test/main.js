process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');

let Server = require('../core/Server');
let app = require('../core/App.js');
const config = require('../config');

chai.should();

chai.use(chaiHttp);

let Cookies;

describe('Application', () => {
  let api;
  before(async () => {
    await app.init();
    let server = new Server(app);
    api = await server.start(config.appPort);
  });

  after(() => {
    api.close();
  });

  describe('/GET cards', () => {
    it('it should GET cards response', done => {
      chai
        .request(api)
        .get('/card/list')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.property('type', 'application/json');
          done();
        });
    });
  });

  describe('/POST user', () => {
    it('it should user will be not logged', done => {
      chai
        .request(api)
        .post('/user')
        .send({
          user_name: 'Alex',
          password: '1111'
        })
        .end((err, res) => {
          res.should.be.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('success', 0);
          done();
        });
    });
  });

  describe('/DELETE card', () => {
    it('it should return deleted card', done => {
      chai
        .request(api)
        .delete('/card/7')
        .end((err, res) => {
          res.should.be.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('/POST card', () => {
    it('it should be create new card', done => {
      chai
        .request(api)
        .post('/card/create')
        .send({
          title: 'new test idea',
          description: 'description of new card'
        })
        .end((err, res) => {
          res.should.be.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title', 'new test idea');
          res.should.have.property('type', 'application/json');

          done();
        });
    });
  });

  describe('Functional Test <Sessions>:', () => {
    it('it should get the user cookies', done => {
      chai
        .request(api)
        .post('/user')
        .end((err, res) => {
          res.should.be.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success', 1);
          Cookies = res.headers['set-cookie'];
          console.log(Cookies);
          done();
        });
    });
    it('it should get cards current user', done => {
      let req = chai.request(api).get('/myCards');
      req.cookies = Cookies;
      req.end((err, res) => {
        res.body.should.be.a('array');
        res.body.map(singleCard => singleCard.user_id.should.equal(4));
        done();
      });
    });
  });
});
