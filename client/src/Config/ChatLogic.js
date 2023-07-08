export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1]?.name : users[0]?.name;
};
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const getSenderId = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};

export const isSameSender = (message, m, i, userId) => {
  return (
    i > 0 &&
    (message[i - 1].sender?._id !== m.sender?._id ||
      message[i - 1].sender?._id === undefined) &&
    message[i].sender?._id !== userId || (i==0 && message[i].sender?._id!== userId)
  );
};
export const isLastMessage = (message, i, userId) => {
    return (
      i === message.length - 1 &&
      message[message.length - 1].sender._id !== userId &&
      message[message.length - 1].sender._id
    );
  };
  
  export const isSameUser = (messages, m, i) => {
    if(i==0){
      return 0;
    }
    if(i > 0 && messages[i - 1].sender._id === m.sender._id){
      return 3;
    }else{
      return 10;
    }
  };

  export const isSameSenderMargin = (messages, m, i, userId) => {
    // console.log(i === messages.length - 1);
  
    if (
      i >0 &&
      messages[i - 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 33;
    else if (
      (i >0 &&
        messages[i - 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) || (i==0 && messages[i].sender._id!== userId)  ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };

  
  
  