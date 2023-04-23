(() => {
  // เริ่มเขียนโค้ด

  // 1. NaN
  if (NaN !== NaN) { //null ไม่เท่ากับตัวมันเอง คือ if != แล้วมัน true ออกมา
    console.log('NaN is super strange!!'); //ทำไมถึงไม่เท่ากับตัวมันเอง ก็ป้องกันความผิดพลาดในเคส NaN/NaN === 1 กับ NaN * 1 === NaN
  }

  if (Number.isNaN(NaN)) {
    console.log('NaN is working correctly'); //NaN is working correctly
  }

  const result = 1 / 'hello'; //result เป็น 1 / 'hello' ได้ผลเป็น NaN
  if (Number.isNaN(result)) {
  console.log('Equal to Nan'); //Equal to Nan
  }

  // 2. Type Coercion //Coercion แปลว่า การบังคับ ในที่นี้ก็คือการแปลง type อัตโนมัติโดย javascript
  if (1 < 2 < 3) {
    console.log('Jing') //Jing
  }

  if (3 > 2 > 1) {
    console.log('Type coercion makes it become falsy'); //สรุปผลออกมาไม่เหมือนกันอ่ะ เป็น false ทำไมกันนะ?
                                                        //3 > 2 ผลออกมาเป็น true และ true > 1 ซึ่ง true === 1 ทำให้ผลออกมาเป็น false
  }
  
  console.log(2 - '1'); //1 //มันมองเลข 2 เป็น String ไปแล้ว มันเลยต่อ String ให้เลย
  console.log(1 + '2'); //12
  console.log(true + true); //2
  //ถ้าอยากได้ 3 ก็     แปลง string เป็นเลขฐาน 10ก่อน  เช่น 2 + Number.parseInt('1', 10)

  // 3. Interpreter & Compiler
  function getPerson1() {
    return //การที่เรา return แล้วขึ้นบรรทัดใหม่ มันจะมองเป็น return; ที่มี ; เข้ามาให้เราเองเลย ทำให้สิ่งที่อยู่มนปีกกาไม่ถูกทำ เพราะคิดว่าทำจบแล้ว
    {
      name: 'Cheewathun'
    }
  }
  console.log('My name is ', getPerson1()); //My name is  undefined

  function getPerson2() {
    return {
      name: 'doctoey'
    }; //สรุปอย่าลืมใส่ ; ในการเขียน javascript
  }
  console.log('My name is ', getPerson2()); //My name is  { name: 'doctoey' }

  // 4. Checking Object Type
  const person = null; //Checking object type is wrong 
  if (typeof person === 'object') {
    console.log('Checking object type is wrong');
  }

  if (typeof person === 'object' && person !== null) {
    console.log('Checking object type is now working correctly');
  }
})();
