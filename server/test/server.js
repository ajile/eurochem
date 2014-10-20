var app = require('../app');
var request = require('supertest');

describe('app', function () {
    beforeEach(function(){
        app.listen(app.get('port'), function() {});
    });

    it('should have index page (GET /)', function(done){
        request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200, done);
    });

    it('should have 404 code status for not exists urls', function(done){
        request(app)
        .head('/the-page-is-doesnt-exists')
        .expect(404, '', done);
    });

    it('should serve static files', function(done){
        request(app)
        .get('/static/test.txt')
        .expect(200, '', done);
    });

    it('should be RESTful (GET /rowsets/)', function(done){
        request(app)
        .get('/rowsets/')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});
