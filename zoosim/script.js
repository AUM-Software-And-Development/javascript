class ZooConstructor {
  constructor(name, capacity, numberOfGuests) {
    this.Name = name;
    this.Capacity = capacity;
    this.Animals = new Array();
    this.NumberOfGuests = numberOfGuests;
  }
}

class AnimalInterface {
  constructor(fieldData) {
    this.Name = fieldData[0];
    this.Age = fieldData[1];
    this.Weight = fieldData[2];
    this.Gender = fieldData[3];
    this.IsPregnant = fieldData[4];
    this.Type = fieldData[5];
  }
}

function AddGuests(Zoo) {
  for (let i = 0; i < Zoo.Capacity - 1; i++) {
    Zoo.NumberOfGuests++;
    if (Zoo.NumberOfGuests >= Zoo.Capacity) {
      Zoo.NumberOfGuests = Zoo.Capacity;
    }
  }
}

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
      let cellData = document.createTextNode(field[key]);

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
    if (field === "acceptCharset") {
      break;
    }
    Object.values(form)[i].value = Object.values(
      obj[Object.keys(obj).find((truth) => obj[truth].Name === selected)]
    )[i];
    i++;
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

let Zoo = new ZooConstructor("Zoo", 50, 0);

Zoo.Animals = [
  {
    Name: "Perry",
    Age: 2,
    Weight: 3.2,
    Gender: "Female",
    IsPregnant: true,
    Type: "Platypus",
  },

  {
    Name: "Harry",
    Age: 2,
    Weight: 3.2,
    Gender: "Male",
    IsPregnant: false,
    Type: "Hummingbird",
  },

  {
    Name: "Sherry",
    Age: 2,
    Weight: 852,
    Gender: "Female",
    IsPregnant: true,
    Type: "Shark",
  },

  {
    Name: "Cherry",
    Age: 2,
    Weight: 3.2,
    Gender: "Female",
    IsPregnant: true,
    Type: "Chimpanzee",
  },
];

CreateAnimalListOptions(Zoo);
BuildTableElementFromArray(HTML_ZooAnimalsTable, Zoo.Animals);
AddGuests(Zoo);

HTML_ZooName.innerHTML = "<p>" + "The name of the Zoo is: " + Zoo.Name + "</p>";
HTML_ZooCapacity.innerHTML =
  "<p>" + "Its capacity is: " + Zoo.Capacity + "</p>";
HTML_ZooGuests.innerHTML =
  "<p>" + "It has " + Zoo.NumberOfGuests + " entrants" + "</p>";
FillForm(HTML_ZooAnimalsForm, Zoo.Animals, "Perry");

function ValidateAnimalForm(dataFormat) {
  return true;
}

HTML_ZooAnimalSelector.onclick = function () {
  FillForm(
    HTML_ZooAnimalsForm,
    Zoo.Animals,
    HTML_ZooAnimalSelector.options[HTML_ZooAnimalSelector.selectedIndex].text
  );
};

HTML_AddAnimalButton.onclick = function (e) {
  e.preventDefault();
  let changeRequest = new FormData(HTML_ZooAnimalsForm);
  if (ValidateAnimalForm(changeRequest)) {
    Zoo.Animals.push(GetAnimalChanges(changeRequest));
    AddAnimalToTable(HTML_ZooAnimalsTable, Zoo.Animals[Zoo.Animals.length - 1]);
    AddToSelectBox(
      HTML_ZooAnimalSelector,
      Zoo.Animals[Zoo.Animals.length - 1].Name
    );
  }
};

HTML_EditAnimalButton.onclick = function (e) {
  e.preventDefault();
  let changeRequest = new FormData(HTML_ZooAnimalsForm);

  if (ValidateAnimalForm(changeRequest)) {
    UpdateAnimal(changeRequest);
  }
};

HTML_DeleteAnimalButton.onclick = function (e) {
  e.preventDefault();
  DeleteAnimalFromTable(
    HTML_ZooAnimalsTable,
    HTML_ZooAnimalSelector.selectedIndex
  );
};

function GetAnimalChanges(requestedFieldData) {
  let newFieldData = [];
  for (let dataEntries of requestedFieldData.entries()) {
    newFieldData.push(dataEntries[1]);
  }
  /* Send in animal format */
  return new AnimalInterface(newFieldData);
}

function UpdateAnimal(requestedFieldData) {
  if (Zoo.Animals.length > 0) {
    /* Get index */
    let selected = HTML_ZooAnimalSelector.selectedIndex;
    Zoo.Animals.splice(selected, 1, GetAnimalChanges(requestedFieldData));

    HTML_ZooAnimalsTable.rows[selected + 1].innerHTML = "";
    Object.values(Zoo.Animals[selected]).forEach((field) => {
      HTML_ZooAnimalsTable.rows[selected + 1].innerHTML += `<td>${field}</td>`;
    });
    HTML_ZooAnimalSelector.options[selected].text = Zoo.Animals[selected].Name;
  }
}

function AddAnimalToTable(table, obj) {
  row = table.insertRow();
  Object.values(obj).forEach((field) => {
    let cell = row.insertCell();
    let cellData = document.createTextNode(field);

    cell.appendChild(cellData);
  });
}

function DeleteAnimalFromTable(table, index) {
  if (Zoo.Animals.length > 0) {
    Zoo.Animals.splice(index, 1);
    table.rows[index + 1].remove();
    DeleteFromSelectBox(HTML_ZooAnimalSelector, index);
    console.log(Zoo.Animals);
  }
}

function DeleteFromSelectBox(selectBox, index) {
  console.log(selectBox.options[index]);
  selectBox.options[index].remove();
  if (selectBox.options > 0) {
    selectBox.options[Zoo.Animals.length - 1].selected = true;
  }
}

function AddToSelectBox(selectBox, text) {
  let selectableOption = document.createElement("option");
  selectableOption.text = text;
  selectBox.appendChild(selectableOption);
  selectBox.options[Zoo.Animals.length - 1].selected = true;
}
