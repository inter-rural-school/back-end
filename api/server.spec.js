const request = require('supertest')
const db = require('../database/dbConfig.js');
const server = require('./server')

describe('server.js', () => {
    it('should be set to the testing environment', ()=> {
        expect(process.env.DB_ENV).toBe('testing')
    })
    describe(' GET /', () => {
        it('returns 200 OK', () => {
           return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200);
            })
        })
        it('returns JSON', () => {
           return request(server)
           .get('/')
           .then(res => {
               expect(res.type).toMatch(/text/i)
            })
        })
    })

    describe("POST /auth/register", () => {
        it("returns status 201 for admin", () => {
            return request(server)
              .post('/auth/register')
              .send({
                  username:'potato6', 
                  password: 'potato6', 
                  email: 'potato6@potato.com', 
                  first_name: 'potato6',
                  last_name: 'potato6',
                  isBoardMember: 0,
                  school_id: 1
              })
              .then(res => {
                  expect(res.status).toBe(201);
              });
        });
        it("returns status 201 for board", () => {
            return request(server)
              .post('/auth/register')
              .send({
                  username:'potato7', 
                  password: 'potato7', 
                  email: 'potato7@potato.com', 
                  first_name: 'potato7',
                  last_name: 'potato7',
                  isBoardMember: 1,
              })
              .then(res => {
                  expect(res.status).toBe(201);
              });
        });
    });

    describe("POST /auth/login", () => {
        it("returns status 200", () => {
            request(server)
              .post("/auth/login")
              .send({username:'potato', password: 'potato'})
              .then(res => {
                  expect(res.status).toBe(200)
              });
        });
        it("returns status 401", () => {
            request(server)
              .post("/auth/login")
              .send({username:'potato', password: 'potato1'})
              .then(res => {
                  expect(res.status).toBe(401)
              });
        });
    });
})

describe('issues routes', () => {
    describe('get /issues', () => {
        it('returns 200 OK', () => {
            return request(server)
            .get('/issues')
            .then(res => {
                expect(res.status).toBe(200);
            })
        });
        it('should return an array', () => {
            return request(server)
            .get('/issues')
            .then(res => {
                expect(Array.isArray(res.body)).toBe(true)
            })
        });
    });
    
    describe('POST /issues', () => {

        it('should insert a issue into a db', () => {
            //insert one
            return request(server)
            .post('/issues')
            .send({
                issue_title: "Broken Computer",
                issue_description: "Roof leak caused water damage to computer, need new one for classroom.",
                date: "2019-09-22",
                status: "completed",
                comment_id: null,
                school_id: 1
              })
        });

        describe('PUT issue request', () => {
            it('cannot update issue that does not exist', () => {            
                return request(server)
                .put("/issue/1")
                .send(
                    {issue_title: 'testing'}
                )
                .then(res => {
                    expect(res.status).toBe(404);
                })
            });
        });
    
        it('returns 201 OK', () => {
            return request(server)
                .post('/issues')
                .send({
                    issue_title: "Broken Computer",
                    issue_description: "Roof leak caused water damage to computer, need new one for classroom.",
                    date: "2019-09-22",
                    status: "completed",
                    comment_id: null,
                    school_id: 1
                  })
                .then(res => {
                    expect(res.status).toBe(201);
                })
        });
    });
    
    describe('get /issues/:id', () => {
        it('returns 200 ok', () => {
            return request(server)
            .get('/issues/1')
            .then(res => {
                expect(res.status).toBe(201);
            })
        });
    })
});

describe('comments routes', () => {
    describe('get /comments/:id', () => {
        it('returns 200 OK', () => {
            return request(server)
            .get('/comments')
            .then(res => {
                expect(res.status).toBe(200);
            })
        });
        it('should return an array', () => {
            return request(server)
            .get('/comments')
            .then(res => {
                expect(Array.isArray(res.body)).toBe(true)
            })
        });
    });
    
    describe('POST /comments', () => {
        beforeEach(() => {
            db('comments').insert(); 
        })
        it('should insert a issue into a db', () => {
            //insert one
            return request(server)
            .post('/comments')
            .send({
                comment_id: null,
                issue_id: 1
              })
        });
    });
    
    describe('get /comments/:id', () => {
        it('returns 200 ok', () => {
            return request(server)
            .get('/comments/1')
            .then(res => {
                expect(res.status).toBe(200);
            })
        });
    })
});

describe('School routes', () => {
    beforeEach(() => {
        db('schools').insert(); 
    })

    describe('Post new schools', () => {
        it('should insert a issue into a db', () => {
            //insert one
            return request(server)
            .post('/schools')
            .send({
                school_name: "test name",
                location: "test location"
            })
            .then(res=>{
                expect(res.status).toBe(201)
            })
        });
    });

    describe('PUT school request', () => {
        it('should update a school', () => {            
            return request(server)
            .put("/schools/4")
            .send(
                {school_name: 'testing'}
            )
            .then(res => {
                expect(res.status).toBe(200);
            })
        });
    });

    describe("DELETE school request", ()=>{
        it("can't delete school by ID if it does not exist", ()=>{
            return request(server)
            .delete("/schools/2")
            .then(res=>{
                expect(res.status).toBe(404)
            })
        });
        it('should return JSON', done => {
            request(server).delete('/schools/2')
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                    done();
                })
        });
    });
});

describe('Admin routes', () => {
    describe('get /admins', () => {
        it('returns 404, admin does not exist', () => {
            return request(server)
            .get('/admins')
            .then(res => {
                expect(res.status).toBe(401);
            })
        });
    });

    describe('PUT issue request', () => {
        it('cannot update issue that does not exist', () => {            
            return request(server)
            .put("/admins/3")
            .send(
                {school_id: 1}
            )
            .then(res => {
                expect(res.status).toBe(401);
            })
        });
    });
});

describe('Board routes', () => {
    describe('get /boards', () => {
        it('returns 200 OK', () => {
            return request(server)
            .get('/boards')
            .then(res => {
                expect(res.status).toBe(200);
            })
        });
    });
    describe('get /boards:id', () => {
        it('returns 404 board member does not exist', () => {
            return request(server)
            .get('/boards/99')
            .then(res => {
                expect(res.status).toBe(404);
            })
        });
    });
})
