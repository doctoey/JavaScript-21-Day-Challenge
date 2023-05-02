(() => {
  // เริ่มเขียนโค้ด

  // 1. Class vs Prototype 
  class Person {

  }
  console.log(new Person()); //Person {}

  // 2. What's prototype?
  const name1 = 'doctoey';
  console.log(name1.__proto__); //string prototype

  const arr = [];
  console.log(arr.__proto__); //method Array(0) find, forEach, map

  // // 3. Prototype chain
  const name2 = 'Cheewathun';
  console.log(name2.toString()); //Cheewathun
  console.log(name2.toLocaleString()); //Cheewathun
  console.log(name2.__proto__); //string prototype
  console.log(name2.__proto__.__proto__); //proto class object

  // // 4. Extend a prototype
  const name3 = 'Wahahaha';
  function sayHello(val) {
    console.log(`Hello ${val}`);
  }
  String.prototype.sayHello = sayHello; //[Object: null prototype] {}
  name3.sayHello('World'); //Hello World
})();
