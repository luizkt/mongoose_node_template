const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos =[{
    _id: new ObjectID(),
    text: 'First todo text'
},{
    _id: new ObjectID(),
    text: 'Second todo text'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo next';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(text);
            })
            .end((error, response) => {
                if (error) {
                    return done(error);
                }

                Todo.find({text}).then((todos) =>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should not create a new todo', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((error, response) => {
                if (error) {
                    return done(error);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => done(err));
            });
    });
});

describe('GET /todos', () => {
    it('should get all documents', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((response) => {
                expect(response.body.todos.length).toBe(2);
                // expect(response.body[0].text).toBe('First todo text');
                // expect(response.body[1].text).toBe('Second todo text');
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo document', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((response) => {
                expect(response.body.todo.text).toBe(todos[0].text)
            })
            .end(done);
    });

    it('should return 404 if to do not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .expect((response) => {
                expect(response.body.todo).toBe(undefined)
            })
            .end(done);
    });

    it('should return 404 for non-ObjectID', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .expect((response) => {
                expect(response.body.todo).toBe(undefined)
            })
            .end(done);
    });
})