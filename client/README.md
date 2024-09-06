# this is the frontend for our project
we are using the React frontend

# set up instructions
1. clone this repository via git clone in the terminal
2. cd to the directory of the cloned repository base folder
3. install dependencies via terminal: 
```
npm install
npm i -D react-router-dom@latest
```
4. you should now have a node_modules folder
5. run the react app to make sure your set up is correct
```
npm run dev
```
6. This should open up localhost:5173 in your browser.

# brief tutorial on our React set up
- public/index.html is what the localhost:5173 is displaying. 
- this html file runs the javascript file in src/main.jsx.
- src/main.jsx runs src/PageRouter.jsx, which routes to the correct page based on url. 
- the react-router-dom package matches the url path with the page.
- the pages are in the src/pages folder
- pages use React components, which are in src/components (if you are unfamiliar with React, components
are basically a React structure that makes modularization of our code better)
- test this router out by changing the url 

# try something out to familiarize yourself with the project
TRY: make a new branch, call it "{yourname}/try". Create a new component that returns your name. Create a new page that displays your component. Create a new route to your page at localhost:3000/{yourname}. Add/commit and push this to YOUR NEW BRANCH on github, NOT the main.

If any questions, ask Ethan