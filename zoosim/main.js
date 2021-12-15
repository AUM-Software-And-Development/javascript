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

let testing = false;

function registers_service_worker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./zoo_service_worker.js", { scope: "./" })
        .then((response) => {
          console.log("Attempting to log the zoo using the browsers cache.");
        })
        .catch((error) => {
          console.log("service worker failed with this error: " + error);
        });
    });
  }
}

function deregisters_service_workers() {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
        console.log("Service worker taken offline.");
      });
    })
    .catch((error) => "Service worker is stuck online. Error: " + error);
}

function last_stable_start() {
  registers_service_worker();

  fetch("https://ericdee.me/school-api/class-animal-data")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let animals = JSON.parse(data);
      Object.values(animals)[0].forEach((animal) => {
        Zoo_.Animals.push(AnimalInterface(Object.values(animal)));
      });
      build_on_success();
    })
    .catch((e) => {
      console.log(`The zoo did not build due to this error: ${e}`);
    });
}

function test_start() {
  console.log("****Testing****");
  registers_service_worker();

  fetch("http://localhost:80/school-api/class-animal-data")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let animals = JSON.parse(data);
      Object.values(animals)[0].forEach((animal) => {
        Zoo_.Animals.push(AnimalInterface(Object.values(animal)));
      });
      build_on_success();
    })
    .catch((e) => {
      console.log(`The zoo did not build due to this error: ${e}`);
    });
}

if (testing) {
  test_start();
} else {
  last_stable_start();
}

function build_on_success() {
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
}
