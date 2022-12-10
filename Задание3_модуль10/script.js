// 1. Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
//    Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
//    При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
//    Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить 
//    в чат.
// 2. Добавить в чат механизм отправки гео-локации. При клике на кнопку «Гео-локация» 
//    необходимо отправить данные серверу и в чат вывести ссылку на 
//    https://www.openstreetmap.org/ с вашей гео-локацией. 
//    Сообщение, которое отправит обратно эхо-сервер, не выводить.




const input = document.querySelector('.inputMessage');
const btnSend = document.querySelector('.btnSendMessage');
const poleChat = document.querySelector('.pole-chat');
const vivod = document.querySelector('.vivodMessage');

const webSocket = new WebSocket('wss://echo-ws-service.herokuapp.com');

    webSocket.onmessage = function(e) {
      writeToScreen(`<b>Эхо-сервер:</b> ${e.data}`, 'flex-start');
    };
    

function writeToScreen(message, position='flex-end') {
	const element = `
        <p class='messages' style='align-self: ${position}'>
            ${message}
        </p>
    `;
	vivod.innerHTML += element;
	poleChat.scrollTop = poleChat.scrollHeight;
  }

  btnSend.addEventListener('click', () => {
    const message = input.value;
    webSocket.send(message);
    writeToScreen (`<b>Вы:</b> ${message}`);
    input.value = '';
});





function pageLoaded() {
  const btn = document.querySelector(".btnGeo");

  btn.addEventListener("click", getLocation);

  function getLocation() {
    if ("geolocation" in navigator) {
      let locationOptions = {
        enableHighAccuracy: true
      };
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions); 
    } else {
      writeToScreen('Ваш браузер не поддерживает функцию определения местоположения');
    }
  }

  function locationSuccess(data) {
    let link = `https://www.openstreetmap.org/#map=18/${data.coords.latitude}/${data.coords.longitude}`
    //`https://www.openstreetmap.org/${data.coords.longitude},${data.coords.latitude}`;
    writeToScreen (`<a  href='${link}' target='_blank'>Ваша гео-локация</a>`);
  }

  function locationError() {
    writeToScreen ("При определении местоположения произошла ошибка");
  }

  function writeOutput (message) {
    poleChat.innerHTML = `<p>${message}</p>`;
  }
}
document.addEventListener("DOMContentLoaded", pageLoaded);

