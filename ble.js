let device = null;
let chracteristics = null;
let isConnetted = false;
let btnc = 0;

async function onButtonClick()
{
  let serviceUuid =        "cecd4734-910a-11eb-a8b3-0242ac130003"
  let characteristicUuid = "f8b7a080-910a-11eb-a8b3-0242ac130003"

  try {
    console.log('Requesting Bluetooth Device...');
    device = await navigator.bluetooth.requestDevice({
      filters: [
        { services: [serviceUuid] },
        { name: ["m5stack-bbled"] },
      ],
    });
  
    console.log('Connecting to GATT Server...');
    const server = await device.gatt.connect();

    console.log('Getting Service...');
    const service = await server.getPrimaryService(serviceUuid);

    console.log('Getting Characteristics...');
    characteristics = await service.getCharacteristics(characteristicUuid);

    isConnected = true;

    if (characteristics.length > 0) {
      const myCharacteristic = characteristics[0];

      console.log('Reading Characteristics...');
      const value = await myCharacteristic.readValue();
      const decoder = new TextDecoder('utf-8');
      console.log(decoder.decode(value));

      const encoder = new TextEncoder('utf-8');
      const text = 'hi!';

      await myCharacteristic.writeValue(encoder.encode(text));
      await myCharacteristic.startNotifications();

      myCharacteristic.addEventListener('characteristicvaluechanged', (event) => {
        const value = event.target.value;
        const decoder = new TextDecoder('utf-8');
        console.log(decoder.decode(value));
      });

      console.log('Waiting 60 seconds to receive data from the device...')
      await sleep(60 * 1000);
    }
  } catch(error) {
    console.log('Argh! ' + error);
  }
  
  if (device) {
    if (device.gatt.connected) {
      device.gatt.disconnect();
      console.log('disconnect');
      isConnected = false;
    }
  }
}

function sendData(e)
{
  if ( isConnected && characteristics != null ){
    if ( characteristics[0] != null ){

      const encoder = new TextEncoder('utf-8');
      let ch = characteristics[0];
     
      ch.writeValue(encoder.encode("Data from PC")).then(
        char => {ch.startNotifications();}
      );
    }
  }
}

function sendDataBlue(e)
{
  if ( isConnected && characteristics != null ){
    if ( characteristics[0] != null ){

      const encoder = new TextEncoder('utf-8');
      let ch = characteristics[0];
     
      ch.writeValue(encoder.encode("Blue")).then(
        char => {ch.startNotifications();}
      );
    }
  }
}

function sendDataRed(e)
{
  if ( isConnected && characteristics != null ){
    if ( characteristics[0] != null ){

      const encoder = new TextEncoder('utf-8');
      let ch = characteristics[0];
     
      ch.writeValue(encoder.encode("Red")).then(
        char => {ch.startNotifications();}
      );
    }
  }
}

function sendDataGreen(e)
{
  if ( isConnected && characteristics != null ){
    if ( characteristics[0] != null ){

      const encoder = new TextEncoder('utf-8');
      let ch = characteristics[0];
     
      ch.writeValue(encoder.encode("Green")).then(
        char => {ch.startNotifications();}
      );
    }
  }
}

let btn = document.getElementById('send_button');
btn.addEventListener('click',sendData );
let btnBlue = document.getElementById('send_button-blue');
btnBlue.addEventListener('click',sendDataBlue );
let btnRed = document.getElementById('send_button-led');
btnRed.addEventListener('click',sendDataRed );
let btnGreen = document.getElementById('send_button-green');
btnGreen.addEventListener('click',sendDataGreen );

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
