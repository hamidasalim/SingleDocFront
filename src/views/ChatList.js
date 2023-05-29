/* import React from 'react';

const ChatList = ({ chats, activeChatId, setActiveChatId }) => {
    let chats=["payient1","payient2","payient3","payient4"]
  if (!chats || !Array.isArray(chats)) {
    // Handle the case where `chats` prop is undefined or not an array
    return <div>No chats available</div>;
  }

  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`chat-item ${chat.id === activeChatId ? 'active' : ''}`}
          onClick={() => setActiveChatId(chat.id)}
        >
          <div className="chat-item-avatar">{chat.avatar}</div>
          <div className="chat-item-details">
            <div className="chat-item-name">{chat.name}</div>
            <div className="chat-item-last-message">{chat.lastMessage}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
 */

import React from 'react';

const ChatList = () => {
  const chatListStyle = {
    backgroundColor: '#f6f7f9',
    borderRight: '1px solid #dddfe2',
    padding: '20px',
    width: '300px'
  };

  const chatItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  const activeChatItemStyle = {
    backgroundColor: '#fff'
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    backgroundColor: '#ddd',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
    fontWeight: 'bold',
    color: '#fff'
  };

  const chatItemDetailsStyle = {
    flex: 1
  };

  const chatItemNameStyle = {
    fontWeight: 'bold',
    marginBottom: '5px'
  };

  const chatItemLastMessageStyle = {
    color: '#555',
    fontSize: '12px'
  };

  return (
    <div style={chatListStyle}>
      <div style={{ ...chatItemStyle, ...activeChatItemStyle }}>
        <div style={avatarStyle}>A1</div>
        <div style={chatItemDetailsStyle}>
          <div style={chatItemNameStyle}>Patient1</div>
          <div style={chatItemLastMessageStyle}>Last message in Chat 1</div>
        </div>
      </div>
      <div style={chatItemStyle}>
        <div style={avatarStyle}>A2</div>
        <div style={chatItemDetailsStyle}>
          <div style={chatItemNameStyle}>Patient2</div>
          <div style={chatItemLastMessageStyle}>Last message in Chat 2</div>
        </div>
      </div>
      <div style={chatItemStyle}>
        <div style={avatarStyle}>A3</div>
        <div style={chatItemDetailsStyle}>
          <div style={chatItemNameStyle}>Patient3</div>
          <div style={chatItemLastMessageStyle}>Last message in Chat 3</div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
