import { HTMLZooFunctions } from "./functions.js";
import { ZooEvents } from "./eventhandlers.js";

let HTML_ZooAddAnimalButton = document.getElementById("AddAnimalButton");
let HTML_ZooAnimalCount = document.querySelector(".NumberOfAnimals");
let HTML_ZooAddOneGuestButton = document.getElementById("AddGuestButton");
let HTML_ZooAnimalsForm = document.querySelector(".AnimalEditor");
let HTML_ZooAnimalsTable = document.querySelector(".ZooTable");
let HTML_ZooBirthChild = document.getElementById("AnimalBirth");
let HTML_ZooCapacity = document.querySelector(".Capacity");
let HTML_ZooDeleteAnimalButton = document.getElementById("RemoveAnimalButton");
let HTML_ZooEditAnimalButton = document.getElementById("ApplyToAnimalButton");
let HTML_ZooGuests = document.querySelector(".NumberOfGuests");
let HTML_ZooGuestForm = document.querySelector(".GuestEditor");
let HTML_ZooName = document.querySelector(".Name");
let HTML_ZooAnimalPregnancy = document.getElementById("AnimalPregnancy");
let HTML_ZooSelectAnimal = document.querySelector(".AnimalsSelect");
let HTML_ZooUpdateGuestAmount = document.getElementById("UpdateGuestsButton");
let HTML_ZooUpdateGuestReturn = document.querySelector(".GuestReturn");

let Zoo_ = new Zoo("Zoo", 50, 0);
let animal1 = ["Perry", 2, 3.2, "Male", false, 0, "Platypus"];
let animal2 = ["Harry", 2, 3.2, "Male", false, 0, "Hummingbird"];
let animal3 = ["Sherry", 2, 852, "Female", false, 0, "Shark"];
let animal4 = ["Cherry", 2, 3.2, "Female", false, 0, "Chimpanzee"];
Zoo_.Animals = [
  AnimalInterface(animal1),
  AnimalInterface(animal2),
  AnimalInterface(animal3),
  AnimalInterface(animal4),
];
console.log(Zoo_.Animals);

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
console.log(HTML_ZooAnimalPregnancy);
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
