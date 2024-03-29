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

### Add props to Todo

We can add props to our Todos `<Todos todos={this.state.todos} />`.

```javascript
class App extends Component {
    ...
    render() {
        return (
            <div className="App">
                <Todos todos={this.state.todos} />
            </div>
        );
    }
}
```

And we can access them in our `Todos.js` using `console.log(this.props.todos)`.

```bash
class Todos extends Component {
    render() {
        console.log(this.props.todos)
        return (
            ...
        );
    }
}
```

Instead of looping over the values, in react we use a `map` method.

```javascript
import React, { Component } from 'react';

class Todos extends Component {
    render() {
        return this.props.todos.map((todo) => (
        <h3>{ todo.title }</h3>
        ));
    }
}
export default Todos;
```

### Add a `TodoItem`

Now let's add a `TodoItem` to show each item of the list.

```javascript
import React, { Component } from 'react'

export class TodoItem extends Component {
    render() {
        return (
            <div>
                <p>{this.props.todo.title}</p>
            </div>
        )
    }
}
export default TodoItem
```

To show this on the page add the `TodoItem` to the `Todos`.

```javascript
import React, { Component } from 'react';
import TodoItem from './TodoItem';

class Todos extends Component {
    render() {
        return this.props.todos.map((todo) => (
            <TodoItem  todo={todo} />
        ));
    }
}
export default Todos;
```

### Remove the warning

There is still this warining.

```bash
index.js:1 Warning: Each child in a list should have a unique "key" prop. See https://fb.me/react-warning-keys for more information.
```

Just add a unique `key` to the `Todo` like this `key={todo.id}`.

```javascript
class Todos extends Component {
    render() {
        return this.props.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
        ));
    }
}
```

### Install Visual Studio Code Extension

There is an Extension for Visual Studio Code that helps to generate Code very quick.
The Extension is called _VS Code ES7 React/Redux/React-Native/JS snippets_.

After Installing that you can type `rce` and press the `tab` key to create a new component.

### Create new `Todoitem` Component

To create the new Component, just create a new File `./component/Todoitem.js`.
Type `rce` and `tab` to generate the source code.

```bash
import React, { Component } from 'react'

export class TodoItem extends Component {
    render() {
        return (
            <div>
            </div>
        )
    }
}
export default Todoitem
```

### Proptypes

Proptypes is some kind of validation for properties a component should have.
We can set a type and if they are required or not.
Our `Todos` has a prop called `todos`. So we add `import PropTypes from 'prop-types` and  we need to add a proptype `Todos.propTypes` for that.

```bash
...
import PropTypes from 'prop-types'

class Todos extends Component {
    ...
}
// PropTypes
Todos.propTypes = {
    todos: PropTypes.array.isRequired
}
export default Todos;
```

We do the same thing for our `TodoItem`.

```bash
// PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}
```

### JSX Styles

To add some style for our `TodoItem` we can add a style property e.g. to a `div` tag.

```javascript
<div style={{ backgroundColor: '#fff4f4' }}>
    <p>{this.props.todo.title}</p>
</div>
```

Or we use a variable `itemStyle`.

```javascript
    <div style={ itemStyle }>
        <p>{this.props.todo.title}</p>
    </div>
...
const itemStyle = {
    backgroundColor: '#f4f4f4'
}
```

But we also can add a dynamic value base upon a method.

```javascript
export class TodoItem extends Component {
    getStyle = () => {
        return {
            backgroundColor: '#f0f0ff',
            padding: '10px',
            borderBottom: '1px #acf dotted',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        }
    }
    render() {
        return (
            <div style={ this.getStyle() }>
                <p>{this.props.todo.title}</p>
            </div>
        )
    }
}
```

### Change the state of the Todo

To change the state of the checkbox we have to add an event and a new method `markComplete`.

```html
<input type="checkbox" onChange={this.markComplete}/>
```

Remember, we have to use an arrow function, otherwise we can't access the 'props' for this component. We get a `TypeError: Cannot read property 'props' of undefined`.

```bash
markComplete() {
    console.log(this.props) // does not work
}
```

Since we don't have access to `this` we use an arrow function.

```javascript
export class TodoItem extends Component {
    ...
    markComplete = (e) => {
        console.log(this.props.todo)
    }
    render() {
        return (
            <div style={ this.getStyle() }>
                <p>
                    <input type="checkbox" onChange={this.markComplete}/>
                    {this.props.todo.title}
                </p>
            </div>
        )
    }
}
```

Since we don't use a state manager like _Redux_ or a _context api_ we can't change the state of `App`, this is why we have to _climb up the tree_. This is the most complex thing to learn. We have to go from `TodoItem` to `Todo` and to `App`.

