(() => {
  // เริ่มเขียนโค้ด
  const canvas = document.getElementById('painting'); //เอาไอดีมา ใน index.html
  canvas.width = window.innerWidth; //ค.กว้างให้เท่ากับขนาด window
  canvas.height = window.innerHeight; //ค.สูงให้เท่ากับขนาด window

  const context = canvas.getContext('2d'); //ตัวที่ใช้วาด

  let previousPoint = { x: 0, y: 0 }; // fix ไปก่อน

  function getDistance(previousPoint, currentPoint) { //อยากให้ลากเมาส์ไวๆ แล้วเส้นเล็กใหญ่เล็กตามจังหวะเร็วช้า
    return Math.sqrt((previousPoint.x - currentPoint.x) **2 + (previousPoint.y - currentPoint.y) **2 ) 
  }

  function onMouseMove({ pageX, pageY}) { // track ว่า mouse move ไปทางไหน ดึงด้วย object destructuring
    const currentPoint = { x: pageX, y: pageY }; //จุดปัจจุบันที่เมาส์เราอยู่

    context.beginPath(); //เริ่มวาด

    context.lineCap = 'round'; //ปกติจุดจบเส้นจะเหลี่ยม เลยเซทเป็นวงกลม
    context.lineJoin = 'round'; //จุดตัดเส้น มันจะเหลี่ยม เลยเซทเป็นวงกลม
    const distance = getDistance(previousPoint, currentPoint) //ระยะทางที่มันเกิดขึ้น
    context.lineWidth = Math.random() / distance * 40; //ความกว้างเส้น ลากเร็วๆ ค่าจะต่ำลงคือเส้นมันเล็ก เหมือนพู่กัน

    const opacity = Math.min(0.5, 1 / distance); // distance ถ้าต่ำมากๆ เส้นจะเข้มเกิน (เพราะมันเป็นตัวหาร)เลยตั้ง min 0.5 ไว้ จะได้ไม่มีทางค่าเกิน 0.5 ถ้า 1/distance เยอะๆ
    context.strokeStyle = `rgba(255, 10, 109,${opacity})`; //สีของเส้นที่วาด สีชมพูๆ

    context.moveTo(previousPoint.x, previousPoint.y); //จุดเริ่มต้นของที่เราจะวาด ในที่นี้คือ 0,0
    context.lineTo(currentPoint.x, currentPoint.y); //จุดที่เมาส์เราอยู่ปัจจุบัน

    context.stroke(); //เริ่มวาดเส้น
    context.closePath(); //วาดเสร็จแล้วจบตรงนี้เลย

    previousPoint = currentPoint; //ลากแล้วไม่เริ่มใหม่จาก 0,0
    
  }

  function onMouseEnter({ pageX, pageY}) { //ทำงานเมื่อเราลากเมาส์เข้าไปในแคนวาส
    previousPoint = pageX; 
    previousPoint = pageY;
  }

  function run(){
    canvas.addEventListener('mousemove', onMouseMove); //ทำงานเมื่อลากเมาส์
    canvas.addEventListener('mouseenter', onMouseEnter); //ทำงานเมื่อลากเมาส์เข้าไปในแคนวาส ไม่ให้มันทำงานจาก 0,0
  }
  run()
})();
