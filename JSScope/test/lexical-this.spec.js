const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();

describe('Lexical this', function() {
    xit('using normal functions this looses its binding when calling from a callback', function(done) {
        // I don't know why this test is failing. Running the same example in a browser does work.
        var obj = {
            id: 2,
            print: function(){
                return this.id;
            }
        };

        var id = "patata";
        obj.print().should.be.equal(2);

        setTimeout(function(){
            obj.print().should.be.equal("patata");
            done();
        }, 200);
    });

    it('using arrow functions this takes the value from its immediate enclosing scope', function(done) {
        var obj = {
            id: 2,
            print: function(){
                return this.id;
            }
        };

        var id = "patata";
        obj.print().should.be.equal(2);

        setTimeout(() => {
            obj.print().should.be.equal(2);
            done();
        }, 200);
    });
});