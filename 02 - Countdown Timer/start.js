(() => {
  // เริ่มเขียนโค้ด
  const SECOND = 1000; //1000ms = 1s
  const MINUTE = SECOND * 60; //60วิ = 1 นาที
  const HOUR = MINUTE * 60; // 1 ชม = 60 นาที
  const DAY = HOUR * 24; // 1 วัน 24ชม

  function setElemInnerText(id, text) { //ใช้หลายบรรทัด สร้างฟังก์ชั่นครอบเลยเร็วกว่า จะได้ไม่ต้องเขียนตรงที่คอมเมนต์ line 18-19
    const element = document.getElementById(id);
    element.innerText = text;
  }

  function countDown() {
    const now = new Date().getTime(); //วันเวลาปัจจุบัน ณ ตอนนี้
    const newYear = new Date('December 31, 2023 23:59:59').getTime(); //เวลาก่อนปีใหม่
    const unixTimeLeft = newYear - now;

    // const daysElem = document.getElementById('days');
    // daysElem.innerText = Math.floor(unixTimeLeft / DAY);
    setElemInnerText('days', Math.floor(unixTimeLeft / DAY));
    setElemInnerText('hours', Math.floor(unixTimeLeft % DAY / HOUR)); //คำนวณของ hours ต่อ โดยการ mod เอาวันออกก่อน
    setElemInnerText('minutes', Math.floor(unixTimeLeft % HOUR / MINUTE));
    setElemInnerText('seconds', Math.floor(unixTimeLeft % MINUTE / SECOND));

    // const hoursElem = document.getElementById('hours');
    // hoursElem.innerText = Math.floor(unixTimeLeft % DAY / HOUR);
    
  }

  function run() {
    countDown()

    setInterval(countDown, SECOND);  //จะเขียนว่า 1000 ก็ได้ แต่ในที่นี้เราตั้งไว้แล้ว ใช้แบบนี้สวยกว่า
  }//รันฟังก์ชั่นทุกๆ 1 วิ

  run()
})();
