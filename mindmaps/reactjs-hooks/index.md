---
title: Understanding Next.js  
markmap: 
  colorFreezeLevel: 2 
  collapsed: false
  nodeMinHeight: 30
  # maxWidth: 300
  initialExpandLevel: 2
---

## React.js 𝐇𝐨𝐨𝐤𝐬 <br/>(𝐅𝐮𝐧𝐜𝐭𝐢𝐨𝐧𝐚𝐥 𝐂𝐨𝐦𝐩𝐨𝐧𝐞𝐧𝐭𝐬)
- useState
  - allows you to add state to a functional component 
  - It takes an initial value as an argument and returns an array with two elements: <br/>the current state value and a function to update it.
  - Syntex:
    ```js
    const [count, setCount] = useState(0);
    setCount(count + 1);  
    ``` 
  - Example :
    ```js 
    import React, { useState } from 'react';
    const Counter = () => {
      const [count, setCount] = useState(0);

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
          <button onClick={() => setCount(count - 1)}>Decrement</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>
      );
    };

    export default Counter;
    ```

- useEffect
  - allows you to perform side effects in a functional component.<br/> Side effects include things like fetching data from an API, updating the DOM,<br/> or subscribing to an event.
  - The useEffect dependency array in React controls when the effect runs.
    - No Dependency Array: The effect runs after every render.
    - Empty Dependency Array ([]): The effect runs only once, after the initial render.
    - With Dependencies ([dep1, dep2]): The effect runs after the initial render and then only when one of the listed dependencies changes.
  - Examples: 
    - Example1: 
      - ```js 
        import React, { useState, useEffect } from 'react';

        function DataFetcher() {
          const [data, setData] = useState([]);

          useEffect(() => {
            fetch('https://api.example.com/data')
              .then(response => response.json())
              .then(data => setData(data));
          }, []);

          return (
            <ul>
              {data.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          );
        }
        ```
    - Example2:
      - ```js 
        import React, { useState, useEffect } from 'react';

        function ExampleComponent() {
          const [count, setCount] = useState(0);
          useEffect(() => {
            console.log(`You clicked count times`);
            return () => {
              console.log('Cleanup on unmount or before next useEffect runs');
            };
          }, [count]); // Dependency array

          return (
            <div>
              <p>You clicked {count} times</p>
              <button onClick={() => setCount(count + 1)}>
                Click me
              </button>
            </div>
          );
        }

        export default ExampleComponent;
        ```
    - Example3: 
      - ```js 
        import { useEffect, useState } from "react";

        const PostComponent = () => {
          const [data, setData] = useState([]);
          
          useEffect(() => {
            const fetchData = async () => {
              const response = await fetch('https://jsonplaceholder.typicode.com/posts')
              const data = await response.json()
              setData(data); 
            }
            fetchData()
          }, [])

          return (
            <>
              <h2>Post component</h2>
              <ul>
              {
                data.map((item) => {
                  return (
                    <li>
                      <h2>{item.title}</h2>
                      <p>{ item.body }</p>
                    </li>
                  )
                })
              }
              </ul>
            </>
          )
        }

        const App = () => {
          return (
            <>
              <h2>Testing useEffect</h2>
              <PostComponent/> 
            </>
          )
        }
        export default App; 
        ```
