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
