(() => {
  // เริ่มเขียนโค้ด
  const message = new SpeechSynthesisUtterance();

  function onVoicesChanged() {
    const voices = speechSynthesis.getVoices(); // ดึงเสียงทั้งหมดที่เราสามารถใช้ได้
    console.log(voices) //ในคลิปมี th-TH แต่ตอนทำไม่มีแล้ว เลยเปลี่ยนเป็น en-US แทน
    const enVoice = voices.find(voice => voice.lang === 'en-US'); //ถ้าเจอภาษาอังกฤษ
    message.voice = enVoice;
  }

  function onclick(event) {
    message.text = (event.target).getAttribute('alt'); //ดึง alt ออกม๊า โดยใช้ event.target คือ element ที่เรากด
    speechSynthesis.speak(message);
  }

  function run() {
    speechSynthesis.addEventListener('voiceschanged', onVoicesChanged); //speechSynthesis เป็น object ที่ใน browser จะสร้างให้เราอัตโนมัติ

    const imageElements = Array.from(document.querySelectorAll('img')); //ดึง img ทั้งหมดออกมา แต่มันเป็น node list เลยครอบด้วย array.from ให้เป็น array
    imageElements.forEach(imageElement => imageElement.addEventListener('click', onclick));
  }

  run();

})();