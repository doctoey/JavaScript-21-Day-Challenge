(() => {
  // เริ่มเขียนโค้ด ขึ้นขึ้น ลงลง ซ้ายขวา ซ้ายขวา b a

  const konamiCode = [ //เก็บลำดับขั้นของ key ที่ต้องกด
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
  ];

  let index = 0;

  function onKeyDown(event) {
    event.key === konamiCode[index] ? index++ : index = 0; //condition คือ event.key === konamiCode[index] //ถ้า ((key === ArrowUp)กดคีย์ถูก) ก็จะ index++ ไป ArrowUp , ถ้าเรากด ArrowUp อีกก็คือถูก มันก็จะบวก แล้วก็จะเช็ตต่อไป วนไปเรื่อยๆจนครบ แต่ถ้ากดผิด จะให้เริ่มใหม่ คือ index = 0
    console.log(event.key);

    if(konamiCode.length === index) { //ถ้าความยาวมันเท่ากับ ความยาวของ array แล้ว (กดถูกครบแล้ว) ให้รันฟังก์ชั่น startSnowing()
      startSnowing();  //ในอีกไฟล์นึง snow-falling.js
    }
  }

  function run() {
    document.addEventListener('keydown', onKeyDown); //เกิดขึ้นทุกครั้งที่เรากด key
  }
run();
})();