- useContext
  - allows you to access a context object in a functional component. 
  - Context is a way to pass data down the component tree <br/>without having to pass props manually.
  - Examples : 
    - Example 1:
      - ```js
        import React, { useContext } from 'react';

        const ThemeContext = React.createContext('light');

        function ThemeButton() {
          const theme = useContext(ThemeContext);

          return (
            <button style={{ background: theme === 'dark' ? 'black' : 'white', color: theme === 'dark' ? 'white' : 'black' }}>
              Toggle Theme
            </button>
          );
        } 
        ```
    - Example 2: 
      - ThemeProvider
        - ```js
          import React, { createContext, useState } from 'react';

          // Create Context
          const ThemeContext = createContext();

          // Provider Component
          const ThemeProvider = ({ children }) => {
            const [theme, setTheme] = useState('light');

            const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

            return (
              <ThemeContext.Provider value={{ theme, toggleTheme }}>
                {children}
              </ThemeContext.Provider>
            );
          };

          export { ThemeProvider, ThemeContext }; 
          ```
      - ThemeSwitcher
        - ```js
          import React, { useContext } from 'react';
          import { ThemeContext } from './ThemeProvider';

          const ThemeSwitcher = () => {
            const { theme, toggleTheme } = useContext(ThemeContext);

            return (
              <div>
                <p>Current Theme: {theme}</p>
                <button onClick={toggleTheme}>Toggle Theme</button>
              </div>
            );
          };

          export default ThemeSwitcher; 
          ```
      - App 
        - ```js 
          import React from 'react';
          import ReactDOM from 'react-dom';
          import { ThemeProvider } from './ThemeProvider';
          import ThemeSwitcher from './ThemeSwitcher';

          const App = () => (
            <ThemeProvider>
              <ThemeSwitcher />
            </ThemeProvider>
          );

          ReactDOM.render(<App />, document.getElementById('root')); 
          ```

    - Example 3: 
      - LanguageProvider
        ```js
        import React, { createContext, useState } from 'react';

        // Create Language Context
        const LanguageContext = createContext();

        // Language Provider Component
        const LanguageProvider = ({ children }) => {
          const [language, setLanguage] = useState('en');

          const changeLanguage = (lang) => setLanguage(lang);

          return (
            <LanguageContext.Provider value={{ language, changeLanguage }}>
              {children}
            </LanguageContext.Provider>
          );
        };

        export { LanguageProvider, LanguageContext }; 
        ```
      - LanguageSwitcher
        - ```js
          import React, { useContext } from 'react';
          import { LanguageContext } from './LanguageProvider';

          const LanguageSwitcher = () => {
            const { language, changeLanguage } = useContext(LanguageContext);

            const handleLanguageChange = (event) => {
              changeLanguage(event.target.value);
            };

            return (
              <div>
                <p>Current Language: {language === 'en' ? 'English' : 'Spanish'}</p>
                <select onChange={handleLanguageChange} value={language}>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                </select>
              </div>
            );
          };
          ```
      - App 
        - ```js
          import React from 'react';
          import ReactDOM from 'react-dom';
          import { LanguageProvider } from './LanguageProvider';
          import LanguageSwitcher from './LanguageSwitcher';

          const App = () => (
            <LanguageProvider>
              <LanguageSwitcher />
              {/* Other components can also consume the language context */}
            </LanguageProvider>
          );

          ReactDOM.render(<App />, document.getElementById('root')); 
          ```
      - Greeting
        - ```js
          const translations = {
            en: {
              greeting: 'Hello',
            },
            es: {
              greeting: 'Hola',
            },
          };

          const Greeting = () => {
            const { language } = useContext(LanguageContext);
            return <p>{translations[language].greeting}</p>;
          }; 
          ```
      - App 1
        - ```js
          const App = () => (
            <LanguageProvider>
              <LanguageSwitcher />
              <Greeting />
            </LanguageProvider>
          );  
          ```
    - Example 4: 
      - ThemeProvider
        - ```js
          import React, { createContext, useState } from 'react';

          // Create Theme Context
          const ThemeContext = createContext();

          // Theme Provider Component
          const ThemeProvider = ({ children }) => {
            const [theme, setTheme] = useState('light');

            const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

            return (
              <ThemeContext.Provider value={{ theme, toggleTheme }}>
                {children}
              </ThemeContext.Provider>
            );
          };

          export { ThemeProvider, ThemeContext }; 
          ```
      - LanguageProvider
        - ```js
          import React, { createContext, useState } from 'react';

          // Create Language Context
          const LanguageContext = createContext();

          // Language Provider Component
          const LanguageProvider = ({ children }) => {
            const [language, setLanguage] = useState('en');

            const changeLanguage = (lang) => setLanguage(lang);

            return (
              <LanguageContext.Provider value={{ language, changeLanguage }}>
                {children}
              </LanguageContext.Provider>
            );
          };

          export { LanguageProvider, LanguageContext }; 
          ```
      - Combined Provider Component:
        - ```js
          import React from 'react';
          import { ThemeProvider } from './ThemeProvider';
          import { LanguageProvider } from './LanguageProvider';

          const AppProviders = ({ children }) => {
            return (
              <ThemeProvider>
                <LanguageProvider>
                  {children}
                </LanguageProvider>
              </ThemeProvider>
            );
          };

          export default AppProviders; 
          ```
      - App 
        - ```js
          import React from 'react';
          import ReactDOM from 'react-dom';
          import AppProviders from './AppProviders';
          import LanguageSwitcher from './LanguageSwitcher';
          import ThemeSwitcher from './ThemeSwitcher';
          import Greeting from './Greeting'; // Optional component to display translations

          const App = () => (
            <AppProviders>
              <LanguageSwitcher />
              <ThemeSwitcher />
              <Greeting />
              {/* Other components that need access to the language or theme contexts */}
            </AppProviders>
          );

          ReactDOM.render(<App />, document.getElementById('root'));
          ```
      - Consume Both Contexts in a Component
        - ```js
          import React, { useContext } from 'react';
          import { LanguageContext } from './LanguageProvider';
          import { ThemeContext } from './ThemeProvider';

          const CombinedComponent = () => {
            const { language, changeLanguage } = useContext(LanguageContext);
            const { theme, toggleTheme } = useContext(ThemeContext);

            return (
              <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
                <p>Current Language: {language === 'en' ? 'English' : 'Spanish'}</p>
                <button onClick={() => changeLanguage(language === 'en' ? 'es' : 'en')}>Switch Language</button>
                <button onClick={toggleTheme}>Toggle Theme</button>
              </div>
            );
          };

          export default CombinedComponent; 

          ```

