# React JS Crash Course

Based upon React JS Crash Course - <https://www.youtube.com/watch?v=sBws8MSXN7A&t=54s>

## Create the App

### Init project using `npx`

Initialized the project using the following command.

```bash
npx create-react-app .
```

### Remove the stuff not needed

Removed comments in `index.js`, rmeoved `logo.svg`, `index.css` files, and replaced `App.css` with the following stuff.

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
}

a {
  color: #333;
  text-decoration: none;
}
```

The project won't work until you delete the imports for the files in the `index.js` and `App.js`.

### Create `Todos.js`

Create it.

```bash
mkdir src/Components
touch src/Components/Todos.js
```

File names for Components by convention always start with a capital letter!
It is a class based component like `App.js`, so we copy it.

```javascript
import React, { Component } from 'react';

class Todos extends Component {
    render() {
        return (
            <div>
                <h1>Todos</h1>
            </div>
        );
    }
}
export default Todos;
```

Now we have to import the component in `App.js`.

```bash
import React, { Component } from 'react';
import './App.css';
import Todos from './components/Todos';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Todos />
            </div>
        );
    }
}
export default App;
```

### Add todos to new state

Add a new `state` object with todos.

```javascript
class App extends Component {
    state = {
      todos: [
          {
            id: 1,
            title:  'Take out the trash',
            completed: false
          },
          {
            id: 2,
            title:  'Dinner with wife',
            completed: false
          },
          {
            id: 3,
            title:  'Meeting with boss',
            completed: false
          }
      ]
    }
    ...
}

export default App;
```


## Additional information

### This project is initialized using `npx`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Initialized using the following command.

```bash
npx create-react-app .
```

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

#### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

#### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

#### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

#### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

#### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
