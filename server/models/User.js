export default class User {
    constructor(firstName, lastName, email, password, roles, friends, id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.friends = friends;
        this.id = id;
    }
}
