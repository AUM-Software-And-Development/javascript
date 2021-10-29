HTML_ZooAnimalSelector.onclick = function () {
  FillForm(
    HTML_ZooAnimalsForm,
    Zoo_.Animals,
    HTML_ZooAnimalSelector.options[HTML_ZooAnimalSelector.selectedIndex].text
  );
};

HTML_AddAnimalButton.onclick = function (e) {
  e.preventDefault();
  let changeRequest = new FormData(HTML_ZooAnimalsForm);
  if (ValidateAnimalForm(changeRequest)) {
    Zoo_.AddAnimal(GetAnimalChanges(changeRequest));
    AddAnimalToTable(
      HTML_ZooAnimalsTable,
      Zoo_.Animals[Zoo_.Animals.length - 1]
    );
    AddToSelectBox(
      HTML_ZooAnimalSelector,
      Zoo_.Animals[Zoo_.Animals.length - 1].Name
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
  Zoo_.RemoveAnimal(Zoo_.Animals[HTML_ZooAnimalSelector.selectedIndex]);
  DeleteAnimalFromTable(
    HTML_ZooAnimalsTable,
    HTML_ZooAnimalSelector.selectedIndex
  );
};

HTML_AddGuestButton.addEventListener("click", (e) => {
  if (Zoo_.AddGuest())
    HTML_ZooGuests.innerHTML = `<p>It has ${Zoo_.NumberOfGuests} entrants</p>`;
});
