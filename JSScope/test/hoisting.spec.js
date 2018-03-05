const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();

describe('Hoisting', () => {
    it('variable declarations are hoisted', () => {
        ha = 3;
        var ha;

        ha.should.be.equal(3);
    });
    it('function declarations are hoisted', () => {
        foo();

        function foo(){
            return 3;
        }

        var result = foo();

        result.should.be.equal(3);
    });
    it('function expressions are not hoisted', () => {
        function foo(){
            return bar();

            var bar = function(){
                return 3;
            }
        };

        should.Throw(() => foo(), TypeError); // It founds the variable, but it doesn't know is a function.
    });
    it('functions are hoisted first, then variables', () => {
        foo = 2;
        var foo;
        function foo(){
            return 3;
        }

        foo.should.be.equal(2); 
    });
    
});
