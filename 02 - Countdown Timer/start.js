(() => {
  // เริ่มเขียนโค้ด
  const SECOND = 1000; //1000ms = 1s
  const MINUTE = SECOND * 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  function setElemInnerText(id, text) {
    const element = document.getElementById(id);
    element.innerText = text;
  }

  function countDown() {
    const now = new Date().getTime();
    const newYear = new Date('December 31, 2023 23:59:59').getTime();
    const unixTimeLeft = newYear - now;

    // const daysElem = document.getElementById('days');
    // daysElem.innerText = Math.floor(unixTimeLeft / DAY);
    setElemInnerText('days', Math.floor(unixTimeLeft / DAY));
    setElemInnerText('hours', Math.floor(unixTimeLeft % DAY / HOUR));
    setElemInnerText('minutes', Math.floor(unixTimeLeft % HOUR / MINUTE));
    setElemInnerText('seconds', Math.floor(unixTimeLeft % MINUTE / SECOND));

    // const hoursElem = document.getElementById('hours');
    // hoursElem.innerText = Math.floor(unixTimeLeft % DAY / HOUR);
    
  }

  function run() {
    countDown()

    setInterval(countDown, SECOND);
  }

  run()
})();
