import { HTMLZooFunctions } from "./functions.js";
import { ZooEvents } from "./eventhandlers.js";

const HTML_ZooAddAnimalButton = document.getElementById("AddAnimalButton");
const HTML_ZooAnimalCount = document.querySelector(".NumberOfAnimals");
const HTML_ZooAddOneGuestButton = document.getElementById("AddGuestButton");
const HTML_ZooAnimalsForm = document.querySelector(".AnimalEditor");
const HTML_ZooAnimalsTable = document.querySelector(".ZooTable");
const HTML_ZooBirthChild = document.getElementById("AnimalBirth");
const HTML_ZooCapacity = document.querySelector(".Capacity");
const HTML_ZooDeleteAnimalButton =
  document.getElementById("RemoveAnimalButton");
const HTML_ZooEditAnimalButton = document.getElementById("ApplyToAnimalButton");
const HTML_ZooGuests = document.querySelector(".NumberOfGuests");
const HTML_ZooGuestForm = document.querySelector(".GuestEditor");
const HTML_ZooName = document.querySelector(".Name");
const HTML_ZooAnimalPregnancy = document.getElementById("AnimalPregnancy");
const HTML_ZooSelectAnimal = document.querySelector(".AnimalsSelect");
const HTML_ZooUpdateGuestAmount = document.getElementById("UpdateGuestsButton");
const HTML_ZooUpdateGuestReturn = document.querySelector(".GuestReturn");

let Zoo_ = new Zoo("Zoo", 50, 0);

let jsonAnimals =
  '{                             \
  "Animals": [                   \
    {                            \
      "Name": "Perry",           \
      "Age": 2,                  \
      "Weight": 3.2,             \
      "Gender": "Male",          \
      "IsPregnant": false,       \
      "MoveDistance": 0,         \
      "Dropdown": "Platypus"     \
    },                           \
    {                            \
      "Name": "Harry",           \
      "Age": 2,                  \
      "Weight": 3.2,             \
      "Gender": "Male",          \
      "IsPregnant": false,       \
      "MoveDistance": 0,         \
      "Dropdown": "Hummingbird"  \
    },                           \
    {                            \
      "Name": "Sherry",          \
      "Age": 2,                  \
      "Weight": 852,             \
      "Gender": "Female",        \
      "IsPregnant": false,       \
      "MoveDistance": 0,         \
      "Dropdown": "Shark"        \
    },                           \
    {                            \
      "Name": "Cherry",          \
      "Age": 2,                  \
      "Weight": 3.2,             \
      "Gender": "Female",        \
      "IsPregnant": false,       \
      "MoveDistance": 0,         \
      "Dropdown": "Chimpanzee"   \
    }                            \
  ]                              \
}';

let animals = JSON.parse(jsonAnimals);

Object.values(animals)[0].forEach((animal) => {
  Zoo_.Animals.push(AnimalInterface(Object.values(animal)));
});

// let animal1 = ["Perry", 2, 3.2, "Male", false, 0, "Platypus"];
// let animal2 = ["Harry", 2, 3.2, "Male", false, 0, "Hummingbird"];
// let animal3 = ["Sherry", 2, 852, "Female", false, 0, "Shark"];
// let animal4 = ["Cherry", 2, 3.2, "Female", false, 0, "Chimpanzee"];

// Zoo_.Animals = [
//   AnimalInterface(animal1),
//   AnimalInterface(animal2),
//   AnimalInterface(animal3),
//   AnimalInterface(animal4),
// ];

Zoo_.AdmitGuests();
HTML_ZooName.innerHTML = `<p> ${Zoo_.Name} </p>`;
HTML_ZooCapacity.innerHTML = `<p> ${Zoo_.Capacity} </p>`;
HTML_ZooGuests.innerHTML = `<p> ${Zoo_.NumberOfGuests} </p>`;
HTML_ZooAnimalCount.innerHTML = `<p> ${Zoo_.Animals.length} </p>`;

HTMLZooFunctions.InstantiateAnimalSelectBox(Zoo_, HTML_ZooSelectAnimal);
HTMLZooFunctions.BuildATableFromAnArray(HTML_ZooAnimalsTable, Zoo_.Animals);
HTMLZooFunctions.FillAnimalForm(Zoo_.Animals, HTML_ZooAnimalsForm, "Perry");

HTML_ZooAddAnimalButton.onclick = (e) => {
  e.preventDefault();
  ZooEvents.AddAnimalListener(
    Zoo_,
    HTML_ZooAnimalsForm,
    HTML_ZooSelectAnimal,
    HTML_ZooAnimalsTable,
    HTML_ZooAnimalCount,
    HTMLZooFunctions
  );
};

HTML_ZooAddOneGuestButton.onclick = (e) => {
  e.preventDefault();
  ZooEvents.AddGuestListener(Zoo_, HTML_ZooGuests);
};

HTML_ZooBirthChild.onclick = (e) => {
  e.preventDefault();
  ZooEvents.BirthChildListener(
    Zoo_,
    HTML_ZooAnimalsForm,
    HTML_ZooSelectAnimal,
    HTML_ZooAnimalsTable,
    HTML_ZooAnimalCount,
    HTMLZooFunctions
  );
};

HTML_ZooDeleteAnimalButton.onclick = (e) => {
  e.preventDefault();
  ZooEvents.DeleteAnimalListener(
    Zoo_,
    HTML_ZooSelectAnimal,
    HTML_ZooAnimalsTable,
    HTML_ZooAnimalCount,
    HTMLZooFunctions
  );
};

HTML_ZooEditAnimalButton.onclick = (e) => {
  e.preventDefault();
  ZooEvents.EditAnimalListener(
    Zoo_,
    HTML_ZooAnimalsForm,
    HTML_ZooSelectAnimal,
    HTML_ZooAnimalsTable,
    HTMLZooFunctions
  );
};

HTML_ZooAnimalPregnancy.onclick = (e) => {
  e.preventDefault();
  ZooEvents.PregancyListener(
    Zoo_,
    HTML_ZooAnimalsForm,
    HTML_ZooSelectAnimal,
    HTML_ZooAnimalsTable,
    HTMLZooFunctions
  );
};

HTML_ZooSelectAnimal.onclick = (e) => {
  e.preventDefault();
  ZooEvents.SelectListener(
    Zoo_,
    HTML_ZooAnimalsForm,
    HTML_ZooSelectAnimal,
    HTMLZooFunctions
  );
};

HTML_ZooUpdateGuestAmount.onclick = (e) => {
  e.preventDefault();
  ZooEvents.UpdateGuestsListener(
    Zoo_,
    HTML_ZooGuestForm,
    HTML_ZooGuests,
    HTML_ZooUpdateGuestReturn,
    HTMLZooFunctions
  );
};
