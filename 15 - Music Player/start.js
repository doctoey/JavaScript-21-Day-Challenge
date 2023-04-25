(() => {
  // เริ่มเขียนโค้ด
  const audioElement = document.querySelector('audio');//เพลง
  const playButtonElement = document.querySelector('.play'); //ปุ่มเล่น
  const progressBarElement = document.querySelector('.progress-bar'); //แถบเลื่อนเวลา
  const startTimeElement = document.querySelector('.start-time'); //เวลาเริ่มต้น
  const endTimeElement = document.querySelector('.end-time'); //เวลาสิ้นสุด

  function onClick() {
    if (audioElement.paused) { //ถ้าเพลงหยุดเล่นอยู่ ก็เล่นเพลง
      audioElement.play(); //เล่นเพลง แต่มันไม่เปลี่ยนเป็นปุ่ม pause อะ ต
      playButtonElement.className = 'pause'; //ต้องบอกมันว่ากดปุ้บ เปลี่ยนเป็นปุ่ม pause นะ
    } else { //ตรงข้าม //ถ้าเพลงเล่นอยู่ ก็หยุด
      audioElement.pause(); //หยุดเพลง
      playButtonElement.className = 'play'; //ต้องบอกมันว่ากดปุ้บ เปลี่ยนเป็นปุ่ม play นะ
    }
  }

  function getDuration(time) {
    const minutes = Math.floor(time / 60 % 60).toString(); //mod ด้วย 60 เผื่อเวลามากกว่า 1 ชั่วโมง
    const seconds = Math.floor(time % 60).toString().padStart(2, '0'); //padStart ถ้ามันไม่ใช่ 2 ตำแหน่ง ให้ใส่ 0 ไปด้วย เช่น 01 02 ... 09 จนกว่าจะ 10 จะแสดงผลปกติ

    return `${minutes}:${seconds}`;
  }

  function onTimeUpdate() {
    startTimeElement.innerHTML = getDuration(audioElement.currentTime); //เวลาฝั่งซ้าย//audioElement.currentTime มีค่าเป็นวินาที เลยไปแปลงเป็นเวลาที่เราเห็นได้ ด้วยฟังก์ชั่นด้านบน
    progressBarElement.value = audioElement.currentTime; //เซ็ตค่า progressBar เป็นเวลาปัจจุบันของเพลง
  }

  function onLoadedData() {
    endTimeElement.innerHTML = getDuration(audioElement.duration); //เวลาฝั่งขวา
    progressBarElement.max = audioElement.duration; //เซ็ท progressBar ให้มีค่า max เท่ากับ duration ของเพลง
  }

  function onInput() {
    audioElement.currentTime = progressBarElement.value; //เลื่อน progressBar ไป ก็จะ seek เพลงไปด้วย
  }

  function onEnded() {
    playButtonElement.className = 'play'; //เพลงจบแล้ว ก็เปลี่ยนปุ่มกลับเป็น play
    audioElement.currentTime = 0; //ย้อนเวลากลับไป 0
  }

  function run() {
    playButtonElement.addEventListener('click', onClick); //ปุ่ม play ปุ้มเล่น

    audioElement.addEventListener('timeupdate', onTimeUpdate); //เวลาของเพลง
    audioElement.addEventListener('loadeddata', onLoadedData); //เช็คว่าเพลงโหลดเสร็จยัง ถ้าเสร็จแล้ว แสดง duration และ set ค่า max ของ progressBar
    audioElement.addEventListener('ended', onEnded); //เล่นจบแล้ว ไปไหนต่อ ให้เปลี่ยนปุ่มกลับเป็นปุ่ม play และย้อน progressBar เป็น 0

    progressBarElement.addEventListener('input', onInput); //แถบเวลาของเพลง มันต้อง seek ได้ด้วย
  }

  run();

})();