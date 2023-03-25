(() => {
  // เริ่มเขียนโค้ด
  function setup() {
    const canvas = document.getElementById('falling-snow-canvas'); //เอาไอดีเข้ามาทำ
    canvas.width = window.innerWidth; //ความกว้างแคนวาส
    canvas.height = window.innerHeight; //ความสูงแคนวาส

    return { //return เป็น object
      canvas,
      canvasContext: canvas.getContext('2d'),
      numberOfSnowBalls: 250
    }
  }

  function random(min, max) {
    return Math.floor(Math.random() *(max - min + 1)) + min; //random สมมุติ random(5,10) หมายความว่า Math.random(max - min + 1)) คือ (10 - 5 + 1)) ได้ 5 นิดๆ Math.floor ปัดลงเป็น 5 + min อีก 5 = 10
  } //ดังนั้นจะสุ่มค่าตั้งแต่ 5-10 ไม่ใช่ 0-5 แบบปกติ เพราะ + min เข้าไป

  function createSnowBalls(canvas, numberOfSnowBalls) { //สร้างหิมะ
    return [...Array(numberOfSnowBalls)].map(() => {  //spread syntax
      return {
        x: random(0, canvas.width), //ซ้ายสุด จนถึงขวาสุด
        y: random(0, canvas.height), //บนสุด ถึง ล่างสุด
        opacity:random(0.5, 1), //ความสว่าง
        radius:random(0.5, 4), //ความใหญ่
        speedX: random(-5, 5), //บางลูกก็ขวา บางลูกก็ซ้าย
        speedY: random(1, 3) //ไม่ติดลบ ไม่อยากให้มันขึ้นให้ลงอย่างเดียว
      }
    });
  }

  function drawSnowBall(canvasContext, snowBall) {
    canvasContext.beginPath();//beginPath เป็นการบอก canvasContext ว่าเรากำลังจะเริ่มวาด
    canvasContext.arc(snowBall.x, snowBall.y, snowBall.radius, 0, Math.PI * 2) //.arc ไว้วาดรูปวงกลม //Math.PI * 2 = 2π สองพาย (พิกัด x,พิกัด y,ความใหญ่ของลูกหิมะ,องศาเริ่มต้นในการวาดรูป,องศาตอนจบจะวาดวงกลมต้อง2π )
    canvasContext.fillStyle = `rgba(255, 255, 255, ${snowBall.opacity})` //สีลูกหิมะ
    canvasContext.fill(); //เติมสีขาวลงไป สีขาวกำหนดข้างบน
  }

  function moveSnowBall(canvas, snowBall) { //ให้มันเคลื่อนไหว
    snowBall.x += snowBall.speedX; //ความเร็ว x
    snowBall.y += snowBall.speedY; //ความเร็ว y

    if (snowBall.x > canvas.width) { //ถ้าไอบอลติดขอบขวา 
      snowBall.x = 0   //ให้รีเซ็ตไปที่ขอบซ้าย 
    } else if (snowBall.x < 0) { //ถ้าไอบอลติดขอบซ้าย
      snowBall.x = canvas.width; //ให้มันไปทะลุด้านขวา
    }

    if (snowBall.y > canvas.height) { //ถ้ามันตกด้านล่าง
      snowBall.y = 0; //รีเซ็ท พิกัดเป็น 0 ใหม่
    }
  }

  function run() {
    const {canvas, canvasContext, numberOfSnowBalls} = setup(); //เรียกใช้ฟังก์ชั่น setup //object destructuring es6
    const snowBalls = createSnowBalls(canvas, numberOfSnowBalls); //เรียกใช้ฟังก์ชั่น createSnowBalls
    
    setInterval(() => { //ให้มันวนทำทุก 50 มิลลิเซก ms
      canvasContext.clearRect(0, 0, canvas.width, canvas.height) //ลบอันเก่า  เคลียตั้งแต่พิกัดไหน(0,0, เคลียไปเป็นจนเท่าไหร่ canvas.widt,canvas.height) ทั้งหน้า
      //drawSnowBall(canvasContext, snowBalls[0]) ลูกบอลเริ่มต้นที่ทำ มันมีลูกเดียวเอ๊ง ใครจะเขียนสองร้อยกว่าบรรทัด เรียก forEach 
      snowBalls.forEach((snowBall) => drawSnowBall(canvasContext, snowBall)); //ดึงลูกบอลแต่ละลูกออกมา สร้าง
      snowBalls.forEach((snowBall) => moveSnowBall(canvas, snowBall)); //ขยับทุกๆ 50 มิลิเซก
    }, 50);
  }
  run(); //เรียกใช้ function run ด้านบน
})();
