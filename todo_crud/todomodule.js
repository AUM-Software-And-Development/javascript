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
      this.ReadToDoList(this);
      this.InitializeReadListener();
      this.InitializeSubmitClick();
      this.InitializeDeleteAllClick();
      // this.DestructureReadListener();
      // this.DestructureSubmitClick();
      // this.DestructureDeleteAllClick();
      // this.DestructureSpanClick();
    } catch (error) {
      return error;
    }
  }

  // Initializers call EventDelegation to keep code tidy. What this does is pull
  // references into handlers, keeping the module reference in tact, by passing it
  // as a parameter.
  InitializeDeleteAllClick() {
    EventDelegation.InitializeClick(this.DeleteAllButton, this.DeleteAll, this);
  }
  DestructureDeleteAllClick() {
    EventDelegation.DestructureClick(this.DeleteAllButton);
  }

  InitializeReadListener() {
    EventDelegation.InitializeKeyUp(this.Input, this.FollowKeys, this);
  }
  DestructureReadListener() {
    EventDelegation.DestructureKeyUp(this.Input);
  }

  InitializeSpanClick() {
    this.Span = document.querySelectorAll(this.SpanName);
    EventDelegation.InitializeGroupClicks(
      this.Span,
      this.DeleteToDoListItem,
      this
    );
  }
  DestructureSpanClick() {
    this.Span = document.querySelectorAll(this.SpanName);
    EventDelegation.DestructureGroupClicks(this.Span);
  }

  InitializeSubmitClick() {
    EventDelegation.InitializeClick(
      this.Button,
      () => {
        this.StoreKeysInLocalStorage(this);
        this.ReadToDoList(this);
      },
      this
    );
  }
  DestructureSubmitClick() {
    EventDelegation.DestructureClick(this.Button);
  }

  // Gets local storage and sets the value to an empty array
  DeleteAll(module) {
    let toDoList = new Array();
    localStorage.setItem("New ToDo", JSON.stringify(toDoList));
    module.ReadToDoList(module);
  }

  // Gets local storage and splices an item from it
  DeleteToDoListItem(index, module) {
    let readLocalStorage = localStorage.getItem("New ToDo");
    let toDoList = JSON.parse(readLocalStorage);
    toDoList.splice(index, 1);
    localStorage.setItem("New ToDo", JSON.stringify(toDoList));
    module.ReadToDoList(module);
  }

  // Keeps track that current key count is within range to submit
  FollowKeys(module) {
    let userData = module.Input.value;
    userData.trim();
    if (userData != 0 && userData.length < 28) {
      module.Button.classList.add("active");
    } else {
      module.Button.classList.remove("active");
    }
  }

  // Applies a list item to an element using what's in local storage
  ReadToDoList(module) {
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
    module.List.innerHTML = listItem;
    module.OnRead(module);
  }

  // Stores keys in local storage when requested
  StoreKeysInLocalStorage(module) {
    let userData = module.Input.value;
    let updateLocalStorage = localStorage.getItem("New ToDo");
    if (updateLocalStorage === null) {
      updateLocalStorage = new Array();
    } else {
      updateLocalStorage = JSON.parse(updateLocalStorage);
    }
    updateLocalStorage.push(userData);
    localStorage.setItem("New ToDo", JSON.stringify(updateLocalStorage));
  }

  // OnRead event to ensure certain styles are changed to suit it
  OnRead(module) {
    module.Input.value = "";
    module.Button.classList.remove("active");
    module.InitializeSpanClick();
    module.Count.innerHTML = `There are ${module.Span.length} total tasks to complete`;
    if (module.Span.length > 0) {
      module.DeleteAllButton.classList.add("active");
    } else {
      module.DeleteAllButton.classList.remove("active");
    }
  }
}
