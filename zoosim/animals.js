class Animal {
  constructor(fieldData) {
    this.Name = fieldData[0];
    this.Age = fieldData[1];
    this.Weight = fieldData[2];
    this.Gender = fieldData[3];
    this.IsPregnant = fieldData[4];
    this.MoveDistance = 0.0;
    this.Dropdown = Animal;
    this.Move = MoveMethods.Move;
  }

  MakePregnant() {
    this.IsPregnant = true;
  }

  GiveBirth() {}
}

class MoveMethods {
  static Move() {}
  static Fly() {}
  static Swim() {}
  static Pace() {}
}

function AnimalInterface(fieldData) {
  animal = null;
  switch (fieldData[6]) {
    case "Platypus":
      animal = new Platypus(fieldData);
      break;
    case "Hummingbird":
      animal = new HummingBird(fieldData);
      break;
    case "Shark":
      animal = new Shark(fieldData);
      break;
    case "Chimpanzee":
      animal = new Chimpanzee(fieldData);
      break;
    default:
      animal = new Animal(fieldData);
      break;
  }

  return animal;
}

class HummingBird extends Animal {
  constructor(fieldData) {
    super(fieldData);
    this.MoveDistance = 5.0;
    this.Move = MoveMethods.Fly;
    this.Dropdown = HummingBird;
  }
}

class Platypus extends Animal {
  constructor(fieldData) {
    super(fieldData);
    this.MoveDistance = 25.0;
    this.Move = MoveMethods.Swim;
    this.Dropdown = Platypus;
  }
}

class Shark extends Animal {
  constructor(fieldData) {
    super(fieldData);
    this.MoveDistance = 58.0;
    this.Move = MoveMethods.Swim;
    this.Dropdown = Shark;
  }
}

class Chimpanzee extends Animal {
  constructor(fieldData) {
    super(fieldData);
    this.MoveDistance = 12.0;
    this.Move = MoveMethods.Pace;
    this.Dropdown = Chimpanzee;
  }
}
