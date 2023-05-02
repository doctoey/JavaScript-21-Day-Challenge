(() => {
  // เริ่มเขียนโค้ด
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; //ถ้าตัวซ้ายมี ใช้ตัวซ้าย ถ้าตัวซ้ายไม่มี ใช้ตัวขวา

  const recognition = new window.SpeechRecognition();
  const buttonElement = document.querySelector('.control'); //ปุ้มที่เรากดก่อนพูด

  function onResult(event) { //ตอนพูด มันจะเกิด transcript ขึ้นมา ว่ามะกี้เราพูดอะไรไปบ้าง
    const textElement = document.querySelector('.text');
    const { transcript } = event.results[0][0]; //ดึงด้วย destructuring ออกมา
    textElement.innerText += transcript; //เอา transcript มาแสดงผล แต่ตัว reccord มันหยู้ดดดดดด ไม่ตอเนื่อง // มันทับของเก่า ของใช้ += แทน เพิ่มให้มันเพิ่มเรื่อยๆ
  }

  function onEnd() { //เมื่อหยุดพูด มันจะเกิดอีเว้นต์ end ขึ้นมา
    const isRecording = buttonElement.classList.contains('pause'); //เช็คว่ามัน record อยู่หรือไม่ ถ้ามี class pause คือมัน record อยู่

    if (isRecording) { //ถ้ามัน record อยู่ ก็ให้เริ่ม record ใหม่ อัตโนมัติ ไม่หยุด ขาดตอนแล้ว
      recognition.start();
    }
  }

  function onClick() {  //ทำงานเมื่อคลิก
    const ifPausing = buttonElement.classList.contains('record'); //เช็คว่ากำลัง record อยู่หรือไม่

    if (ifPausing) { //ถ้ามัน pause อยู่ ก็ให้ record 
      recognition.start();
      buttonElement.classList.remove('record'); //ตอนกดปุ่ม จะเปลี่ยนจาก record เป็น pause ลบ class record แล้วเพิ่ม class pause
      buttonElement.classList.add('pause');
    } else {
      recognition.stop(); //เหมือนด้านบน แค่กลับด้าน เวลาไม่ record แล้ว ก็ให้เปลี่ยนจากรูป pause เป็น record
      buttonElement.classList.remove('pause');
      buttonElement.classList.add('record');
    }
  }
 
  function run() {
    recognition.lang = 'th-TH'; //ภาษาที่เราพูด
    recognition.addEventListener('result', onResult); //ทุกครั้งที่พูด จะเกิดฟังก์ชั่น onResult
    recognition.addEventListener('end', onEnd);  //เมื่อหยุดพูด มันจะเกิดอีเว้นต์ end ขึ้นมา

    buttonElement.addEventListener('click', onClick); //ใส่ event click ให้ปุ่ม
  }

  run();
})();