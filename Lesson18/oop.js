  /* Programming paradigms
  OOP - Object Oriented programming
  FP - Functional programming

  OOP:  state is usually stored in objects and can be modified through methods 
  FP: state is immutable, and functions are designed to transform data rather than mutate it
  
  OOP: classes encapsulates related data and behavior
  FP: problems are broken down into smaller, composable functions that can be combined to solve larger problems.

*/

// Real life situation: we have multiple users on our website, and we want to store their information in a way that is easy to access and modify. Different users have different roles, and we want to be able to easily change their roles. We also need to make sure that all users have the same properties.

// const user1 = {
//   username: 'John',
//   email: 'john@gmail.com',
//   role: 'user'
// };

// const user2 = {
//   username: 'Jane',
//   email: 'jane@gmail.com'
// }

// const user3 = {
//   name: 'Adam',
//   email: 'adam@gmail.com'
// }

class User {
  constructor(username, email) {
    // this._username means that _username is a private property
    this._username = username;
    this._email = email;
    this._role = 'user';
  }

  changeRole(newRole) {
    this._role = newRole;
  }

  get username() {
    return this._username;
  }

  // YOu can also add getter methods for other properties

  set username(newUsername) {

    this._username = newUsername.trim().toLowerCase();
  }
}

console.log(this);

const user1 = new User('John', 'john@gmail.com');
const user2 = new User('Jane', 'Jane@gmail.com');
const user3 = new User('Adam', 'Adam@gmail.com');

// console.log(user1.username, user2.username, user3.username); 


class Admin extends User {
  constructor(username, email) {
    super(username, email);
    this._role = 'admin';
  }

  printPassword() {
    console.log('password: 12345');
  }

  get role () {
    console.log(this._role);
  }

  changeRole(newRole) {
    console.log('Admin is updating the role');
    this._role = newRole;
  }
}


const admin1 = new Admin('Admin', 'admin@gmail.com');

console.log(admin1.username);
admin1.printPassword();
admin1.changeRole('superadmin');
admin1.role;



user1.printPassword();