function CreateAnimalListOptions(Zoo) {
  Zoo.Animals.forEach((animal) => {
    let selectableOption = document.createElement("option");
    selectableOption.text = animal.Name;
    HTML_ZooAnimalSelector.appendChild(selectableOption);
  });
}

function BuildTableElementFromArray(table, obj) {
  // Info
  for (let field of obj) {
    let row = table.insertRow();

    for (key in field) {
      let cell = row.insertCell();
      let cellData;
      if (key === "Dropdown" || key === "Move") {
        cellData = document.createTextNode(field[key].name);
      } else {
        cellData = document.createTextNode(field[key]);
      }

      cell.appendChild(cellData);
    }
  }

  /* If the head is built before the body, no table body is added */

  // Head
  let thead = table.createTHead();
  let row = thead.insertRow();

  for (let field of Object.keys(obj[0])) {
    let label = document.createTextNode(field);
    let th = document.createElement("th");

    th.appendChild(label);

    row.appendChild(th);
  }
}

function FillForm(form, obj, selected) {
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

function ValidateAnimalForm(dataFormat) {
  return true;
}

function GetAnimalChanges(requestedFieldData) {
  let newFieldData = [];
  for (let dataEntries of requestedFieldData.entries()) {
    newFieldData.push(dataEntries[1]);
  }
  console.log(newFieldData);
  /* Send in animal format */
  return AnimalInterface(newFieldData);
}

function UpdateAnimal(requestedFieldData) {
  if (Zoo_.Animals.length > 0) {
    /* Get index */
    let selected = HTML_ZooAnimalSelector.selectedIndex;
    let animalToEdit = Zoo_.Animals[selected];
    Zoo_.UpdateAnimal(animalToEdit, GetAnimalChanges(requestedFieldData));

    HTML_ZooAnimalsTable.rows[selected + 1].innerHTML = "";
    Object.values(Zoo_.Animals[selected]).forEach((field) => {
      console.log(field);
      if (field.name) {
        HTML_ZooAnimalsTable.rows[
          selected + 1
        ].innerHTML += `<td>${field.name}</td>`;
      } else {
        HTML_ZooAnimalsTable.rows[
          selected + 1
        ].innerHTML += `<td>${field}</td>`;
      }
    });
    HTML_ZooAnimalSelector.options[selected].text = Zoo_.Animals[selected].Name;
  }
}

function AddAnimalToTable(table, obj) {
  row = table.insertRow();
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

function DeleteAnimalFromTable(table, index) {
  if (Zoo_.Animals.length > 0) {
    Zoo_.Animals.splice(index, 1);
    table.rows[index + 1].remove();
    DeleteFromSelectBox(HTML_ZooAnimalSelector, index);
  }
}

function DeleteFromSelectBox(selectBox, index) {
  selectBox.options[index].remove();
  if (selectBox.options > 0) {
    selectBox.options[Zoo_.Animals.length - 1].selected = true;
  }
}

function AddToSelectBox(selectBox, text) {
  let selectableOption = document.createElement("option");
  selectableOption.text = text;
  selectBox.appendChild(selectableOption);
  if (selectBox.options[Zoo_.Animals.length - 1]) {
    selectBox.options[Zoo_.Animals.length - 1].selected = true;
  }
}

// Main:
let HTML_ZooName = document.querySelector(".Name");
let HTML_ZooCapacity = document.querySelector(".Capacity");
let HTML_ZooGuests = document.querySelector(".NumberOfGuests");
let HTML_ZooAnimalSelector = document.querySelector(".AnimalsSelect");
let HTML_ZooAnimalsTable = document.querySelector(".ZooTable");
let HTML_ZooAnimalsForm = document.querySelector(".AnimalEditor");
let HTML_AddAnimalButton = document.getElementById("AddAnimalButton");
let HTML_EditAnimalButton = document.getElementById("ApplyToAnimalButton");
let HTML_DeleteAnimalButton = document.getElementById("RemoveAnimalButton");
let HTML_AddGuestButton = document.getElementById("AddGuestButton");

let Zoo_ = new Zoo("Zoo", 50, 0);

animal1 = ["Perry", 2, 3.2, "Female", true, 0, "Platypus"];
animal2 = ["Harry", 2, 3.2, "Male", false, 0, "Hummingbird"];
animal3 = ["Sherry", 2, 852, "Female", true, 0, "Shark"];
animal4 = ["Cherry", 2, 3.2, "Female", true, 0, "Chimpanzee"];

Zoo_.Animals = [
  AnimalInterface(animal1),
  AnimalInterface(animal2),
  AnimalInterface(animal3),
  AnimalInterface(animal4),
];

CreateAnimalListOptions(Zoo_);
BuildTableElementFromArray(HTML_ZooAnimalsTable, Zoo_.Animals);
Zoo_.AdmitGuests();
console.log(Zoo_.Animals);

HTML_ZooName.innerHTML =
  "<p>" + "The name of the Zoo is: " + Zoo_.Name + "</p>";
HTML_ZooCapacity.innerHTML =
  "<p>" + "Its capacity is: " + Zoo_.Capacity + "</p>";
HTML_ZooGuests.innerHTML =
  "<p>" + "It has " + Zoo_.NumberOfGuests + " entrants" + "</p>";
FillForm(HTML_ZooAnimalsForm, Zoo_.Animals, "Perry");
