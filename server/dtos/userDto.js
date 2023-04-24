export default class UserDto {
    constructor(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.roles = user.roles;
        this.friends = user.friends;
        this.requests = user.requests;
        this.followings = user.followings;
        this.id = user.id;
    }
}
