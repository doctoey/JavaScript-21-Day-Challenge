(() => {
  // เริ่มเขียนโค้ด
  const KEY = 'r1zODW-QfbDpg87zn6UFfyPGOUceimiN9Ew9E3fA-BI';
  let page = 1; //เริ่มต้นให้ page = 1

  const loaderElement = document.querySelector('.loader'); //ดึง loader มาจาก html
  
  function showLoader() {   //มี loader แสดงตอนรอโหลดรูป
    loaderElement.classList.add('visible'); //เพิ่ม class visible ให้ loaderElement
  }

  function hideLoader() {
    loaderElement.classList.remove('visible'); //โหลดเสร็จ ลบบบบบบ ซ่อนตัวทิ้งไปซ้า
  }

  async function displayImages() {
    showLoader(); //จุดสามจุด ตอนรอโหลดรูป

    const result = await fetch(`https://api.unsplash.com/search/photos/?client_id=${KEY}&page=${page}&query=universe`); //async จะรอให้ fetch เสร็จก่อน ถึงจะทำต่อได้
    const images = await result.json();

    const galleryElement = document.querySelector('.gallery'); //เอาไว้เก็บรูปที่ดึงมาจาก unsplash

    images.results.forEach(image => {
      const imageElement = document.createElement('img');
      imageElement.src = image.urls.small; //แสดงรูป size small พอ
      imageElement.alt = image.alt_description; //เราจะให้ alt ของรูปเป็นอะไร ให้เป็น alt_description ของรูป
      
      galleryElement.appendChild(imageElement);
    });

    page += 1; //โหลดรูปเสร็จ เพิ่ม page ทีละ 1
    hideLoader(); //โหลดเสร็จ ไม่มีจุดสามจุดแล้ว
  }

  function onScroll() { //รู้ก่อนว่า scroll ถึงไหน ค่อยโหลด
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) { // scrollTop เริ่มต้น บนสุด เป็น 0 , clientHeight ความสูงหน้าจอปัจจุบัน ค่าคงที่เสมอ , scrollHeight ความสูงทั้งหมดของหน้าจอ ,, scrollTop + clientHeight = scrollHeight แสดงว่า scroll ถึงด้านล่างสุดแล้ว
      //ถ้า scroll ถึงด้านล่างเกือบสุด ให้โหลดรูปต่อ ล่างเกือบสุดในที่นี้คือ ความสูงหน้าจอ(scrollHeight) - 10 
      displayImages();
    }
  }

  function run() {
    document.addEventListener('scroll', onScroll);
    displayImages(); //ดึง Image จาก unsplash มาแสดง
  }

  run();
})();