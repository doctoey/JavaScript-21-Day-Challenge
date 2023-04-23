(() => {
  // เริ่มเขียนโค้ด
  const KEY = '3b27e186-f2eb-4a55-bcda-1136a94724c8';

  async function getAirQuality({ city, state, country }) { //ใส่ parameter เป็น object ทำให้เราสามารถดึงค่า parameter มาใช้โดยไม่ต้องคำนึงถึงลำดับได้ 
    const response = await fetch( //funtion fetch ใช้ในการยิง api ต่างๆ //ตอนแรกได้ response 200
      `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=${KEY}`
    ); //ใช้ async นำหน้า function และ await นำหน้าตอน fetch() เพื่อรอให้เรียก API เสร็จก่อน
    const { data: { current } } = await response.json(); //เราจึงต้องแปลงให้เป็น json ก่อน แน่นอนว่าต้องทำหลังจากที่เรียก API เสร็จแล้ว จึงใส่ await เข้าไป
    const { pollution, weather } = current; // destructuring ชั้นนอกเป็น data และทำอีกชั้นนึงเป็น current เพื่อดึงอากาศ และค่าฝุ่นมาอีกรอบนึง และใช้ destructuring อีกชั้นนึง เพื่อดึง pollution กับ weather
    return { //แล้วก็ return ค่า aqi, temperature, humidity, wind ออกมา
      aqi: pollution.aqius,
      temperature: weather.tp,
      humidity: weather.hu,
      wind: weather.ws
    };
  }

  function displayAirQuality( { city, state, country, aqi, temperature, humidity, wind } ) { //จากนั้นเอาค่าต่างๆที่ได้นำไปแสดงในหน้าเว็บ

    const cityElem = document.querySelector('.city'); //ดึงนู่นนี่มาจาก html
    const stateCountryElem = document.querySelector('.state-country');
    const aqiElem = document.querySelector('.aqi > h1');
    const temperatureElem = document.querySelector('.temperature');
    const humidityElem = document.querySelector('.humidity');
    const windElem = document.querySelector('.wind');

    cityElem.innerText = city;
    stateCountryElem.innerText = `${state}, ${country}`;
    aqiElem.innerText = aqi;
    temperatureElem.innerText = `Temp: ${temperature}°C`;
    humidityElem.innerText = `Humidity: ${humidity}%`;
    windElem.innerText = `Wind: ${wind} m/s`;
  }
  
  function setAirQualityColor(aqi) { //แต่งสีตามค่า aqi
    if (aqi <= 50) { 
      document.documentElement.style.setProperty(
        '--current-aqi-color',
        'var(--good-aqi-color)'
      );
    } else if (aqi <= 100) {
      document.documentElement.style.setProperty(
        '--current-aqi-color',
        'var(--medium-aqi-color)'
      );
    } else {
      document.documentElement.style.setProperty(
        '--current-aqi-color',
        'var(--bad-aqi-color)'
      );
    }
  }

  async function run() { //ใช้ async นำหน้า function และ await นำหน้าตอน getAirQuality()
    const city = 'Sathon';
    const state = 'Bangkok';
    const country = 'Thailand';

    const { aqi, temperature, humidity, wind } = await getAirQuality({ city, state, country }); //function นี้พิเศษ ใส่ parameter เป็น object ทำให้เราสามารถดึงค่า parameter มาใช้โดยไม่ต้องคำนึงถึงลำดับได้ ช่วยแก้ปัญหาเวลาเรา pass ค่าไปหลายๆตัวแปร

    displayAirQuality( { city, state, country, aqi, temperature, humidity, wind } );

    setAirQualityColor(aqi);
  }

  run();
})();
