import React from 'react';

const EntireUserList = ({userList}) => {
    return (
        <Fragmen>
            <ul > 
                {/* className={styles.MessageList} */}
                {messages.map(message => <Message key={`guestbook_message_${message.no}`}
                                                    no={message.no}
                                                    name={message.name}
                                                    message={message.message} 
                                                    notifyDeleteMessage={notifyDeleteMessage}/>)}
            </ul>
        </Fragmen>
    );
};

export default EntireUserList;