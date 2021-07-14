import Component from "./core/component.js";
import Filter from "./components/Filter.js"
import Input from "./components/Input.js"
import TodoList from "./components/TodoList.js"
import {$, setLocalStorageItem, getLocalStorageItem} from './utils/util.js';



class App extends Component{ 
    setup(){
        const todo = getLocalStorageItem("todo")? 
        getLocalStorageItem("todo") : setLocalStorageItem("todo", {"count": 0,"Filtermode" : 0, "List" : []}); 
        this.$state= todo;
    }

    template(){
        return `
            <h1>TODOS</h1>
            <input id="new-todo-title" class="new-todo"
                placeholder="할일을 추가해주세요"autofocus
            />
            <main id="todos">
                <input class="toggle-all" type="checkbox" />
                <ul id="todo-list" class="todo-list"></ul>
                <div id="todo-filter" class="count-container"></div>
            </main>
        `
    }
  
    mounted(){
        const {$state ,onAddTodo, onToggleTodo, onDeleteTodo, onUpdateTodo, onFilterTodo} = this;
        const _Input = $('#new-todo-title');
        const _TodoList = $('#todo-list');
        const _Filter = $('#todo-filter');

        new Input(_Input, onAddTodo.bind(this));
        new TodoList(_TodoList, {
            $state,
            onToggleTodo: onToggleTodo.bind(this),
            onDeleteTodo : onDeleteTodo.bind(this),
            onUpdateTodo : onUpdateTodo.bind(this)
        });
        new Filter(_Filter,{
            $state,
            onFilterTodo : onFilterTodo.bind(this)
        });
    }

    onAddTodo(content){
        const id = String(this.$state.count*1+1);
        const Filtermode = this.$state.Filtermode;
        const List = [...this.$state.List, {id ,content:content,activate:false}];
        setLocalStorageItem("todo",{List,count : id*1,Filtermode});
        this.setState(getLocalStorageItem("todo"));
    }
    onToggleTodo(id){
      const List =  [];
      this.$state.List.map(todo => {
          if(todo.id==id){
                List.push({id:todo.id, content:todo.content, activate:!todo.activate})
          }else{
              List.push({id:todo.id,content:todo.content, activate:todo.activate})
          }
      });
      const count = String(this.$state.count*1+1);
      const Filtermode = this.$state.Filtermode;
      setLocalStorageItem("todo",{List,count :count*1, Filtermode})
      this.setState(getLocalStorageItem("todo"));

    }
    onDeleteTodo(id){
        const List = this.$state.List.filter(todo => todo.id!==id);
        const count = String(this.$state.count*1);
        const Filtermode = this.$state.Filtermode;
        setLocalStorageItem("todo",{List,count :count*1, Filtermode})
        this.setState(getLocalStorageItem("todo"));
    }
    onUpdateTodo(id, new_content){
        const List =  [];
        this.$state.List.map(todo => {
            if(todo.id==id){
                List.push({id:todo.id, content:new_content, activate:todo.activate})
            }else{
                List.push({id:todo.id,content:todo.content, activate:todo.activate})
            }
        });
        const count = String(this.$state.count*1);
        const Filtermode = this.$state.Filtermode;
        setLocalStorageItem("todo",{List,count :count*1, Filtermode})
        this.setState(getLocalStorageItem("todo"));
    }
    onFilterTodo(mode){
        const List = this.$state.List;
        const count = String(this.$state.count*1);
        const Filtermode = mode;
        setLocalStorageItem("todo",{List,count :count*1, Filtermode})
        this.setState(getLocalStorageItem("todo"));
    }
}


export default App;