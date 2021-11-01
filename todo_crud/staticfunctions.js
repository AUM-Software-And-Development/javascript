class ToDoFunctions {
  static DeleteToDoItem(index) {
    let readLocalStorage = localStorage.getItem("New ToDo");
    let toDoList = JSON.parse(readLocalStorage);
    toDoList.splice(index, 1);
  }
}