- useReducer
  - allows you to manage complex state in a functional component.<br/> It’s similar to the useState hook, <br/>but instead of a simple value, <br/>it takes a reducer function and an initial state.
  - Syntex :

    ```js 
    const [state, dispatch] = useReducer(
      (state, action) => {
        switch (action.type) {
          case 'increment':
            return { count: state.count + 1 };
          case 'decrement':
            return { count: state.count - 1 };
          default:
            return state;
        }
      },
      { count: 0 }
    ); 
    dispatch({ type: 'increment' });
    ```
  - Examples: 
    - Example 1:
      - Example 1:
          ```js 
          import React, { useReducer } from 'react';

          function cartReducer(state, action) {
            switch (action.type) {
              case 'add':
                return [...state, action.payload];
              case 'remove':
                return state.filter(item => item.id !== action.payload.id);
              default:
                return state;
            }
          }

          function ShoppingCart() {
            const [cart, dispatch] = useReducer(cartReducer, []);

            const addItem = (item) => {
              dispatch({ type: 'add', payload: item });
            }

            const removeItem = (item) => {
              dispatch({ type: 'remove', payload: item });
            }

            return (
              <div>
                <h2>Shopping Cart</h2>
                <ul>
                  {cart.map(item => (
                    <li key={item.id}>
                      {item.name} - ${item.price}
                      <button onClick={() => removeItem(item)}>Remove</button>
                    </li>
                  ))}
                </ul>
                <button onClick={() => addItem({ id: 1, name: 'Item 1', price: 9.99 })}>Add Item</button>
              </div>
            );
          }
          ```
    - Example 2: 
      - Example 2:
          ```js 
          import { useReducer } from "react";
          import ReactDOM from "react-dom/client";

          const initialTodos = [
            {
              id: 1,
              title: "Todo 1",
              complete: false,
            },
            {
              id: 2,
              title: "Todo 2",
              complete: false,
            },
          ];

          const reducer = (state, action) => {
            switch (action.type) {
              case "COMPLETE":
                return state.map((todo) => {
                  if (todo.id === action.id) {
                    return { ...todo, complete: !todo.complete };
                  } else {
                    return todo;
                  }
                });
              default:
                return state;
            }
          };

          function Todos() {
            const [todos, dispatch] = useReducer(reducer, initialTodos);

            const handleComplete = (todo) => {
              dispatch({ type: "COMPLETE", id: todo.id });
            };

            return (
              <>
                {todos.map((todo) => (
                  <div key={todo.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={todo.complete}
                        onChange={() => handleComplete(todo)}
                      />
                      {todo.title}
                    </label>
                  </div>
                ))}
              </>
            );
          }

          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(<Todos />);
          ```
    - Example 3:
      - Example 3:
          ```js 
          import React, { useReducer } from 'react';
          const reducer = (state, action) => {
            switch (action.type) {
              case 'increment':
                return { count: state.count + 1 };
              case 'decrement':
                return { count: state.count - 1 };
              case 'reset':
                return { count: 0 };
              default:
                throw new Error('Unknown action type');
            }
          };

          import React, { useReducer } from 'react';
          const Counter = () => {
            const initialState = { count: 0 };
            const [state, dispatch] = useReducer(reducer, initialState);

            return (
              <div>
                <p>Count: {state.count}</p>
                <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
                <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
                <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
              </div>
            );
          };

          export default Counter; 
          ```

