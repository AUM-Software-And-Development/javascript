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

  RemoveAnimal(animal) {
    this.Animals.forEach((zAnimal) => {
      if (zAnimal === animal) {
        this.Animals.splice(zAnimal.indexOf, 0);
      }
    });
  }

  UpdateAnimal(animal, animalInterface) {
    this.Animals.forEach((zAnimal) => {
      if (zAnimal === animal) {
        this.Animals.splice(zAnimal.indexOf, 0, animalInterface);
      }
    });
  }

  AdmitGuests() {
    for (let i = 0; i < this.Capacity - 1; i++) {
      this.NumberOfGuests++;
      if (this.NumberOfGuests >= this.Capacity) {
        this.NumberOfGuests = this.Capacity;
      }
    }
  }

  AddGuest() {
    if (this.NumberOfGuests < this.Capacity) {
      this.NumberOfGuests++;
      return true;
    } else {
      return false;
    }
  }

  FindAnimalByName(name) {
    this.Animals.forEach((animal) => {
      if (animal.Name === name) {
        return animal;
      }
    });
    return undefined;
  }
}
