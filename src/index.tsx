import {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);

const url = 'ws://localhost:8080/open-topic/my-topic';
const websocket = new WebSocket(url);
websocket.onopen = () => {
  console.log('connection open');
  console.log('');

  console.warn('test')

  let t = 0;
  setInterval(() => {
    websocket.send(
      JSON.stringify([
        {
          key: ++t + '',
          value: 'This is a data',
        },
      ]),
    );
  }, 4000);
};

websocket.onerror = (e: Event) => {
  console.log('error', e);
  console.log('');
};

websocket.onclose = (e: Event) => {
  console.log('close', e);
  console.log('');
};

websocket.onmessage = (e: MessageEvent<string>) => {
  const message = JSON.parse(e.data);

  console.log({
    key: atob(message.Key),
    value: atob(message.Value),
    offset: message.Offset,
    partition: message.Partition,
  });
};

export default {}