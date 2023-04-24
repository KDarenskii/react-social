export default class User {
    constructor(firstName, lastName, email, password, roles, friends, requests, followings, id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.friends = friends;
        this.requests = requests;
        this.followings = followings;
        this.id = id;
    }
}