- useCallback
  - Similar to useMemo, <br/>can also use this hook to optimise performance. 
  - memoizes a callback function and returns it. 
  - memoizes the function itself, not its return value. 
  - caches the functions return value <br/>so that the function need not execute again. 
  - caches the function definition or the function reference.
  - Examples: 
    - Example with without using callback:
      - Example : 
        ```js 
        import React, {useCallback, useState} from "react";
        const App = () => {
          const [count, setCount] = useState(0);
          const [value, setValue] = useState("");

          const handleClick = () => {
            setValue("Hello");
          };

          return (
            <div className="App">
              <button onClick={() => setCount(count + 1)}>Increment Count</button>
              <p>Count: {count}</p>
              <p>Value: {value}</p>
              <SlowComponent handleClick={handleClick} />
            </div>
          );
        };

        const SlowComponent = React.memo(({ handleClick, value }) => {
          
          // Intentially making the component slow
          for (let i = 0; i < 100000000; i++) {}
          console.log("re-render slowcomponent...")
          
          return (
            <div>
              <h1>Slow Component</h1>
              <button onClick={handleClick}>Click Me</button>
              
            </div>
          );
        });
        export default App; 
        ``` 
      - Above code, I have a SlowComponent as the child of the App component. <br/>When a parent component renders, <br/>all of its child components render, <br/>regardless of whether anything has changed inside them.

      - To avoid unnecessary renders of the child components, <br/>we generally use the React.memo function. <br/>This basically caches the component <br/>and only re-renders it if its props have changed.

      - Now, when you click on 'Increment Count', <br/>it still takes a long time to render, <br/>because SlowComponent re-renders on state change. <br/>But why is that? We're not changing any of its props.
    
    - Example using callback
      - Example : 
          ```js 
          import React, {useCallback, useState} from "react";
          const App = () => {
            const [count, setCount] = useState(0);
            const [value, setValue] = useState("");

            // const handleClick = () => {
            //   setValue("Hello");
            // };
            const handleClick = useCallback(() => {
              setValue("Hello");
            }, [value, setValue]);

            return (
              <div className="App">
                <button onClick={() => setCount(count + 1)}>Increment Count</button>
                <p>Count: {count}</p>
                <p>Value: {value}</p>
                <SlowComponent handleClick={handleClick} />
              </div>
            );
          };

          const SlowComponent = React.memo(({ handleClick, value }) => {
            
            // Intentially making the component slow
            for (let i = 0; i < 100000000; i++) {}
            console.log("render slowcomponent")
            
            return (
              <div>
                <h1>Slow Component</h1>
                <button onClick={handleClick}>Click Me</button>
                
              </div>
            );
          });
          export default App; 
          ```

      - In above example, <br/>I have wrapped the function inside a useCallback and passed two dependencies <br/>that are involved with this function.

      - Now, when you click on 'Increment Count', <br/>the rendering is much faster. This is because the handleClick reference is cached <br/>between renders and hence, SlowComponent does not re-render.

