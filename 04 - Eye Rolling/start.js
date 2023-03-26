(() => {
  // เริ่มเขียนโค้ด
  function run() {
    const bodyElement = document.querySelector('body'); //ดึง body มาหมดเลย
    const eyeElement = document.querySelectorAll('.eye'); //ดึง eye ทุก element สองอัน ไม่ใช่ eyes นะ ดูดีๆ
    
    function onMouseMove( {pageX, pageY} ) { //pageX, pageY คือพิกัดของเมาส์เรา ตำแหน่งของเมาส์เรา
      eyeElement.forEach((eyeElem)=>{  //ดึงตาแต่ละอันออกมา

        //คำนวนพิกัดลูกตา
        //destructuring
        const { left, top } = eyeElem.getBoundingClientRect(); // return ค่าตำแหน่งลูกตาออกมา คำนวนบนซ้ายสุดของจอ จนถึงกรอบ div ของ eye สำหรับตาซ้าย ขวาก็เช่นกัน

        const eyeCenterX = left + eyeElem.offsetWidth / 2; //หาจุดศูนย์กลางของดวงตา
        const eyeCenterY = top + eyeElem.offsetHeight / 2;
        const radian = Math.atan2(pageX - eyeCenterX, pageY - eyeCenterY); //เวลาเมาส์เลื่อน ลูกตาจะเลื่อนกี่องศา //Math.atan2 เป็นฟังก์ชั่นที่ใช้คำนวน radian 
        const angle = radian * 180 / Math.PI * -1; // -1 คือตามันเริ่มต้นด้านล่าง ไม่ใช่ด้านบน
        eyeElem.style.transform = `rotate(${angle}deg)`;
      });

    }

    bodyElement.addEventListener('mousemove', onMouseMove); //ดึง element ของ body แล้วเพิ่ม event listener  เพื่อฟังการเคลื่อนไหวตอนเลื่อนเม้าส์ //onMouseMove คือฟังก์ชั่น
  }       

  run();
})();