So instead of calling `this.markComplete`, we call `this.props.markComplete`...

```bash
export class TodoItem extends Component {
    ...
    render() {
        return (
            <div style={ this.getStyle() }>
                <p>
                    <input type="checkbox" onChange={this.props.markComplete}/>
                    ...
```

And we add a new property `markComplete={this.markComplete}` to `<TodoItem />`.

```bash
class Todos extends Component {
    render() {
        markComplete = () => {
            console.log('Hello')
        }
        return this.props.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} markComplete={this.markComplete} />
        ));
    }
}
```

But we have to climb one more level since the `state` is in the `App`.

```bash
class Todos extends Component {
    render() {
        return this.props.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} />
        ));
    }
}
```

Add the `markComplete = { this.markComplete }` to `App.js` file and create a method.

```bash
class App extends Component {
    ...
    markComplete = (e) => {
        console.log('From App.js')
    }
    render() {
        return (
            <div className="App">
                <Todos todos={this.state.todos} markComplete={this.markComplete}/>
            </div>
        );
    }
}
```

If we want to change the state, then we need to know which item we have to change. To achieve this  we need to `bind` our item in `TodoItem`.

```bash
<input type="checkbox" onChange={this.props.markComplete.bind(this, this.props.todo.id)}/>
```

Now we can toggle the `completed` status for this id.

```javascript
class App extends Component {
    state = {
      todos: [
          {
            id: 1,
            title:  'Take out the trash',
            completed: false
          },
        ...
    }
    markComplete = (id) => {
        this.setState({ todos: this.state.todos.map( todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
                console.log(todo)
            }
            return todo
        }) })
    }
    render() {
        return (
            <div className="App">
                <Todos todos={this.state.todos} markComplete={this.markComplete}/>
            </div>
        );
    }
}
```

### Add Delete Button

To add a button we do the same thing as above. So let's add the button.

```javascript
<button style={btnStyle} onClick={this.props.delTodo.bind(this, id)} >x</button>
```

Add a const for the style.

```javascript
const btnStyle = {
    background: '#ff0000',
    color: '#ffffff',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}
```

In `TodoItem` we need to add `delTodo`.

```javascript
class Todos extends Component {
    render() {
        return this.props.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} 
                markComplete={this.props.markComplete} 
                delTodo={this.props.delTodo}/>
        ));
    }
}
```

And we have to remove the item in `App.js`.

```javascript
class App extends Component {
    ...
    delTodo = (id) => {
        console.log(id);
        this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]})
    }
    render() {
        return (
            <div className="App">
                <Todos todos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo} />
            </div>
        );
    }
}
```

### Add a Header

Add a new file `./components/layout/Header.js`.

```javascript
import React from 'react';

function Header() {
    return (
        <header style={headerStyle}>
            <h1>Todo List</h1>
        </header>
    )
}
const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}
export default Header;
```

And include it into the `App`.

```javascript
class App extends Component {
    ...
    render() {
        return (
            <div className="App">
                <Header />
                <Todos todos={this.state.todos} 
                  markComplete={this.markComplete}
                  delTodo={this.delTodo} />
            </div>
        );
    }
}
```

### Add new component to Create a Todo

Now we add a new component `./component/AddTodo.js`.

```javascript
import React, { Component } from 'react'

export class AddTodo extends Component {
    render() {
        return (
            <form style={{ display: 'flex' }}>
                <input type="text" name="title" placeholder="Add todo..." style={{ flex: '10', padding: '5px' }} />
                <input type="submit" value="Submit" className="btn" style={{ flex: '1' }}/>
            </form>
        )
    }
}
export default AddTodo
```

And we add it right under the `Header` in the `App`.

### Event handling for `AddTodo`

Now let's add some event handlers to our `AddTodo` component.

```bash
import React, { Component } from 'react'

export class AddTodo extends Component {
    state = {
        title: ''
    }
    onChange = (e) => {
        this.setState({ title: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({ title: '' });
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <input type="text" name="title" placeholder="Add todo..." 
                    style={{ flex: '10', padding: '5px' }} 
                    value={this.state.title}
                    onChange={this.onChange}/>
                <input type="submit" value="Submit" className="btn" 
                    style={{ flex: '1' }}/>
            </form>
        )
    }
}
export default AddTodo
```

The `onSubmit` event and method will call the `addTodo` method in our `App` component to update the state.

Since we need an unique `id` for each `newTodo`, we import `uuid`.

```javascript
import { v4 as uuidv4 } from 'uuid';
```

But before we have to stop the server and do an `npm install uuid`.
Now let's use it in our `App` component and create the `addTodo` method. 

