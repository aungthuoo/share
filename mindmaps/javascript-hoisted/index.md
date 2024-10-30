---
title: JavaScript Hoisted
markmap: 
  colorFreezeLevel: 2 
  collapsed: false
  nodeMinHeight: 30
  # maxWidth: 300
  initialExpandLevel: 2
---

## What is JavaScript Hoisted?
- 
  `hoisting` helps in <ins>predicting the behavior of your code<br/> and avoiding potential bugs related to variable <br/>and function declarations.</ins>

- Hoisting in JavaScript is a behavior <br/>where variables and function declarations are moved to the top of <br/>their containing scope<br/> during the compilation phase, before the code is executed. 

- you can use functions and variables<br/>before they are declared in your code
  
## Using hoisted <br/>in variables and functions 
- Variable Hoisting
  - `var` are hoisted to the top of their scope, <br/>but their initialization is not hoisted.
  - the variable is moved to the top of the scope, <br/>but it is initialized with undefined <br/>until the line of code where the variable is assigned a value is reached
  - Example 

    -   ```javascript
          console.log(x); // Output: undefined
          var x = 5;
          console.log(x); // Output: 5
        ```
    -  `var x;` is hoisted to the top, so the code behaves like:

        ```javascript
          var x;
          console.log(x); // Output: undefined
          x = 5;
          console.log(x); // Output: 5
        ```

- Function Hoisting
  - Function declarations are fully hoisted, <br/>meaning that both the function name and its implementation <br/>are moved to the top of the scope. <br/>This allows you to call the function before its declaration in the code.
  - Example:
    -  ```javascript
        hoistedFunction(); // Output: "This function has been hoisted!"

        function hoistedFunction() {
            console.log("This function has been hoisted!");
        }
      ```
- `Let` and `Const` Hoisting
  - Variables declared with `let` and `const` <br/>are also hoisted but in a different way. 
  - They are hoisted to the top of their block scope <br/>but are not initialized. 
  - This means they are in a "temporal dead zone" `(TDZ)` <br/>from the start of the block until the declaration is encountered in the code. 
  - Accessing them before their declaration results in a ReferenceError.
  - Example :
    -  ```javascript
        console.log(y); // ReferenceError: Cannot access 'y' before initialization
        let y = 10;
        console.log(y); // Output: 10
      ```


