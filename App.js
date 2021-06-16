import React from 'react';
import WeatherWidget from "./component/WeatherWidget";

class App extends React.Component {
  // construtor com a inicialização das tasks
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      addInputText: '',
      categorySelected: '',
    }
    this.handleAddTaskText = this.handleAddTaskText.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleSelectedCategory = this.handleSelectedCategory.bind(this);
  }

  componentDidMount() {
    /*
    fetch('https://randomuser.me/api/?results=20')
      .then((response) => response.json())
      .then(data => {
        console.log (data);
      });*/
  }

  // método que faz handling da adição de uma nova task
  handleAddTask (e) {
    e.preventDefault();
    console.log (this.state.addInputText);
    // fazer cópia das tasks
    let tasksCopy = this.state.tasks.slice();
    // adicionar nova tarefa na cópia criada acima
    tasksCopy.push({
      name: this.state.addInputText,
      category: this.state.categorySelected,
      completed: false,
      editing: false,
    });
    // colocar cópia como o novo estado a ser assumido pela aplicação
    this.setState({
      tasks: tasksCopy,
      addInputText: '',
    });
  }

  // método que faz handling da edição do estado de uma nova task
  handleEditTask (taskIndex) {
    // recebe o taskIndex
    // faz cópia do tasks
    let tasksCopy = this.state.tasks.slice();
    // altera o completed do tasksCopy[taskIndex]
    tasksCopy[taskIndex].completed = !tasksCopy[taskIndex].completed;
    // reinjecta no state o tasksCopy como valor do tasks
    this.setState({
      tasks: tasksCopy,
    });
  }

  handleAddTaskText (e) {
    this.setState({
      addInputText: e.target.value,
    });
  }

  handleEditModeToggle (taskIndex) {
    // recebe o taskIndex
    // faz cópia do tasks
    let tasksCopy = this.state.tasks.slice();
    // altera o editing do tasksCopy[taskIndex]
    tasksCopy[taskIndex].editing = !tasksCopy[taskIndex].editing;
    // reinjecta no state o tasksCopy como valor do tasks
    this.setState({
      tasks: tasksCopy,
    });
  }

  handleTaskNameChange (taskIndex, e) {
    // recebe o taskIndex
    // faz cópia do tasks
    let tasksCopy = this.state.tasks.slice();
    // altera o name do tasksCopy[taskIndex]
    tasksCopy[taskIndex].name = e.target.value;
    // reinjecta no state o tasksCopy como valor do tasks
    this.setState({
      tasks: tasksCopy,
    });
  }

  handleRemoveTask (taskIndex) {
    // recebe o taskIndex
    // faz cópia do tasks
    let tasksCopy = this.state.tasks.slice();

    // remove a task
    tasksCopy.splice(taskIndex, 1);
    // tasksCopy = tasksCopy.filter((task, index) => index !== taskIndex);

    // reinjecta no state o tasksCopy como valor do tasks
    this.setState({
      tasks: tasksCopy,
    });
  }

  handleSelectedCategory (event) {
    this.setState({
      categorySelected: event.target.value,
    });
  }

  render () {
    //console.log(this.state.tasks);
    return (
      <div className="App">
        <WeatherWidget/>
        <WeatherWidget city="Lisbon"/>
        <WeatherWidget city="Madrid"/>
        <WeatherWidget city="Porto"/>
        {
          // apresentação de form de adição de nova task
        }
        <form onSubmit={this.handleAddTask}>
          <input type="text"
                 value={this.state.addInputText}
                 onChange={this.handleAddTaskText}/>
          <label>
            <select value={this.state.categorySelected} onChange={this.handleSelectedCategory}>
              <option value="trabalho">Trabalho</option>
              <option value="casa">Casa</option>
              <option value="escola">Escola</option>
            </select>
          </label>
          <button type="submit">Adicionar</button>
        </form>

        {
          // listagem das várias tasks
        }
        <ul className="tasks">
        {
          this.state.tasks.map((task, taskIndex) => {
            return <li
              key={"task_" + taskIndex}
              className={"task" + (task.completed ? "task--completed" : "")}
            >
              {
                task.editing ?
                  <input type="text"
                         value={task.name}
                         onChange={this.handleTaskNameChange.bind(this, taskIndex)}/> :
                  task.name
              }
              <p>
                {task.category}
              </p>
              {
                // colocar botão que tem o evento onClick que invoca this.handleEditTask(taskIndex)
              }
              <button onClick={this.handleEditTask.bind(this, taskIndex)}>
                {(task.completed ? "Reverter" : "Completar")}
              </button>
              <button onClick={this.handleEditModeToggle.bind(this, taskIndex)}>
                {task.editing ? "Guardar" : "Editar"};
              </button>
              <button onClick={this.handleRemoveTask.bind(this, taskIndex)}>
                Apagar
              </button>
            </li>
          })
        }
        </ul>
      </div>
    );
  }
}

export default App;
