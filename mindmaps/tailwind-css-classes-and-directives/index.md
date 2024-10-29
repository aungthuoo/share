---
title: Tailwind CSS classes and directives 
markmap: 
  colorFreezeLevel: 2 
  collapsed: false
  nodeMinHeight: 30
  # maxWidth: 300
  initialExpandLevel: 3
---
## Tailwind CSS classes and directives
- provides a comprehensive set of utility classes and directives
- These classes are categorized into several groups
## Layout

- ```css 
    container //Centers the content with responsive padding.
    box-border, .box-content //Sets the box-sizing property.
    block, inline-block, inline //Controls element display type.
  ```
- Example 
  - 
      <div class="container mx-auto">
        <div class="block p-4 bg-white">Content</div>
      </div>
    
## Flexbox and grid

- ```css
    flex, inline-flex //Enables flexbox on an element.
    flex-row, flex-col //Sets the flex direction.
    grid, inline-grid //Enables grid layout on an element.
  ```
- Example 
  - 
      <div class="flex flex-col items-center">
        <div class="flex-1 bg-blue-500">Item 1</div>  
        <div class="flex-1 bg-green-500">Item 2</div>
      </div>
    
## Spacing
- ```css
    m-4, p-4 //Sets margin and padding.
    mx-auto //Horizontally centers an element with auto margins.
    space-x-4, space-y-4 //Adds space between child elements.
  ```
- Example 
  - 
      <div class="p-4">
        <div class="m-4 bg-red-500">Content</div> 
      </div> 
    
## Sizing
- ```css 
    w-1/2, h-1/4 //Sets width and height as fractions.
    w-full, h-screen //Sets width and height to full size.
  ```
- Example 
  - 
      <div class="w-1/2 bg-yellow-500 h-1/4">Content</div> 
    
## Typography
- ```css 
    text-lg, text-2xl //Sets font size.
    font-bold, italic //Sets font weight and style.
    text-center, text-left //Sets text alignment.
  ```
- Example 
  - 
      <p class="text-lg font-bold text-center">Hello World</p>
    
## Background and border
- ```css 
    bg-blue-500, bg-red-200 //Sets background color.
    border, border-2 //Sets border width.
    rounded, rounded-lg //Sets border radius.
  ```
- Example 
  - 
      <div class="bg-blue-500 border border-2 border-red-500 rounded-lg">Content</div >
    
## Responsive design with Tailwind CSS
- includes built-in responsive design utilities 
-  that allow you to apply styles at specific breakpoints
- ```css 
    sm (640px)
    md (768px)
    lg (1024px)
    xl (1280px)
    2xl (1536px)
  ```
- Example 
  - 
      <div class="bg-red-500 sm:bg-green-500 md:bg-blue-500 lg:bg-yellow-500 xl:bg-pu rple-500">
        Responsive Content
      </div>
    
## Responsive flexbox
- This layout stacks the items vertically on small screens
- arranges them in a row on medium and larger screens
- Example 
  - 
      <div class="flex flex-col md:flex-row">
        <div class="flex-1 bg-red-500">Item 1</div>
        <div class="flex-1 bg-green-500">Item 2</div>
      </div>
    
## Customizing Tailwind CSS
- Extending the theme
  - You can add custom colors, spacing, fonts, and more.
  - Examle 
    - ```css
        module.exports = {
          theme: {
          extend: {
            colors: {
                primary: "#1DA1F2",
                secondary: "#14171A",
            },
            spacing: {
                "128": "32rem",
            },
            fontFamily: {
                sans: ["Graphik", "sans-serif"],
            },
          },
          },
          variants: {},
          plugins: [],
        };
      ```
- Customizing breakpoints
  - You can define your breakpoints if the defaults don’t fit your needs.
  - Example 
    - ```css
        module.exports = {
          theme: {
          screens: {
            xs: "480px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
          },
          },
        };
      ```
- Adding plugins
  - Plugins are used to add additional functionalities to Tailwind CSS
  - Example 
    - ```css
        const forms = require('@tailwindcss/forms');
        module.exports = {
          theme: {
          extend: {},
          },
          plugins: [forms],
        };
      ```
- Using `@apply` directive
  - allows you to compose utility classes in your CSS files
  - Example 
    - ```css
        .btn {
          @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
        }
      ```
- Creating components with Tailwind CSS
  - A navigation bar is a crucial component of many web apps
  - allowing users to navigate through different sections of the site.
  - Example 
    - 
        <nav class="bg-white shadow-md">
          <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex">
                  <a href="#" class="flex items-center flex-shrink-0">
                    <img class="w-8 h-8" src="logo.svg" alt="Logo">
                  </a>
                  <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <a href="#" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-indigo-500 b order-b-2">Home</a>
                    <a href="#" class="inline-flex px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 item s-center">About</a> 
                    <a href="#" class="inline-flex px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 item s-center">Services </a>
                    <a href="#" class="inline-flex px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 item s-center">Contact</ a>
                    </div>
              </div>
              </div>
          </div>
        </nav> 
      
