(() => {
  // เริ่มเขียนโค้ด
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //เหมือนอันก่อนหน้า ที่ + min กลับไปด้วย random ตั้งแต่ min ถึง max
  }

  function createDucks(){
    return [...Array(5)].map(() => { //spread syntax //array มี 5 อัน
      return { //return object 
        x: random(0, window.innerWidth), //ซ้ายสุดของจอ ถึงขวาสุด
        y: window.innerHeight, // เริ่มบินจากล่างจอ
        speedX:random(-50, 50), //บินซ้ายขวา
        speedY:random(5, 10) // บินขึ้นอย่างเดียว
      };
    });
  }

  function setupDuckElement(duck) { 
    const duckElem = document.createElement('div'); //สร้าง div 5อัน ตาม array ที่มี 5 อัน
    duckElem.className = 'duck'; //ตั้ง class duck ให้มัน
    duckElem.style.left = `${duck.x}px`; //เอาพิกัด x,y ที่มีข้างบนในตัวเป็ดแต่ละอัน มาเซทค่าเป็นพิกัด x กับ y//ระวัง ค่าที่รับควรเป็น pixel เลยใช้ template string มาช่วย
    duckElem.style.top = `${duck.y}px`; //เสร็จ line 19 20 21 22 จะได้ <div class="duck" style="left:a px top:a px"> </div>    /// 5 ก้อน
    duckElem.style.backgroundImage = 'url(./left-1.png)' //โชว์รูปเป็ด
    document.body.appendChild(duckElem); //add element เข้าไปเป็นลูกของมัน //add element to body บรรทัด 22 แค่สร้าง ยังไม่ได้ add to HTML 

    return { duck, duckElem };
  }

  function getDuckBackgroundImage(duck, duckElem) { //สลับรูป เพื่อให้ปีกขยับ
    const direction = duck.speedX > 0 ? 'right' : 'left'; //ถามว่่าทิศทางที่จะบินอะ มันบินไปซ้ายหรือขวา // short form ของ if condition โดย สิ่งที่อยู่ก่อนหน้า ? คือ condition ถ้าจริง return right เท็จ left
    return duckElem.style.backgroundImage.indexOf('1') !== -1 ? //เช็คว่าไอเนี่ยรูป 1 หรือ 2 ถ้ามันรีเทรินเป็น -1 คือมันไม่มีเลข 1 (indexOf เช็ค)ดังนั้นเช็คว่า ไม่เท่ากับ -1 คืออันเนี้ยรูป 1 มั้ย
    `url(./${direction}-2.png)` : //ถ้ามันไม่ใช่รูป 1 ให้รีเทรินรูป 2 (left-1.png left-2.png)
    `url(./${direction}-1.png)`
  }

  function moveDuck(duckElem, duck) { //ฟังกชั่นเคลื่อนไหวตัวเป็ด
    const { left, top } = duckElem.getBoundingClientRect(); //รีเทรินตำแหน่งของ element 
    const outOfBoundX = duck.x < 0 || duck.x > window.innerWidth; //เช็คว่าเป็ดมันออกจากจอ? ถ้า < 0 คือหลุดขอบซ้าย  , > window.innerWidth คือหลุดขอบขวา
    const outOfBoundY = duck.y < 0 || duck.y > window.innerHight; //  < 0 ขอบบน  , > window.innerHight ขอบล่าง

    if (outOfBoundX) { //ถ้าหลุดขอบ x ขอบซ้ายขวา
      duck.speedX *= -1 //กลับทิศทาง ให้มันกลับจากขอบที่หลุด
    }

    if (outOfBoundY) { //ถ้าหลุดขอบ y ขอบบนล่าง
      duck.speedY *= -1
    }

    duck.x = left + duck.speedX; //ตำแหน่ง บวกกับสปีด คือตำแหน่งใหม่
    duck.y = top - duck.speedY; //เคลื่อนที่ขึ้นบนเรื่อยๆ
    duckElem.style.left = `${duck.x}px`;
    duckElem.style.top = `${duck.y}px`;

    duckElem.style.backgroundImage = getDuckBackgroundImage(duck, duckElem); //เป็ดควรจะมีสองรูป เลยสร้างฟังก์ชั่น getDuckBackgroundImage
  }

  function shootDuck(event) { //ฟังก์ชั่นยิงเป็ด
    const duckElem = event.target; //จะได้รู้ว่ายิงเป็ดตัวไหน
    duckElem.style.transition = 'top 2s'; //ยิงแล้วตุย เลื่อนไปข้างล่าง transition เป็น animation อันนึง แบบว่าพอเปลี่ยนค่า top แล้ว ให้เลื่อนไปหา top ใหม่ (คือยิงเป็ดตก)
    duckElem.style.top = `${window.innerHeight}px` // ตั้งค่า top ใหม่ ที่เป็ดจะเลื่อนลงไป ให้จากตำแหน่งปัจจุบัน ไปสุดขอบด้านล่าง

    clearInterval(duckElem.interval); //ตอนยิง ต้องการให้เป็ดหยุดบิน เลย clearinterval ทิ้ง
    setTimeout(() =>{
      document.body.removeChild(duckElem); //ลบเป็ดออก

      const duck = document.querySelector('.duck'); //จะเช็คว่ายังมี class duck อยู่ไหม

      if (!duck) { //เป็ดหมดจอ ไม่มี class duck แล้ว
        const winningElem = document.querySelector('.winning'); //ไปหา class winning ใน html
        winningElem.style.opacity = 1; //ตอนแรกตั้ง opacity = 0 ไว้ เซทให้เป็น1 จะได้โชว์
      }
    }, 2000); //หลังจากสองวิ ให้เรียกใช้ฟังก์ชั่นนี้
  }

  function run() {
    const ducks = createDucks();
    const duckElems = ducks.map(setupDuckElement) //สร้างเป็นเป็ดแต่ละตัว ใช้ map เวลาเรียกใช้มันจะ paste เป็ดแต่ละตัวออกมา //เป็น array

    duckElems.forEach(({duck, duckElem}) => { // วน loop 
      duckElem.interval = setInterval(() => moveDuck(duckElem, duck), 100); //เป็ดมันเคลื่อนที่ครั้งเดียว เลยใช้ setinterval ทุก 0.1 วิ
      duckElem.addEventListener('click', shootDuck); //คลิ้กกกกกกกกกก
    });
  }

  run();
})();
