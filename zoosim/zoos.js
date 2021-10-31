class Zoo {
  constructor(name, capacity, numberOfGuests) {
    this.Name = name;
    this.Capacity = capacity;
    this.Animals = new Array();
    this.NumberOfGuests = numberOfGuests;
  }

  AddAnimal(animal) {
    this.Animals.push(animal);
  }

  AddGuest() {
    if (this.NumberOfGuests < this.Capacity) {
      this.NumberOfGuests++;
      return true;
    } else {
      return false;
    }
  }

  AdmitGuests() {
    for (let i = 0; i < this.Capacity - 1; i++) {
      this.NumberOfGuests++;
      if (this.NumberOfGuests >= this.Capacity) {
        this.NumberOfGuests = this.Capacity;
      }
    }
  }

  BirthChild(animal) {
    if (animal.Baby) {
      this.Animals.push(animal.Baby);
      animal.Baby = undefined;
      animal.IsPregnant = false;
      console.log(`An animal has been born to the mother ${animal.Name}!`);
    } else {
      throw "This animal is not with child.";
    }
  }

  FindAnimalByName(name) {
    let result;
    this.Animals.forEach((animal) => {
      if (animal.Name === name) {
        result = animal;
        return;
      }
    });
    return result;
  }

  UpdateAnimal(animalInterface, index) {
    console.log(animalInterface);
    console.log(index);
    this.Animals.splice(index, 1, animalInterface);
  }

  RemoveAnimal(animal) {
    this.Animals.forEach((zAnimal) => {
      if (zAnimal === animal) {
        this.Animals.splice(zAnimal.indexOf, 0);
      }
    });
  }
}
