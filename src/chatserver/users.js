let users = [];

const addUser = ({ id, name, room }) => {
  // console.log(name, room);
  name = name.trim();
  room = room.trim();
  const userPrev = removeUser(id);
  const user = { id, name, room };
  users.push(user);
  return { user, roomPrev: userPrev && userPrev.room };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    let user = users.splice(index, 1)[0];
    return user;
  }
  else return null;
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };