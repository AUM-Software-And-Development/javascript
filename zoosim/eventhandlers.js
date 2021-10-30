export class ZooEvents {
  static AddAnimalListener(
    zoo,
    form,
    selector,
    table,
    htmlLocation,
    polymorphic
  ) {
    let changeRequest = new FormData(form);
    if (polymorphic.ValidateAnimalForm(changeRequest)) {
      zoo.AddAnimal(polymorphic.GetAnimalChanges(changeRequest));
      polymorphic.AddAnimalToTable(table, zoo.Animals[zoo.Animals.length - 1]);
      polymorphic.AddToSelectBox(
        selector,
        zoo.Animals[zoo.Animals.length - 1].Name
      );
    }
    htmlLocation.innerHTML = `<p> ${zoo.Animals.length} </p>`;
  }

  static AddGuestListener(zoo, htmlLocation) {
    if (zoo.AddGuest())
      htmlLocation.innerHTML = `<p> ${zoo.NumberOfGuests} </p>`;
  }

  static DeleteAnimalListener(zoo, selector, table, htmlLocation, polymorphic) {
    zoo.RemoveAnimal(zoo.Animals[selector.selectedIndex]);
    polymorphic.DeleteAnimalFromTable(
      zoo,
      selector,
      selector.selectedIndex,
      table
    );
    htmlLocation.innerHTML = `<p> ${zoo.Animals.length} </p>`;
  }

  static EditAnimalListener(zoo, form, selector, table, polymorphic) {
    let changeRequest = new FormData(form);

    if (polymorphic.ValidateAnimalForm(changeRequest)) {
      polymorphic.UpdateAnimal(zoo, selector, table, changeRequest);
    }
  }

  static PregancyListener(zoo, form, selector, table, polymorphic) {
    if (!zoo.Animals[selector.selectedIndex].IsPregnant) {
      try {
        zoo.Animals[selector.selectedIndex].MakePregnant();
      } catch (error) {
        console.log(error);
      }
    } else {
      zoo.Animals[selector.selectedIndex].IsPregnant = false;
    }

    polymorphic.FillAnimalForm(
      zoo.Animals,
      form,
      selector.options[selector.selectedIndex].text
    );
    polymorphic.UpdateAnimalOnTable(zoo, selector, table);
  }

  static SelectListener(zoo, form, selctor, polymorphic) {
    polymorphic.FillAnimalForm(
      zoo.Animals,
      form,
      selctor.options[selctor.selectedIndex].text
    );
  }

  static UpdateGuestsListener(
    zoo,
    form,
    htmlLocation,
    htmlReturn,
    polymorphic
  ) {
    let changeRequest = new FormData(form);
    if (polymorphic.ValidateGuestForm(changeRequest)) {
      let capacityStatus = polymorphic.UpdateGuestAmount(zoo, changeRequest);
      if (capacityStatus != 0) {
        htmlLocation.innerHTML = `<p> ${zoo.NumberOfGuests} </p>`;
        htmlReturn.innerHTML = `<p> At guest capacity. ${capacityStatus} waiting. </p>`;
        htmlReturn.style.height = "25.6px";
        htmlReturn.style.background = "#041625";
        htmlReturn.style.color = "white";
      } else {
        htmlLocation.innerHTML = `<p> ${zoo.NumberOfGuests} </p>`;
      }
    }
  }
}
