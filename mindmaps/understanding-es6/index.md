---
title: Understanding ES6
markmap: 
  colorFreezeLevel: 2 
  collapsed: false
  nodeMinHeight: 30
  # maxWidth: 300
  initialExpandLevel: 2
---

## What is ES6? 
- ES6 is a new standardized version of javascript <br/>that was released in 2015.
- also known as ECMAScript 2015. 
- has many new features that can help a developer understand <br/>and write code more efficiently. 
- With a lot of forward-thinking features (ES6) attached to it, <br/>JavaScript is an exciting language to program.
- is the basis for modern programming languages <br/>like Angular and ReactJs. 

## Features 
  - Default parameters
    - In `JavaScript`, the default value for function parameters is `undefined`.
    - It may be handy to set a different value instead.
    - This can be achieved with the help of default function parameters.
    - Examples 
      - Before ES6
        - ```js
            function add(num1, num2) {
              return num1+num2;
            }
            add (5,2); //returns 7
            add(3); //returns NaN as num2 is undefined 
          ```
      - With ES6 
        - ```js
            function add(num1, num2=10) {
              return num1+num2;
            }
            add (5,2) //returns 7
            add(3) //returns 13 as num2 has default value = 
          ```
        - ```js
            function getFullName(firstName, lastName, fullName=lastName+‘ ‘+lastName){
              return fullName;
            }
            getFullName(‘John’,‘Doe’); // returns John Doe
            getFullname(‘John’, ‘Doe’, ‘John Doe’); // returns John Doe 
          ```

  - Template literals (Template strings)
    - Known as Template strings in the previous editions of ES2015, <br/>Template literals allow embedded expressions, <br/>multi-line strings and string interpolation.
    - `My name is John`
    - Template literals are the string literals enclosed by the backtick 
    - can contain placeholders indicated by dollar sign curly braces
    - ```js
        let myName = 'John';
        let myRole = 'Software Developer';
        console.log(`My name is ${myName} and I am a ${myRole}.`); 
        // My name is John and I am a Software Developer
      ```
  - Tagged Templates
    - With tagged templates, we can parse template literals with a function.
    - ```js
        let myName = 'John';
        let myRole = 'Software Developer';

        function myTag(array, name, role) {
            let str0 = array[0]; // "My name is "
            let str1 = array[1]; // " and I am "
            // We can further manipulate str0, str1, name, and role here if needed
            return `${str0}${name}${str1}${role}`;
        }

        console.log(myTag`My name is ${myName} and I am ${myRole}`); 
        // Expected output: "My name is John and I am Software Developer"
      ```
- Destructuring assignment
  - allows reading values <br/>from an array or properties from an object, <br/>into distinct variables.
  - Destructuring 
    - array
      - ```js
          let myName, myRole;
          let array = ['John', 'Software Developer'];
          [myName, myRole] = array; //positional assignment occurs here
          console.log(myName, my Role); //John Software Developer
        ```
    - object
      - ```js
          let myName, myRole;
          let object = {
            myName:'John', 
            myRole:'Software Developer'
          };

          ({myName, myRole}=object);
          //properties (keys) are matched with the local variable names

          console.log(myName, myRole); 
          //John Software Developer
        ```
  - A variable can also be assigned a default value,  <br/>in case the value unpacked from an array is undefined
    - ```js
        let myName, myRole;
        let array = ['Toad'];
        [myName='John', myRole='Software Developer'] = array;
        console.log(myName, myRole); 
        //Toad Software Developer 
      ```
  - We can also ignore some values from the array
    - ```js 
          let myName, myRole;
          let array = ['John', 'Toad', 'Software Developer'];
          [myName, , myRole] = array;
          console.log(myName, myRole); //John Software Developer
      ```
- __Arrow function expressions__
  - Arrow function expressions is a new syntax <br/>to writing ordinary function expressions
  - With arrow function expressions we can ignore function <br/>and return with `one-liner` code
  - Ordinary function 
    - ```js
        function getName(firstName,lastName){
          return `${firstName} ${lastName}`;
        }
        console.log(getName('John','Doe');
      ```
  - Arrow function
    - ```js 
        let getName = ((firstName,lastName)=> `${firstName} ${lastName}`);
        console.log(getName('John', 'Doe'); 
      ```
    - ```js
        let getName = ((firstName, lastName) => {
          let myRole = 'Software Developer';
          return `My name is ${firstName} ${lastName} I am a ${myRole}.`;
        }); 
      ```
  - Both functions return the name “John Doe”.

