const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();

describe("If the variable is found in the current scope", function(){
    it("is returned", function(){
        function foo(){
            var a = 2;
            return a;
        };

        var result = foo();

        result.should.be.equal(2);
    });
});

describe("If the variable is not found in the current scope", function(){
    it("returns the variable in the outer scope", function(){
        var a = 3;
        function foo(){
            return a;
        };

        var result = foo();

        result.should.be.equal(3);
    });
});

describe("If an RHS look-up fails to find a variable", function(){
    it("throws a ReferenceError exception", function(){
        function foo(){
            var a = b;
        }

        should.Throw(() => foo(), ReferenceError);
        
    });
});

describe("A LHS look-up fails finding a variable",function(){
    context("we're not in strict mode", function(){
        it("is created in the global scope", function(){
            a = 4;
    
            a.should.be.equal(4);
        });
    });

    context("we're in strict mode", function(){
        it("throws a Referencerror exception", function(){
            function foo(){
                "use strict"
                aa = 4;
            }
            
            should.Throw(() => foo(), ReferenceError);
        });
    });
});

describe("An ilegal operation on a variable", function(){
    it("Throws a type error", function(){
        var a = true;
        
        should.Throw(() => a(), TypeError);
    })
})