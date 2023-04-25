(() => {
  // เริ่มเขียนโค้ด
  let currentIndex = 0;

  function displayImage(imageElements, newIndex) {
    const lastIndex = imageElements.length - 1;

    if (newIndex < 0) { //เพิ่ม condition ว่า ถ้าได้ index มาน้อยกว่า 0 แล้ว ให้แสดงรูปสุดท้ายในชุดนี้
      newIndex = lastIndex;
    } else if (newIndex > lastIndex) { //ถ้ารูปสุดท้ายหละ ก็เหมือนกัน index เกิน ให้แสดงรูปแรก เหมือนเดิม (index = 0)
      newIndex = 0;
    }

    const newImage = imageElements[newIndex]; //ดึงรูปปัจจุบันมาก่อน
    newImage.scrollIntoView({ behavior: 'smooth'}); //เลื่อนรูปนี้มาที่หน้าจอเรา

    currentIndex = newIndex //อย่าลืม update currentIndex ด้วย หลังเลื่อนรูป
  }

  function run() {
    const imageElements = document.querySelectorAll('img'); //ดึงรูปทั้งหมดออกมา 4 รูป
    const previousButtonElement = document.querySelector('.previous'); //ปุ่มกลับ
    const nextButtonElement = document.querySelector('.next'); //ปุ่มไป

    previousButtonElement.addEventListener('click', () => displayImage(imageElements, currentIndex - 1)); // แตก index เริ่ม 0 แล้วไป -1 แตกกกกก
    nextButtonElement.addEventListener('click', () => displayImage(imageElements, currentIndex + 1));
  }

  run();

})();
