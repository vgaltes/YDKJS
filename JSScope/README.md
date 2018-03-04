# Scope in Javascript

This is a summary of the excellent book "Scope and Closures by Kyle Simpson (O'Reilly). Copyright 2014 Kyle Simpson, 978-1-449-33558-8", which I recommend you to buy, read and study.

I've added some learning tests, concept which I first heard about it thanks to my friend [Javier Salinas](https://github.com/mustaine).

I hope you find this useful and, please submit pull requests to improve it.

## Scope basics

Javascript is a compiled language. The engine compiles the code just before executing it.

From a variable assignment `var a = 2` two different actions are taken from the Javascript engine's perspective:
 - The compiler declares a variable (if not previously declared) in the current scope.
 - The engine, when executing, looks up the variable in Scope and assigns to it, if found.

If a variable can't be found in the immediate scope, the engine continues looking for it in the next outer scope, continuing until is found or until the global scope has been reached.

If an RHS look-up(`Who's the source of the assignment?`) fails to find a variable, this results in a `ReferenceError` being thrown by the engine. If the engine is performing an LHS look-up (`Who's the target of the assigment?`) and fails to find the variable, if the program is not running in "strict mode" it will create a new variable in the global scope and hand it back to the engine. If running in "strict mode" it will throw a Reference Error.

If a variable is found for an RHS look-up but you try to do something with its value that is impossible, the Engine throws a TypeError exception. So:
 - ReferenceError: failed to find the variable
 - TypeError: illegal operation on the variable

## Lexical scope

Lexical scope is based on where variables and blocks are authored at write time.

Scope look-up stops once it finds the first match. The same identifier name can be specified at multiple layers of nested scop, which is called "shadowing" (the inner identifier shadows the outer identifier);

The lexical scope look-up process only applies to first-class identifiers, not to properties inside those objects.

Lexical scope can be cheated with `eval` and `with` but that's evil and we're not going to see any example here.

## Function vs Block Scope

In general, JavaScript has function-based scope.

You can hide variables and functions by enclosing them in the scope of a function.

Function expressions (the one inside a callback, for example) can be anonymous, but function declarations cannot omit the name. Anonymous functions have several drawbacks to consider:
 - Have no useful name to display in stack traces, making debugging more difficult.
 - It's hard (or even impossible) to refer to itself (for recursion, for example).
 - The code can be harder to understand

The best practice is to always name your function expressions.

```
setTimeout(function timeoutHandler(){
    // Do something
}, 1000);
```

It's possible (and can be useful) to invoke function expressions immediately. We do that by enclosing the function in brackets (thus converting the function into a function expression) and then executing them with the help of a couple of brackets.

```
var a = 2;
(function foo(){
    var a = 3;
    console.log(a); //3
})();

console.log(a); //2
```

### IIFE
IIFE -> Immediately Invoked Function Expression

It's also a good practice to name the IIFEs.

`(function(){...}())` is also a valid IIFE

You can pass parameters to a IIFE.

```
var a = 2;
(function IIFE(global){
    var a = 3;
    console.log(a); //3
    console.log(global.a); //2
})(window);
```

We can make sure that undefined is really undefined.

```
undefined = "not undefined!"; // VERY bad things can happens if you do something like this
(function IIFE(undefined){
    var a;
    if(a === undefined){
        console.log("Undefined is really undefined!");
    }
})();
```

The last variation is when you pass the function to execute second, after the invocation and parameters to pass to it.

```
var a = 2;
(function IIFE(def){
    def(window);
})(function def(global){
    var a = 3;
    console.log(a); // 3
    console.log(global.a); //2
});
```
 
On the surface, JavaScript has no facility for block scope. With some exceptions:
 - Try/catch: the variable declaration in the catch clause are block-scoped to the catch block.
 - Let: the let keyword attaches the variable declaration to the scope of whatever block it's contained in. Apart from that, declarations made with let will not hoist to the entire scope of the block they appear in.

Block scoping can help the garbage collector making clearer to the engine that it does not need to keep some code around.

Every attempt to change a const value results in an error.
