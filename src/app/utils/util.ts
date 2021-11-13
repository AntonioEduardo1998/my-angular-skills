import User from 'src/app/models/User';

function getUserById(id: string): User {
  const users: User[] = JSON.parse(localStorage.getItem('@users'));
  return users.find((user) => user.id === id);
}

export { getUserById };
