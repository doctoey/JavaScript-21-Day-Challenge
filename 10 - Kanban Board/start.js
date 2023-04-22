(() => {
  // เริ่มเขียนโค้ด
  let draggingElem;

  function onDragStart() {
    draggingElem = this; //this คือ task ที่กำลังถูกลาก 
  }

  function onDrop() {
    this.append(draggingElem); //เพื่อ add Elem เข้าไป 
    draggingElem = null; //เมื่อใส่เสร็จแล้ว reset ค่าให้เป็น null
  }

  function onDragOver(event) {
    event.preventDefault(); //event.preventDefault(); คือเป็นการ cancel behavior ปกติ ของ event นี้ออกไป เมื่อใส่ไปแล้วทำให้เราสามารถ drop ได้
  }
  
  function onDragEnter(event) {
    event.preventDefault();
  }

  function run() {
    const taskElems = Array.from(document.querySelectorAll('.task')); //querySelectorAll ดึงทั้งหมด แต่มันไม่เป็น array เลยครอบด้วย Array.from
    const dropZoneElems = Array.from(document.querySelectorAll('.drop-zone'));

    taskElems.forEach((taskElem) => {
      taskElem.addEventListener('dragstart', onDragStart); //เพิ่ม event listener ให้กับ task แต่ละตัว ให้สามารถลากการ์ดได้
    });

    dropZoneElems.forEach((dropZoneElem) => {
      dropZoneElem.addEventListener('drop', onDrop);
      dropZoneElem.addEventListener('dragover', onDragOver); //ปัญหาใน HTML5 ก็คือ มันไม่ drop มันจะเกิด event drop ไม่ได้ ถ้าไม่ทำการ prevent default ใน event dragOver และ dragEnter
      dropZoneElem.addEventListener('dragenter', onDragEnter);
    });
  }

  run();

})();
