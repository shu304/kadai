import { useState, useEffect } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  // 初回にメッセージ一覧を取得
  useEffect(() => {
    fetch('api/messages') // ← 先頭に / を付けない
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  // メッセージ送信
  const sendMessage = async () => {
    const res = await fetch('api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'Shu', text }),
    });
    const newMsg = await res.json();
    setMessages(prev => [...prev, newMsg]);
    setText('');
  };

  return (
    <div>
      <h1>Chat App</h1>
      <ul>
        {messages.map(m => (
          <li key={m.id}>
            <b>{m.username}</b>: {m.text}
          </li>
        ))}
      </ul>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="メッセージを入力"
      />
      <button onClick={sendMessage}>送信</button>
    </div>
  );
}

export default App;
