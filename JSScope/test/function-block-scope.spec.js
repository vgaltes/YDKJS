const mocha = require("mocha");
const chai = require("chai");
const should = chai.should();

describe("When enclosing functions and variables inside a function", function(){
    it("hides those variables and functions", function(){
        function doSomething(a){
            function doSomethingElse(a){
                return a - 1;
            }

            b = a + doSomethingElse(a * 2);

            var b;

            return b;
        };

        var result = doSomething(2);

        result.should.be.equal(5);
        (typeof doSomethingElse).should.equal('undefined');
    });
});


describe("IIFE", function(){
    it("create it's own scope", function(){
        var a = 2;
        var result = (function (){
            var a = 3;
            return a;
        })();

        a.should.be.equal(2);
        result.should.be.equal(3);
    });

    it("is a good practice to name them", function(){
        var a = 2;
        var result = (function foo(){
            var a = 3;
            return a;
        })();

        a.should.be.equal(2);
        result.should.be.equal(3);
    });

    it("can be declared is a slightly different way", function(){
        var a = 2;
        var result = (function foo(){
            var a = 3;
            return a;
        }()); // note the brackets inside the brackets

        a.should.be.equal(2);
        result.should.be.equal(3);
    });

    it("can receive parameters", function(){
        var a = 2;
        var c = 4;
        var result = (function foo(b){
            var a = 3;
            return a + b;
        })(c);

        a.should.be.equal(2);
        result.should.be.equal(7);
    });

    it("can make sure that undefined is really undefined", function(){
        undefined = "not undefined!"; // VERY bad things can happens if you do something like this
        var result = (function IIFE(undefined){
            var a;
            if(a === undefined){
                return "OK";
            }
            return "NOT OK";
        })();

        result.should.be.equal("OK");
    });

    it("can pass the function to execute second, after the invocation and the parameters to pass to it", function(){
        var globalMock = {};
        globalMock.a = 22;

        var result = (function IIFE(def){
            return def(globalMock);
        })(function def(globalScope){
            var a = 3;
            console.log(globalScope);
            return [a, globalScope.a];
        });

        console.log(result);

        result.should.deep.equal([3, 22]);
    });
});

describe("A Catch", function(){
    it("Creates a block scope", function(){
        function foo(){
            try{
                var a = true;
                a();
            } catch(err){

            }
            
            console.log(err);
        }

        should.Throw(() => foo(), ReferenceError);
    });
});

describe("Let", function(){
    it("attaches the variable declaration to the scope of whatever block it's contained in", function(){
        function foo(){
            {
                let letVar = 5;
            }
            console.log(letVar);
        }
        
        should.Throw(() => foo(), ReferenceError);
    });
    it("does not hoist", function(){
        function foo(){
            console.log(letVar);
            let letVar = 5;
        }

        should.Throw(() => foo(), ReferenceError);
    });
});