```javascript
addTodo = (title) => {
    const newTodo = {
        id: uuidv4(),
        title,
        completed: false
    }
    this.setState({todos: [...this.state.todos, newTodo] })
    console.log(title);
}
```

Don't forget to replace all other `id`s and add the `addTodo={this.addTodo}` property.

```javascript
import React, { Component } from 'react';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
    state = {
      todos: [
          {
            id: uuidv4(),
            title:  'Take out the trash',
            completed: false
          },
          {
            id: uuidv4(),
            title:  'Dinner with wife',
            completed: true
          },
          {
            id: uuidv4(),
            title:  'Meeting with boss',
            completed: false
          }
      ]

    }
    markComplete = (id) => {
        this.setState({ todos: this.state.todos.map( todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
                console.log(todo)
            }
            return todo
        }) })
    }
    addTodo = (title) => {
        const newTodo = {
            id: uuidv4(),
            title,
            completed: false
        }
        this.setState({todos: [...this.state.todos, newTodo] })
        console.log(title);
    }
    delTodo = (id) => {
        console.log(id);
        this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]})
    }
    render() {
        return (
            <div className="App">
                <div className="containter">
                    <Header />
                    <AddTodo addTodo={this.addTodo} />
                    <Todos todos={this.state.todos} 
                      markComplete={this.markComplete}
                      delTodo={this.delTodo} />
                </div>
            </div>
        );
    }
}
export default App;
```

### The react router

Now we start with the _react router (1:15:30 h)_.

```bash
npm i react-router-dom
```

Create a folder `pages` in `components` and a new file called `About.js`.
Let's create a function component and generate it by `rcf` and type _tab-key_.

```bash
import React from 'react'

export default function About() {
    return (
        <div></div>
    )
}
```

Since you have to `return` exactly _one element_, you can use a `<React.Fragment>` instead of a `<div>`.

```javascript
import React from 'react'

function About() {
    return (
        <React.Fragment>
            <h1>About</h1>
            <p>This is the TodoList App. It is part of a React Crash Course.</p>
        </React.Fragment>
    )
}
export default About;
```

To implement our router we have to go to `App.js`, add the imports `import { BrowserRouter as Router, Route} from 'react-router-dom'` and `import About from './components/pages/About';`. After that we have to create the `Route`s usig a `React.Fragment`.

```javascript
import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
...
import { v4 as uuidv4 } from 'uuid';
import About from './components/pages/About';

class App extends Component {
    ...
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="containter">
                        <Header />
                        <Route exact path="/" render={props => (
                            <React.Fragment>
                                <AddTodo addTodo={this.addTodo} />
                                <Todos todos={this.state.todos} 
                                  markComplete={this.markComplete}
                                  delTodo={this.delTodo} />
                            </React.Fragment>
                        )} />
                        <Route exact path="/about" component={About} />
                    </div>
                </div>
            </Router>
        );
    }
}
export default App;
```

### Add Links

Let's actually add some links so that we can go to the about page and back to the home page. Let's do this in the header and add the import and some Links `<Link style={linkStyle} to="/">Home</Link>`.

```bash
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <h1>Todo List</h1>
            <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link>
        </header>
    )
}
...
const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}
export default Header;
```

### Http Requests

Let's use JSONPlaceholder <https://jsonplaceholder.typicode.com> which is a free online REST API that you can use whenever you need some fake data.

You can use the javascript _fetch library_, but we will use _axios_.

```bash
npm install axios
```

We want to fetch the todos from the jsonplaceholder api. So let's delete our entries in `App.js` but keep the empty array and add a get request to our fake rest api.

To make initial request we want to use another lifecycle method called `componentDidMount` where we can use `Axios.get(...)` to get our todos.

```javascript
import React, { Component } from 'react';
...
import Axios from 'axios';

class App extends Component {
    state = {
      todos: []
    }
    ...
    addTodo = (title) => {
        Axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false
        }).then( res => this.setState({todos: [...this.state.todos, res.data] }));
    }
    delTodo = (id) => {
        console.log(id);
        Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
          .then( res => this.setState({ 
              todos: [...this.state.todos.filter(todo => todo.id !== id)]}))
    }
    componentDidMount() {
        Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
          .then( res => console.log(res.data));
    }
    render() {
        return (
            <Router>
                ...
            </Router>
        );
    }
}
export default App;
```

### Add missing proptypes

We need to add some missing `PropTypes`.

```javascript
// PropTypes
AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}
```

### Create a production build

Don't forget.

```bash
Note that the development build is not optimized.
To create a production build, use npm run build.
```

So let's do this.

```bash
npm run build
```

This will create a new folder '/build' which contains our app which we can deploy.

***

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

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
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
