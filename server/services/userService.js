import { where, query, collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import bcrypt from "bcrypt";
import db from "../db.js";
import User from "../models/User.js";
import TokenService from "./TokenService.js";
import UserDto from "../dtos/userDto.js";
import ApiError from "../exceptions/ApiError.js";
import { ROLES } from "../constants/roles.js";

class UserService {
    async registration(firstName, lastName, email, password) {
        const candidate = await this.getFullUserByEmail(email);
        if (candidate) {
            throw ApiError.BadRequest(`User with email: ${email} is already existing`);
        }

        const hashedPassword = await bcrypt.hash(password, 3);

        const userResponse = await addDoc(collection(db, "users"), {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            roles: [ROLES.USER],
            friends: [],
        });

        const userDto = new UserDto({ firstName, lastName, id: userResponse.id, email, roles: [ROLES.USER] });

        const tokens = await this.generateAndSaveTokens({ ...userDto });

        return { ...tokens, user: userDto };
    }

    async login(email, password) {
        const user = await this.getFullUserByEmail(email);
        if (!user) {
            throw ApiError.BadRequest(`Not found user with email: ${email}`);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw ApiError.BadRequest("Incorrect password");
        }

        const userDto = new UserDto(user);

        const tokens = await this.generateAndSaveTokens({ ...userDto });

        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        await TokenService.deleteToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthenticatedError();
        }

        const tokenResponse = await TokenService.getByRefreshToken(refreshToken);
        const isRefreshTokenValid = TokenService.validateRefreshToken(refreshToken);

        if (!tokenResponse || !isRefreshTokenValid) {
            throw ApiError.UnauthenticatedError();
        }

        const user = await this.getFullUserById(tokenResponse.data.userId);
        const userDto = new UserDto({ ...user });

        const tokens = await this.generateAndSaveTokens({ ...userDto });

        return { ...tokens, user: userDto };
    }

    async getFullUserByEmail(email) {
        const q = query(collection(db, "users"), where("email", "==", email));
        const userResponse = await getDocs(q);
        if (!userResponse.empty) {
            const { firstName, lastName, email, password, roles, friends } = userResponse.docs[0].data();
            const user = new User(firstName, lastName, email, password, roles, friends, userResponse.docs[0].id);
            return user;
        }
        return null;
    }

    async getFullUserById(userId) {
        const docRef = doc(db, "users", userId);
        const userResponse = await getDoc(docRef);

        if (userResponse.exists()) {
            const { firstName, lastName, email, password, roles, friends } = userResponse.data();
            const user = new User(firstName, lastName, email, password, roles, friends, userResponse.id);
            return user;
        }

        return null;
    }

    async getUserById(userId) {
        const docRef = doc(db, "users", userId);
        const userResponse = await getDoc(docRef);

        if (userResponse.exists()) {
            const { firstName, lastName, email, password, roles, friends } = userResponse.data();
            const user = new User(firstName, lastName, email, password, roles, friends, userResponse.id);
            const userDto = new UserDto({ ...user });
            return userDto;
        }

        return null;
    }

    async generateAndSaveTokens(payload) {
        const tokens = TokenService.generateTokens(payload);
        await TokenService.saveRefreshToken(payload.id, tokens.refreshToken);
        return tokens;
    }

    async getFriends(userId) {
        const user = await this.getUserById(userId);
        const promises = user.friends.map((friend) => this.getUserById(friend));
        const friends = await Promise.all([...promises]);
        return friends;
        // const userResponse = await getDocs(q);
        // if (!userResponse.empty) {
        //     const { firstName, lastName, email, password, roles, friends } = userResponse.docs[0].data();
        //     const user = new User(firstName, lastName, email, password, roles, friends, userResponse.docs[0].id);
        //     return user;
        // }
        // return null;
    }
}

export default new UserService();
