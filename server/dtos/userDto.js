export default class UserDto {
    constructor(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.roles = user.roles;
        this.friends = user.friends;
        this.id = user.id;
    }
}
