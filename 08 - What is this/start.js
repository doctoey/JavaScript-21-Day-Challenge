(() => {
  // เริ่มเขียนโค้ด

  // 1. Lexical scope & Dynamic scope
  // function printName() {
  //   console.log(this);
  // }

  // printName();
  
  // 2. How to know what is "this"?
  // function printName() {
  //   console.log(this); //this คือ window ที่เป็น global object
  // }
  
  
  //// 2.1 Invoker object
  // const doctoey = { name: 'doctoey', printName };
  // const jane = { name: 'jane', printName };
  
  // doctoey.printName(); //{ name: 'doctoey', printName: [Function: printName] }
  // jane.printName(); //{ name: 'jane', printName: [Function: printName] }
  
  //// 2.2 Global object (window, global)
  // function printName() {
  //   console.log(this);
  //   console.log(`My name is ${this.name}`); //My name is doctoey  , My name is jane
  // }
  
  // name = 'Global';
  // printName(); //My name is Global

  //// 2.3 Constructor function
  // function printName() {
  //   console.log(this);
  //   console.log(`My name is ${this.name}`);
  // }
  // function Person(name) {
  //   this.name = name
  //   this.printName = printName;
  // }

  // const cheewathun = new Person('Cheewathun'); //Person { name: 'Cheewathun', printName: [Function: printName] }
  // cheewathun.printName(); //My name is Cheewathun

  // 3. call(), apply(), and bind()
  function printName(nationality, city) {
    console.log(this);
    console.log(
      `My name is ${this.name}, I'm ${nationality} and am living in ${city}`
    );
  }

  function Person (name, nationality, city) {
    this.name = name
    this.nationality = nationality
    this.city = city;

    printName(this.nationality, this.city); //My name is undefined, I'm Thai and am living in City
    printName.call(this, this.nationality, this.city); //My name is doctoey, I'm Thai and am living in City
    printName.apply(this, [this.nationality, this.city]); //My name is doctoey, I'm Thai and am living in City

    const printToeyName = printName.bind(this); //bind จะทำการ return function อันใหม่มาให้เรา //call และ apply จะเรียกใช้ function ทันที
    printToeyName('Thai', 'Bangkok');
  }

  const toey = new Person('doctoey', 'Thai', 'City'); //My name is doctoey, I'm Thai and am living in Bangkok
})();
