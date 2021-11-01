import { ToDoModule } from "./ToDoModule.js";

const todo_input = document.querySelector("section.todoinput input");
const todo_submit = document.querySelector("section.todoinput button");
const todo_list = document.querySelector("section.todolist ul");
const todo_span = "section.todolist span";

try {
  let todo_module = new ToDoModule(
    todo_input,
    todo_submit,
    todo_list,
    todo_span
  );
} catch (error) {
  console.log(error);
}

// InitializeSpanClick() {
//     this.Span = document.querySelectorAll(this.SpanName);
//     console.log(this.Span);
//     this.Span.forEach((item) => {
//       item.onclick = () => {
//         console.log("Span");
//       };
//     });
//   }
