(() => {
  // เริ่มเขียนโค้ด
  function run() {
    const bodyElement = document.querySelector('body'); //ดึง body มาหมดเลย
    const eyeElement = document.querySelectorAll('.eye'); //ดึง eye ทุก element สองอัน ไม่ใช่ eyes นะ ดูดีๆ
    
    function onMouseMove( {pageX, pageY} ) {
      eyeElement.forEach((eyeElem)=>{  //ดึงตาแต่ละอันออกมา
        const { left, top } = eyeElem.getBoundingClientRect(); // return ค่าตำแหน่งลูกตาออกมา

        const eyeCenterX = left + eyeElem.offsetWidth / 2; //หาจุดศูนย์กลางของดวงตา
        const eyeCenterY = top + eyeElem.offsetHeight / 2;
        const radian = Math.atan2(pageX - eyeCenterX, pageY - eyeCenterY);
        const angle = radian * 180 / Math.PI * -1;
        eyeElem.style.transform = `rotate(${angle}deg)`;
      });

    }

    bodyElement.addEventListener('mousemove', onMouseMove); //ดึง element ของ body แล้วเพิ่ม event listener  เพื่อฟังการเคลื่อนไหวตอนเลื่อนเม้าส์
  }
  run();
})();
