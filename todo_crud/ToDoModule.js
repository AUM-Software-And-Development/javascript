export class ToDoModule {
  constructor(read, update, list, span, count, deleteall) {
    try {
      this.Input = read;
      this.Button = update;
      this.List = list;
      this.SpanName = span;
      this.Span = undefined;
      this.Count = count;
      this.DeleteAllButton = deleteall;
      this.ReadToDoList();
      this.InitializeReadListener();
      this.InitializeSubmitClick();
      this.InitializeDeleteAllClick();
    } catch (error) {
      return error;
    }
  }

  InitializeDeleteAllClick() {
    this.DeleteAllButton.onclick = () => {
      this.DeleteAll();
    };
  }
  DestructureDeleteAllClick() {
    this.DeleteAllButton.onclick = undefined;
  }

  InitializeReadListener() {
    this.Input.onkeyup = () => {
      let userData = this.Input.value;
      userData.trim();
      if (userData != 0 && userData.length < 28) {
        this.Button.classList.add("active");
      } else {
        this.Button.classList.remove("active");
      }
    };
  }
  DestructureReadListener() {
    this.Input.onkeyup = undefined;
  }

  InitializeSpanClick() {
    this.Span = document.querySelectorAll(this.SpanName);
    this.Span.forEach((item, index) => {
      item.onclick = () => {
        this.DeleteToDoListItem(index);
        console.log(index);
      };
    });
  }
  DestructureSpanClick() {
    this.Span = document.querySelectorAll(this.SpanName);
    this.Span.forEach((item, index) => {
      item.onclick = () => {
        undefined;
      };
    });
  }

  InitializeSubmitClick() {
    this.Button.onclick = () => {
      let userData = this.Input.value;
      let updateLocalStorage = localStorage.getItem("New ToDo");
      if (updateLocalStorage === null) {
        updateLocalStorage = new Array();
      } else {
        updateLocalStorage = JSON.parse(updateLocalStorage);
      }
      updateLocalStorage.push(userData);
      localStorage.setItem("New ToDo", JSON.stringify(updateLocalStorage));
      this.ReadToDoList();
    };
  }
  DestructureSubmitClick() {
    this.Button.onclick = undefined;
  }

  DeleteAll() {
    let toDoList = new Array();
    localStorage.setItem("New ToDo", JSON.stringify(toDoList));
    this.ReadToDoList();
  }

  DeleteToDoListItem(index) {
    let readLocalStorage = localStorage.getItem("New ToDo");
    let toDoList = JSON.parse(readLocalStorage);
    toDoList.splice(index, 1);
    localStorage.setItem("New ToDo", JSON.stringify(toDoList));
    this.ReadToDoList();
  }

  ReadToDoList() {
    let readLocalStorage = localStorage.getItem("New ToDo");
    let toDoList;
    if (readLocalStorage === null) {
      toDoList = new Array();
    } else {
      toDoList = JSON.parse(readLocalStorage);
    }
    let listItem = "";
    toDoList.forEach((element) => {
      listItem += `<li>${element}<span class="fas fa-trash"></span></li>`;
    });
    this.List.innerHTML = listItem;
    this.OnRead();
  }

  OnRead() {
    this.Input.value = "";
    this.Button.classList.remove("active");
    this.InitializeSpanClick();
    this.Count.innerHTML = `There are ${this.Span.length} total tasks to complete`;
    if (this.Span.length > 0) {
      this.DeleteAllButton.classList.add("active");
    } else {
      this.DeleteAllButton.classList.remove("active");
    }
  }
}