- Let and const
  - __let__: Block-scoped, hoisted, mutable
    - Scope: Block-scoped, so accessible only within its block.
    - Hoisted: Yes, but not initialized (ReferenceError if accessed before declaration).
    - Mutable: Yes.
    - Exmaple 
      - ```js 
          function exampleLet() {
            // console.log(b); // ReferenceError: Cannot access 'b' before initialization
            let b = 10;
            if (true) {
              let b = 20;  // new variable in this block
              console.log(b); // 20
            }
            console.log(b); // 10 (original `b`, block-scoped)
          }

          exampleLet();
        ```
  - __const__: Block-scoped, hoisted, immutable
    - Scope: Block-scoped.
    - Hoisted: Yes, but not initialized (ReferenceError if accessed before declaration).
    - Immutable: Cannot be reassigned, but objects/arrays can be mutated.
    - Example 
      - ```js 
          function exampleConst() {
            // console.log(c); // ReferenceError: Cannot access 'c' before initialization
            const c = 30;
            console.log(c); // 30
            // c = 40; // Error: Assignment to constant variable

            // Note: If `c` is an object or array, we can still change its contents.
            const obj = { value: 50 };
            obj.value = 60; // Allowed
            console.log(obj); // { value: 60 }
          }

          exampleConst();
        ```
  - __var__: Function-scoped, hoisted, mutable
    - Scope: Accessible throughout the function.
    - Hoisted: Yes, but initialized as undefined.
    - Mutable: Yes.
    - Example 
      - ```js 
          function exampleVar() {
            console.log(a); // undefined (hoisted, but not assigned yet)
            var a = 10;     // hoisted
            if (true) {
              var a = 20;   // same variable, modifies outer `a`
              console.log(a); // 20
            }
            console.log(a); // 20 (function-scoped)
          }


          exampleVar();
        ```

- Spread and Rest (...)
  - In ES6, the rest and spread operators, <br/>both represented by `...`, 
  - allow for flexible handling of function parameters <br/>and array or object manipulation.

  - __Rest__ Operator `(...)`
    - The rest operator is used to gather <br/>a variable number of function arguments <br/>into an array or to collect remaining items in an array/object.
    - Example:
      - ```js 
          function add(...numbers) {
              return numbers.reduce((sum, num) => sum + num, 0);
          }
          console.log(add(1, 2, 3, 4)); // Output: 10
        ```
      - Here, `...numbers` collects all arguments into an array, <br/>which reduce can then process.

  - __Spread__ Operator `(...)`
    - The spread operator is used <br/>to expand elements in an array or object. <br/>It can "spread" an array into individual elements <br/>or merge objects and arrays.

    - Example:
      - ```js 
          const arr1 = [1, 2, 3];
          const arr2 = [4, 5, 6];
          const combinedArray = [...arr1, ...arr2];

          console.log(combinedArray); // Output: [1, 2, 3, 4, 5, 6]
        ```
    - Here, `...arr1` and `...arr2` expand the arrays into individual elements, <br/>allowing them to be combined into combinedArray.

    - In objects:
    - ```js 
        const obj1 = { a: 1, b: 2 };
        const obj2 = { b: 3, c: 4 };
        const mergedObj = { ...obj1, ...obj2 };

        console.log(mergedObj); // Output: { a: 1, b: 3, c: 4 }
      ```
    - In this case, `obj2` overwrites `b` in `obj1`.


- `Object.assign()` and `Object.is()`
  - Object.assign() method can be used to clone an object.
  - Example 
    - ```js
        let person = { height: ‘176’ };
        let clonePerson = Object.assign({}, person);
        console.log(clonePerson); // {height:‘176’}
      ```
  - Object.assign() can also be used to merge objects.
  - Example 
    -  ```js
        let person = {height:‘176’};
        let employee = {id:‘#1237’, name:‘John’};
        let myEmp = Object.assign({}, person, employee);
        console.log(myEmp); //{height:‘176’,id:‘#1237’, name:‘John’} 
      ```

- Classes
  - Classes are a template for creating objects.
  - ```js
      Class Person{
        constructor(name, age){
          this.name = name;
          this.age = age;
        }
      }
      let p = new Person(‘John’,28);
    ```
  - ```js
      Class Person {
          Name=’John’;
          getName(){
            return this.name;//returns John
          }
      }
      let p = new Person();
      console.log(p.getName()); //prints John
    ```