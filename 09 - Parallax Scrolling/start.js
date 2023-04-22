(() => {
  // เริ่มเขียนโค้ด
  function onScroll() {
    const moonElem = document.querySelector('.moon');
    const wishElem = document.querySelector('.wish');

    // console.log(window.scrollY); //เลื่อน scroll ไปด้านล่าง ค่าจะเพิ่ม ขึ้นลดลงเรื่อยๆ จนเป็น 0
    moonElem.style.transform = `translate(${window.scrollY * 0.7}%, ${window.scrollY * -0.7}%)`; //เลื่อนขวา + บน(ขึ้น)
    wishElem.style.transform = `translateY(${window.scrollY * -1.2}%)`; //เลื่อนบน(ขึ้น)อย่างเดียว
  } 

  function run() {
    document.addEventListener('scroll', onScroll);
  } 

  run();
})();
