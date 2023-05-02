(() => {
  // เริ่มเขียนโค้ด
  function displayError(element, message) { //ฟังก์ชั่นโชว์ error
    const smallElement = element.parentElement.querySelector('small'); // <small></small> ไว้โชว์ error
    smallElement.innerText = message; //ให้แสดงข้อความ error ที่เราส่งมา
    element.classList.add('invalid'); // highlight สีแดง input ที่ error
    form.classList.add('invalid');
  }

  function displaySuccess() { //ฟังก์ชั่นโชว์ success
    document.body.innerHTML = ''; //ลบทั้งหมดไปก่อน จะโชว์แต่ข้อความ success

    const pElement = document.createElement('p');
    pElement.innerText = 'You have been logged in successfully';
    pElement.classList.add('success');
    document.body.appendChild(pElement); //เพิ่ม pElement ลงใน body
  }

  function resetState(element) { //ทำตรงข้ามกับ displayError
    const smallElement = element.parentElement.querySelector('small');
    smallElement.innerText = ''; //เอาข้อความ error ออก
    element.classList.remove('invalid'); //เอาสีแดงออก
    form.classList.remove('invalid'); 
  }

  function validateLength(element, min, max) { //element คือ input ที่จะ validate, min คือความยาวต่ำสุด, max คือความยาวสูงสุด
    const val = element.value; //เป็นค่าที่ user กรอกเข้ามา

    if (val.length < min || val.length > max) { //ถ้ามันอยู่นอกช่วงที่เราต้องการ จะโชว์ error
      const elementName = element.getAttribute('name'); //ดึง attribute name ของ input มา
      displayError(element, `${elementName} length must be between ${min} and ${max}`) //แสดง error ออกมา
    }
  }

  function validateEmail(emailElement) {
    const regex = /\S+@\S+\.\S+/; //regural expression ใช้ตรวจสอบว่าเป็น email จริงๆหรือไม่
    // / / ข้างในเป็น regular expression
    // \s เป็น string ที่มีความยาวมากกว่า 1 ตัว
    // + ตามมาด้วย
    // @ mail ต้องมี @ อะ
    // \. เอา "."  ปล ถ้าใส่เป็น "." โดยไม่มี / กั้น คือรับค่าเป็นอะไรก็ได้
    if (!regex.test(emailElement.value)) { //เช็คว่าค่าที่เราใส่มาถูกต้มมั้ยยย ถ้าถูกมันก็ไม่โชว์จ้า เช่น ใส่ chee.lgmail.com ไม่มี @ ก็ไม่ให้ submit
      displayError(emailElement, 'Email must be valid');
    }
  }

  function validateForm(event) {
    event.preventDefault(); //หลังจากเกิด event submit ตัวหน้าเว็บมีการ refresh นิดนึง ซึ่งเป็นเรื่องปกติของ event submit ให้ prevent event ออกไป เป็นการบอกว่าไม่ต้อง refresh หน้าเว็บ เราจะทำการ validate ตัว form ของเราด้วยตัวเอง

    const emailElement = document.getElementById('email'); //ดึง Input email มา
    const passwordElement = document.getElementById('password'); //ดึง Input password มา

    resetState(emailElement); //เวลาเราไม่ใส่ค่าอะไร ลองทำให้มันแดง ถ้าไม่ใส่ resetState มันจะยังแดงอยู่ แม้ใส่ค่าที่ถูกไปแล้ว
    resetState(passwordElement);

    validateLength(emailElement, 10, 20); //เมล์ความยาวต่ำสุด สูงสุด
    validateLength(passwordElement, 8, 20);

    validateEmail(emailElement); //เช็คว่าเป็น email จริงๆหรือไม่

    const isValidForm = !form.classList.contains('invalid'); //ถ้าไม่มี class invalid แสดงว่าไม่มี error แล้ว จะให้ isValidForm เป็น true
    if (isValidForm) { //ถ้าไม่มี error ให้โชว์ success
      displaySuccess();
    }
  }
  function run() {
    const formElement = document.querySelector('form'); //ดึง form มา
    formElement.addEventListener('submit', validateForm) //เมื่อ submit จะเรียกใช้ validateForm
  }

  run();
})();