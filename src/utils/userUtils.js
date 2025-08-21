// src/utils/userUtils.js
export const getUsers = () => {
  return JSON.parse(localStorage.getItem('ecosynergyUsers') || '[]');
};

export const getUserById = (id) => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('ecosynergyUsers', JSON.stringify(users));
};

export const updateUser = (id, updatedData) => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedData };
    localStorage.setItem('ecosynergyUsers', JSON.stringify(users));
    return true;
  }
  
  return false;
};

export const deleteUser = (id) => {
  const users = getUsers().filter(user => user.id !== id);
  localStorage.setItem('ecosynergyUsers', JSON.stringify(users));
};