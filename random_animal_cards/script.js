let Size = 4;
let Position = 1;
let DogSection = [];
let CatSection = [];

class DogOptimizer {
  constructor() {
    this.EndPoint1 = "https://dog.ceo/api/breeds/image/random";
    this.EndPoint2 = "https://dog.ceo/api/breeds/image/random";
    this.Count = 0;
  }
  RandomDog(location) {
    let endPoint;
    switch (location) {
      case 1:
        endPoint = this.EndPoint1;
      case 2:
        endPoint = this.EndPoint2;
    }
    fetch(endPoint)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.PostDog(data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  PostDog(image_URL) {
    DogSection[this.Count].style.backgroundImage = `url(${image_URL})`;
    this.Count++;
  }
}

class CatOptimizer {
  constructor() {
    this.EndPoint1 = "https://aws.random.cat/meow";
    this.EndPoint2 = "https://aws.random.cat/meow";
    this.Count = 0;
  }
  RandomCat(location) {
    let endPoint;
    switch (location) {
      case 1:
        endPoint = this.EndPoint1;
      case 2:
        endPoint = this.EndPoint2;
    }
    fetch(endPoint)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.PostCat(data.file);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  PostCat(image_URL) {
    CatSection[this.Count].style.backgroundImage = `url(${image_URL})`;
    this.Count++;
  }
}

DogMega = new DogOptimizer();
CatCash = new CatOptimizer();

let ALocation = 1;
for (Position; Position < Size; Position++) {
  DogSection.push(document.querySelector(".p" + Position++));
  CatSection.push(document.querySelector(".p" + Position));
  DogMega.RandomDog(ALocation);
  CatCash.RandomCat(ALocation);
  ALocation++;
  console.log(DogSection);
}