- useMemo
  - Used to memoize the result of a function (a computed value) <br/>or expensive calculations within a functional component.
  - This means that useMemo will recompute the memoized value <br/>only when its dependencies change.
  - Memoizes a calculation or the result of a function, <br/>so that the calculation only runs when dependencies change. 
  - avoid re-computation of expensive operations on every render
  - Examples : 
    - Example without use useMemo 
      - ```js
        import { useState } from "react";

        const calculate = () => {
          console.log('calculate...'); 
          let result = 0;
          for (let i = 0; i < 1000000000; i++) {
            result += i;
          }
          return result;
        }

        const App = () =>  {
          const [count, setCount] = useState(0);

          const value = calculate();

          return (
            <div className="App">
              <button onClick={() => setCount(count + 1)}>Increment Count</button>
              <p>Count: {count}</p>
            </div>
          );
        }
        export default App; 
        ```
    - Example with useMemo 
      - ```js
        import { useMemo, useState } from "react";

        const calculate = () => {
          console.log('calculate...'); 
          let result = 0;
          for (let i = 0; i < 1000000000; i++) {
            result += i;
          }
          return result;
        }

        const App = () =>  {
          const [count, setCount] = useState(0);
          const [dependentCount, setDependentCount] = useState(10);

          //const value = calculate();
          const value = useMemo(calculate, [dependentCount]);

          return (
            <div className="App">
              <button onClick={() => setCount(count + 1)}>Increment Count</button>
              <p>Count: {count}</p>

              <hr/>
              <button onClick={() => setDependentCount(dependentCount + 1)}>
                Increment Dependent Count
              </button>
              <p>Dependent Count: {dependentCount}</p>

              
            </div>
          );
        }
        export default App;  
        ```
- useRef
  - allows you to create a mutable ref object that persists for the lifetime of the component.
  - use it to store and access values that don’t trigger a re-render
  - Examples: 
    - Example1: 
      - ```js
        import React, { useRef } from 'react';

        function InputWithFocus() {
          const inputRef = useRef();

          const handleClick = () => {
            inputRef.current.focus();
          }

          return (
            <div>
              <input type="text" ref={inputRef} />
              <button onClick={handleClick}>Focus Input</button>
            </div>
          );
        } 
        ```
    - Example2: 
      - ```js
        import React, {useRef} from "react"; 

        function RefUsage(){
          const inputRef = useRef(null);
          
          const onClick = () => {
            inputRef.current.value = ""; 
            inputRef.current.focus();
          }

          return (
            <div>
              <input type="text" placeholder="Ex..." ref={inputRef} />
              <button onClick={onClick}>Change name</button>
            </div>
          ); 
        }

        export default RefUsage; 
        ```
    - Example3: 
      - ```js
        import React, { useRef, useImperativeHandle, forwardRef } from 'react';
        const ChildComponent = forwardRef((props, ref) => {
          const [count, setCount] = useState(0);
          useImperativeHandle(ref, () => ({
            reset: () => setCount(0),
          }));
          return (
            <div>
              <button onClick={() => setCount(count + 1)}>Increment</button>
              <p>Count: {count}</p>
            </div>
          );
        });
        function App() {
          const childRef = useRef(null);
          const handleResetClick = () => {
            childRef.current.reset();
          };
          return (
            <div>
              <ChildComponent ref={childRef} />
              <button onClick={handleResetClick}>Reset Count</button>
            </div>
          );
        }
        export default App;
        ```
      - The useImperativeHandle is a bit more complex. 
      - This Hook is used when you want to pass <br/>specific functionality from a child component to a parent component. 
      - It may not be as used as useRef, <br/>but when you need it, it's a real lifesaver.
      - used useImperativeHandle to expose the reset function of the ChildComponent <br/>to App (the parent component). 
      - This is useful when the parent component needs <br/>to call a specific function that is encapsulated within the child component.


