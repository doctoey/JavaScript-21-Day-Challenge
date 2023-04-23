(() => {
  function onScroll() {
    const sectionElems = Array.from(document.querySelectorAll('section')); // ดึงออกมาไม่ใช่ array มันดึงมาเป็น nodelist เลยครอบด้วย array.from

    sectionElems.forEach(sectionElem => { //argument sectionElems แต่ละอัน
      const imgElem = sectionElem.querySelector('img'); // ดึง img ออกมา
      const textElem = sectionElem.querySelector('.text'); // ดึง class text ออกมา

      const revealPosition = imgElem.offsetTop + imgElem.offsetHeight / 10;  //เมื่อเรา scroll ไป 1/10 ของ img แล้ว จะเริ่มแสดง text //ตำแหน่งที่แสดง text คือ ค่าสูงสุดของรูปเรา imageElement.offsetTop บวกกับความสูงของรูปหารด้วย 10 
      const scrollPosition = window.pageYOffset; //เราจะดูว่าเลื่อนจอไปเท่าไหร่ (scroll ไปเท่าไหร่)

      if (scrollPosition >= revealPosition) { //าเรา scroll ไปแล้วมากกว่าหรือเท่ากับ revealPosition ก็ให้แสดง text ขึ้นมา โดยให้ textElement เพิ่ม class reveal เข้าไป  //เริ่ม text opacity 0 แต่ reveral opa = 1 
        textElem.classList.add('reveal');
      }
    });
  }

  function run() {
    document.addEventListener('scroll', onScroll); //เหมือนเดิม เมื่อ scroll ให้้เรียกใช้ฟังก์ชั่น onScroll
  }

  run();
})();
