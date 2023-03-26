(() => {
  // เริ่มเขียนโค้ด

  // 1. How Asynchronous code works in JavaScript
  // function simulateAsyncAPI(text, timeout) {
  //   setTimeout(() =>  console.log(text), timeout); //ทำงานเป็น aysnc 
    
  // }

  // simulateAsyncAPI('A', 1000); // a หลังสุด ตั้งเวลาไว้ 1 วิ
  // simulateAsyncAPI('B', 500); // b ตามมา ตั้งไว้ 0.5 วิ
  // simulateAsyncAPI('C', 100); // c จะออกมาก่อน เพราะตั้งเวลาไว้ 0.1 วิ   // c b a

  // 2. Callback
  // function simulateAsyncAPI(text, timeout, callback) { //asynchronous รับตัว callback เข้าไป 
  //   setTimeout(() => { //หลังจากทำเสร็จ ถึงค่อยเรียกใช้งาน callback function ที่เรา pass เข้าไป
  //     console.log(text)

  //     if (callback) {
  //       callback()
  //     }
  //   }, timeout);
  // }

  // simulateAsyncAPI('A', 1000, () => { //ผ่านไป 1 วิ จะเรียกใช้ console.log(text) แล้วปริ้น A ออกมา
  //   console.log('Callback');  //หลังจากปริ้น A จะเรียกใช้ callback function // จะได้เป็น A callback 
  // });  // () => คือฟังก์ชั่น callback

  // simulateAsyncAPI('A', 1000, () => {  // จะได้ A B C 
  //   simulateAsyncAPI('B', 500, () => {
  //     simulateAsyncAPI('C', 100, () => {
  //     });
  //   });
  // });

  //ถ้าเยอะๆ จะเรียก calback hell วงเล็บปีกกาเพียบ พรึ่บๆ งง
  /*
  หรือเขียนแบบนี้ก็ได้
  simulateAsyncAPI('A', 1000, () => {
    simulateAsyncAPI('B', 500, () => {
      simulateAsyncAPI('C', 100);
    });
  });
  */
  //ไม่อยากได้ callback hell เลยเกิด promise ขึ้นมานั่นเอง

  // 3. Promise

  // function simulateAsyncAPI(text, timeout) {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (text === 'B') return reject('B got rejected');
  //       console.log(text);
  //       resolve();
  //     }, timeout);
  //   });
  // }

  // simulateAsyncAPI('A', 1000)
  //   .then(() => {
  //     console.log('Promise')    // A  Promise
  //   })

    // simulateAsyncAPI('A', 1000)
    // .then(() => { //เรียกใช้ .then ไปเรื่อยๆ
    //   return simulateAsyncAPI('B', 500);    // มันจะรอตัว A ทำงานเสร็จก่อน ค่อยรัน B
    // })
    // .then(() => {
    //   return simulateAsyncAPI('C', 100);   // รอ A B ทำงานก่อน ค่อยรัน C
    // })
    // .catch((error) => {  //.catch ถูกเรียกเมื่อเกิด error ขึ้น 
    //   console.log(error);  //ลองใส่ text === B ให้มันแสดง error ดู มันจะได้ B got rejected
    // })
 //อาจจะอ่านค่อนข้างยาก เลยเกิด async/await

  // 4. Async/Await การทำงานเหมือน promise ใช้ฟังก์ชั่นเดียวกันได้

  function simulateAsyncAPI(text, timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (text === 'B') return reject('B got rejected');

        console.log(text);
        resolve();
      }, timeout);
    });
  }

  async function run() {
    try { //ถ้าไม่ใส่ try ครอบ จะพบ error เนื่องจากเรายังไม่ได้ handle error ที่ throw มาจาก asynchronous นั่นเอง
      await simulateAsyncAPI('A', 1000); //หยุดรอจนกระทั่ง A ทำงานเสร็จ
      await simulateAsyncAPI('B', 500);  // B got rejected ถ้าใส่ text === B
      await simulateAsyncAPI('C', 100);  //ถ้าไม่มี if ก็ทำงานปกติเลย A B C ถ้ามี ก็หยุดที่ B 
    } catch (error) {
      console.error(error);
    }
  }
  run();

})();
