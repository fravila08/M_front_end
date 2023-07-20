import { useContext } from 'react';
import { UserContext } from './utilities';

export const getLoggedInUser = () => {
  const { user } = useContext(UserContext);
  const chatUserId = user.id;
  const chatUserName = user.name;
  return { id: chatUserId, name: chatUserName };
};

export const chatApiKey = 'vnfrejsn6scx';

// export const chatUserToken = '';

// * when integrating, store user info in local storage to fetch from backend
// * until then, only have one of these users uncommented at a time

// export const chatUserId = "ancient-hall-3";
// export const chatUserToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYW5jaWVudC1oYWxsLTMiLCJleHAiOjE2ODkyNzg1OTd9.G7xdg8EmT5PvGzKnjyGXCnxRfoxkGzgCXtXKlBYqelo";
// export const chatUserName = "ancient";

// export const chatUserId = 'billowing-art-5';
// export const chatUserToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYmlsbG93aW5nLWFydC01IiwiZXhwIjoxNjg5Mjg1OTU4fQ.IMtaZAIWbM7e4mYrcSjOaMtuMSdHnJ1BrBBtO2j_XwA';
// export const chatUserName = 'billowing';
