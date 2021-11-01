import { ToDoModule } from "./ToDoModule.js";

const todo_input = document.querySelector("section.todoinput input");
const todo_submit = document.querySelector("section.todoinput button");
const todo_list = document.querySelector("section.todolist ul");
const todo_span = "section.todolist span";
const todo_count = document.querySelector("section.todofooter span");
const todo_deleteall = document.querySelector("section.todofooter button");

try {
  let todo_module = new ToDoModule(
    todo_input,
    todo_submit,
    todo_list,
    todo_span,
    todo_count,
    todo_deleteall
  );
} catch (error) {
  console.log(error);
}
