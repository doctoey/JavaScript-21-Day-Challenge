(() => {
  // เริ่มเขียนโค้ด
  const carBrands = [
    'BMW',
    'Masserati',
    'Mitsubishi',
    'Mercedes Benz',
    'Ferrari',
    'Lamborghini',
    'Ford',
    'Nissan',
    'Toyota',
    'Honda',
    'Hyundai'
  ];

  const searchElement = document.querySelector('.search'); //ดึง class search มาใช้

  function onInput(event) {
    clearResults();

    const inputText = event.target.value.toLowerCase(); //event.target.value มันคือค่าใน value ที่เราใช้ได้ และ ใช้ toLowerCase ให้มันหาให้เจอไม่ว่าจะพิมพ์เป็นตัวใหญ่หรือเล็กก็เจอ
    const matchedCarBrands = carBrands.filter(carBrand => carBrand.toLowerCase().startsWith(inputText)); //เช่น พิมพ์ m มันก็เด้ง Masserati, Mitsubishi, Mercedes Benz

    const ulElement = document.createElement('ul'); //สร้างตัว dropdown ขึ้นมา มี ul ก่อน และ li ต่อ
    ulElement.classList.add('results');

    matchedCarBrands.forEach(carBrand => { //วนด้วย forEach
      const liElement = document.createElement('li');
      liElement.innerText = carBrand //เซ็ท text ด้านใน
      liElement.onclick = selectCarBrand; //เมื่อคลิกเลือก จะเรียกใช้ function selectCarBrand
      ulElement.appendChild(liElement); //add li เข้าไปใน ul
    });
    document.body.appendChild(ulElement); //add ul เข้าไปใน body
  }

  function selectCarBrand(event) { // รับ event มาจาก onclick
    searchElement.value = event.target.innerText; //ต้องการดึงค่า text มันออกมา คือ innerText
    clearResults(); //เลือกเสร็จ ให้ dropdown หายไป
  }

  function clearResults() { 
    const ulElement = document.querySelector('.results'); //ดึงตัว ul ออกมา
    if (ulElement) { //ถ้าดึงมาแล้วมันมีอยู่จริง ก็ให้ลบมันออกไป๊
      document.body.removeChild(ulElement);
    }
  }

  function run() {
    searchElement.addEventListener('input', onInput); //เมื่อพิมพ์คำต่างๆใน Input field
    document.addEventListener('click', clearResults); //คลิกแล้วเคลียร์ dropdown ทิ้ง คลิกที่ any where ในหน้าเว็บ
  }

  run();
})();