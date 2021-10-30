export class HTMLZooFunctions {
  static AddAnimalToTable(table, obj) {
    let row = table.insertRow();
    Object.values(obj).forEach((field) => {
      let cell = row.insertCell();
      let cellData;
      if (field.name) {
        cellData = document.createTextNode(field.name);
      } else {
        cellData = document.createTextNode(field);
      }

      cell.appendChild(cellData);
    });
  }

  static AddToSelectBox(selector, text) {
    let selectableOption = document.createElement("option");
    selectableOption.text = text;
    selector.appendChild(selectableOption);
    if (selector.options) {
      selector.options[selector.options.length - 1].selected = true;
    }
  }

  static BuildATableFromAnArray(table, obj) {
    // Info
    for (let field of obj) {
      let row = table.insertRow();
      for (let key in field) {
        let cell = row.insertCell();
        let cellData;
        if (key === "Dropdown" || key === "Move" || key === "Baby") {
          if (key === "Baby") {
            if (field[key] === undefined) {
              cellData = document.createTextNode("Not with child");
            } else {
              cellData = document.createTextNode(field[key].Name);
            }
          } else {
            cellData = document.createTextNode(field[key].name);
          }
        } else {
          cellData = document.createTextNode(field[key]);
        }
        cell.appendChild(cellData);
      }
    }
    /* Head -- If the head is built before the body, no table body is added */
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let field of Object.keys(obj[0])) {
      let label = document.createTextNode(field);
      let th = document.createElement("th");
      th.appendChild(label);
      row.appendChild(th);
    }
  }

  static DeleteAnimalFromTable(zoo, selector, index, table) {
    if (zoo.Animals.length > 0) {
      zoo.Animals.splice(index, 1);
      table.rows[index + 1].remove();
      this.DeleteFromSelectBox(selector, index);
    }
  }

  static DeleteFromSelectBox(selectBox, index) {
    selectBox.options[index].remove();
    if (selectBox.options > 0) {
      selectBox.options[Zoo_.Animals.length - 1].selected = true;
    }
  }

  static FillAnimalForm(obj, form, selected) {
    let i = 0;
    for (let field in form) {
      if (field > 7) {
        break;
      }
      if (field === "6" || field === "7") {
        Object.values(form)[i].value = Object.values(
          obj[Object.keys(obj).find((truth) => obj[truth].Name === selected)]
        )[field].name;
        i++;
      } else {
        Object.values(form)[i].value = Object.values(
          obj[Object.keys(obj).find((truth) => obj[truth].Name === selected)]
        )[i];
        i++;
      }
    }
  }

  static GetAnimalChanges(changeRequest) {
    let newFields = [];
    for (let entries of changeRequest.entries()) {
      newFields.push(entries[1]);
    }
    /* Send in animal format */
    return AnimalInterface(newFields);
  }

  static InstantiateAnimalSelectBox(zoo, selectBox) {
    zoo.Animals.forEach((animal) => {
      let selectableOption = document.createElement("option");
      selectableOption.text = animal.Name;
      selectBox.appendChild(selectableOption);
    });
  }

  static UpdateAnimal(zoo, selector, table, changeRequest) {
    if (zoo.Animals.length > 0) {
      /* Get index */
      let selected = selector.selectedIndex;
      zoo.UpdateAnimal(this.GetAnimalChanges(changeRequest), selected);

      table.rows[selected + 1].innerHTML = "";
      Object.values(zoo.Animals[selected]).forEach((field) => {
        if (field.name) {
          table.rows[selected + 1].innerHTML += `<td>${field.name}</td>`;
        } else {
          table.rows[selected + 1].innerHTML += `<td>${field}</td>`;
        }
      });
      selector.options[selected].text = zoo.Animals[selected].Name;
    }
  }

  static UpdateAnimalOnTable(zoo, selector, table) {
    if (zoo.Animals.length > 0) {
      /* Get index */
      let selected = selector.selectedIndex;
      let animal = zoo.Animals[selected];

      table.deleteRow(selected + 1);
      let row = table.insertRow(selected + 1);
      let cell = row.insertCell();

      let cellData = document.createTextNode(animal.Name);
      cell.appendChild(cellData);
      cell = row.insertCell();
      cellData = document.createTextNode(animal.Age);
      cell.appendChild(cellData);
      cell = row.insertCell();
      cellData = document.createTextNode(animal.Weight);
      cell.appendChild(cellData);
      cell = row.insertCell();
      cellData = document.createTextNode(animal.Gender);
      cell.appendChild(cellData);
      cell = row.insertCell();
      cellData = document.createTextNode(animal.IsPregnant);
      cell.appendChild(cellData);
      cell = row.insertCell();
      cellData = document.createTextNode(animal.MoveDistance);
      cell.appendChild(cellData);
      cell = row.insertCell();
      cellData = document.createTextNode(animal.Dropdown.name);
      cell.appendChild(cellData);
      cell = row.insertCell();
      cellData = document.createTextNode(animal.Move.name);
      cell.appendChild(cellData);
      cell = row.insertCell();
      if (animal.Baby) {
        cellData = document.createTextNode(animal.Baby.Name);
      } else {
        cellData = document.createTextNode("Not with child");
      }
      cell.appendChild(cellData);

      selector.options[selected].text = zoo.Animals[selected].Name;
    }
  }

  static UpdateGuestAmount(zoo, changeRequest) {
    let newFields = [];
    for (let entries of changeRequest.entries()) {
      newFields.push(entries[1]);
    }
    if (newFields[0] > zoo.Capacity) {
      zoo.NumberOfGuests = zoo.Capacity;
      return newFields[0] - zoo.Capacity;
    } else {
      zoo.NumberOfGuests = newFields[0];
      return 0;
    }
  }

  static ValidateAnimalForm(dataFormat) {
    return true;
  }

  static ValidateGuestForm(dataFormat) {
    return true;
  }
}
