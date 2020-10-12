import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
// import { v4 as uuidv4 } from 'uuid';
import About from './components/pages/About';
import Axios from 'axios';

class App extends Component {
    state = {
      todos: []
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
        Axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false
        }).then( res => this.setState({todos: [...this.state.todos, res.data] }));
    }
    delTodo = (id) => {
        console.log(id);
        Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
          .then( res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]}))
      
    }
    componentDidMount() {
        Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
          .then( res => console.log(this.setState({ todos: res.data })));
    }
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
