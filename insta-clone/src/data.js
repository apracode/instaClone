import { v4 as uuid } from "uuid";

export const defaultUser = {
  id: uuid(),
  username: "iamuser",
  name: "name",
  profile_image:
    "https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=941&q=80"
  // profile_image:
  // "https://instagram.com/static/images/anonymousUser.jpg/23e7b3b2a737.jpg"
};

export function getDefaultUser() {
  return {
    id: uuid(),
    username: "username",
    name: "name",
    profile_image:
      "https://images.unsplash.com/photo-1586297098710-0382a496c814?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
  };
}

export const defaultPost = {
  id: uuid(),
  likes: 10,
  caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
  user: defaultUser,
  media:
    "https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  comments: [],
  created_at: "2020-02-28T03:08:14.522421+00:00"
};

export function getDefaultPost() {
  return {
    id: uuid(),
    likes: 10,
    caption: `<span class="">Do you know the 10 JavaScript concepts you need to learn React? 🤔⚛️👇<br>•<br>•<br>👉 Get the FREE cheatsheet to learn them now: bit.ly/10-js-tips 🔥</span>`,
    user: defaultUser,
    media:
      "https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    comments: [
      {
        id: "123asdasd",
        content: "lalala",
        user: {
          username: "newUser"
        }
      }
    ],
    created_at: "2020-02-28T03:08:14.522421+00:00"
  };
}

export const defaultNotifications = [
  {
    id: uuid(),
    type: "follow",
    user: defaultUser,
    created_at: "2020-02-29T03:08:14.522421+00:00"
  },
  {
    id: uuid(),
    type: "like",
    user: defaultUser,
    post: defaultPost,
    created_at: "2020-02-29T03:08:14.522421+00:00"
  }
];

export const defaultCurrentUser = {
  id: uuid(),
  username: "me",
  name: "myself",
  profile_image:
    "https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=941&q=80",
  website: "https://react12.io",
  email: "me@gmail.com",
  bio: "This is my bio",
  phone_number: "555-555-5555",
  posts: Array.from({ length: 10 }, () => getDefaultPost()),
  followers: [defaultUser],
  following: [defaultUser]
};
