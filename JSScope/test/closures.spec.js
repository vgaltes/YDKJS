describe('Closure', () => {
    it('Is when a function is able to remember and access its lexical scope even when is executing outside its lexical scope', () => {
        function foo(){
            var a = 2;
            
            function bar() {
                return a;
            }

            return bar;
        }

        var baz = foo();

        var result = baz();

        result.should.be.equal(2);
    });

    it('loop with var will be able to access the variable but the value will be the exit value of the loop', function(done) {
        var result = [];
        
        for(var i=1; i<=5; i++){
            setTimeout(function(){
                result.push(i);
            }, 20);
        }
        setTimeout(function(){
            result.should.be.deep.equal([6,6,6,6,6]); // the variable is accessible in the scope of the test (for block doesn't define scope)
            done();
        }, 300)
    });

    it('loop with IIFE will output the correct values', function(done) {
        var result = [];
        
        for(var i=1; i<=5; i++){
            (function foo(j){
                setTimeout(function(){
                    result.push(j); // J is only accessible in this scope and then, the value is not modified
                }, 20);
            })(i);
        }
        setTimeout(function(){
            result.should.be.deep.equal([1,2,3,4,5]); // the variable is accessible in the scope of the test (for block doesn't define scope)
            done();
        }, 300)
    });

    it('loop with let will output the correct values', function(done) {
        var result = [];
        
        for(let i=1; i<=5; i++){
            setTimeout(function(){
                result.push(i); // let creates a per-iteration scope
            }, 20);
        }
        setTimeout(function(){
            result.should.be.deep.equal([1,2,3,4,5]); // the variable is accessible in the scope of the test (for block doesn't define scope)
            done();
        }, 300)
    });
});

describe('Modules', () => {
    it('is a function that returns and object with references to its internal functions', () => {
        function MyModule(){
            var a = 2;
            var b = ['a','b','c'];

            function getA(){
                return a;
            }

            function getB(){
                return b.join("-");
            }

            return {
                getA,
                getB
            }
        };

        var myModule = MyModule();
        myModule.getA().should.be.equal(2);
        myModule.getB().should.be.equal("a-b-c");
    });

    it('can be an IIFE', () => {
        var myModule = (function MyModule(){
            var a = 2;
            var b = ['a','b','c'];

            function getA(){
                return a;
            }

            function getB(){
                return b.join("-");
            }

            return {
                getA,
                getB
            }
        })();

        myModule.getA().should.be.equal(2);
        myModule.getB().should.be.equal("a-b-c");
    });

    it('if we name the object we return, we can modify the module from the inside', () => {
        var myModule = (function MyModule(){
            var a = 2;
            var b = ['a','b','c'];

            function getA(){
                return a;
            }

            function getB(){
                return b.join("-");
            }

            function change(){
                publicApi.getB = getA;
            }

            var publicApi = {
                getB,
                change
            }

            return publicApi;
        })();

        myModule.getB().should.be.equal("a-b-c");
        myModule.change();
        myModule.getB().should.be.equal(2);
    });
});