- useImperativeHandle
  - allows you to customize the instance value <br/> that is exposed to parent components when using ref. 
  - This can be useful when you need to provide a certain interface <br/>to parent components,
  - Examples: 
    - Example 1: 
      - ```js 
        import React, { useRef, useImperativeHandle } from 'react';

        const Input = React.forwardRef((props, ref) => {
          const inputRef = useRef();

          useImperativeHandle(ref, () => ({
            focus: () => {
              inputRef.current.focus();
            },
            value: inputRef.current.value
          }));

          return (
            <input
              type="text"
              ref={inputRef}
              placeholder={props.placeholder}
            />
          );
        });

        function App() {
          const inputRef = useRef();

          const handleClick = () => {
            inputRef.current.focus();
          };

          return (
            <div>
              <Input ref={inputRef} placeholder="Type here" />
              <button onClick={handleClick}>Focus input</button>
            </div>
          );
        }
        ```
    - Example 2: 
      - ```js 
        import React, { useImperativeHandle, useRef, forwardRef } from 'react';

        // Child component
        const ChildComponent = forwardRef((props, ref) => {
          const inputRef = useRef();

          // Expose a focus method to the parent component
          useImperativeHandle(ref, () => {
            return {
              focus: () => {
                inputRef.current.focus();
              },
              getValue: () => {
                return inputRef.current.value;
              }
            }
          })

          return <input ref={inputRef} placeholder="Type something..." />;
        });

        // Parent component
        function ParentComponent() {
          const childRef = useRef();

          const handleClick = () => {
            // Access the custom methods exposed by the child component
            childRef.current.focus();
            console.log('Input Value:', childRef.current.getValue());
          };

          return (
            <div>
              <ChildComponent ref={childRef} />
              <button onClick={handleClick}>Focus Input and Log Value</button>
            </div>
          );
        }

        export default ParentComponent;
        ```

- useLayoutEffect
  - is similar to useEffect, <br/>but it’s executed synchronously after all DOM mutations. 
  - This makes it useful for manipulating <br/>the DOM immediately after a component is rendered.
  - Examples: 
    - Example 1:
      - ```js 
        import React, { useState, useLayoutEffect, useRef } from 'react';

        function ResizableBox() {
          const [width, setWidth] = useState(100);
          const [height, setHeight] = useState(100);
          const boxRef = useRef(null);

          useLayoutEffect(() => {
            const handleResize = () => {
              setWidth(boxRef.current.clientWidth);
              setHeight(boxRef.current.clientHeight);
            };

            handleResize();

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
          }, []);

          return (
            <div ref={boxRef} style={{ width: '50%', height: '50%', backgroundColor: 'red' }}>
              <p>Width: {width}px</p>
              <p>Height: {height}px</p>
            </div>
          );
        }
        ```
    - Example 2: 
      - ```js 
        import React, { useState, useLayoutEffect } from "react"; 

        function ExampleComponent() {
          const [width, setWidth] = useState(0);

          useLayoutEffect(() => {
            const updateWidth = () => setWidth(window.innerWidth);
            updateWidth();
            window.addEventListener('resize', updateWidth);
            return () => window.removeEventListener('resize', updateWidth);
          }, []); 

          return (
            <div>
              <h1>Window Width: {width}px</h1>
            </div>
          );
        }

        export default ExampleComponent;
        ```
- React.memo() (props change)
  - Used to optimize functional components <br/>by memoizing the result of the component rendering.
  - This prevents a component from re-rendering <br/>if its props haven't changed. 
  - Wraps a functional component, <br/>and React will only re-render the component <br/>if its props change. It performs a shallow comparison of the props.
  - Examples:
    - Example 1: 
      - ```js
        const MyComponent = ({ count }) => {
          console.log("Rendering MyComponent");
          return <div>{count}</div>;
        };

        export default React.memo(MyComponent); 
        ``` 
    - Example 2: 
      - ```js 
        import React, { useState } from 'react';

        // Child component using React.memo
        const ChildComponent = React.memo(({ count }) => {
          console.log("Child Component Rendered");

          return <div>Count: {count}</div>;
        });
 
        const ParentComponent = () => {
          const [count, setCount] = useState(0);
          const [text, setText] = useState("");

          return (
            <div>
              <h1>React.memo Example</h1>
              <ChildComponent count={count} />
              <button onClick={() => setCount(count + 1)}>Increment Count</button>
              <input 
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Type something..." 
              />
            </div>
          );
        };

        export default ParentComponent;
        ```

- useDebugValue
  - allows you to display custom debugging information <br/>for custom hooks in the React DevTools

  - This can be useful for debugging hooks <br/>and understanding what's happening behind the scenes.
  - Examples: 
    - ```js
      import { useState, useEffect, useDebugValue } from 'react';

      function useFetch(url) {
        const [data, setData] = useState(null);

        useEffect(() => {
          fetch(url)
            .then(response => response.json())
            .then(data => setData(data));
        }, [url]);

        useDebugValue(data ? `Data loaded: ${data.length} items` : 'Loading...');

        return data;
      } 
      ```