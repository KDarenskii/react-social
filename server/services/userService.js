import { where, query, collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import bcrypt from "bcrypt";
import db from "../db.js";
import User from "../models/User.js";
import TokenService from "./TokenService.js";
import UserDto from "../dtos/userDto.js";

class UserService {
    async registration(firstName, lastName, email, password) {
        try {
            const candidate = await this.getUserByEmail(email);
            if (candidate) {
                throw new Error(`User with email: ${email} is already existing`);
            }

            const hashedPassword = await bcrypt.hash(password, 3);

            const userResponse = await addDoc(collection(db, "users"), {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });

            const userDto = new UserDto({ firstName, lastName, id: userResponse.id, email });

            const tokens = await this.generateAndSaveTokens({ ...userDto });

            return { ...tokens, user: userDto };
        } catch (error) {
            throw new Error(error);
        }
    }

    async login(email, password) {
        try {
            const user = await this.getUserByEmail(email);
            if (!user) {
                throw new Error(`Not found user with email: ${email}`);
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error("Incorrect password");
            }

            const userDto = new UserDto(user);

            const tokens = await this.generateAndSaveTokens({ ...userDto });

            return { ...tokens, user: userDto };
        } catch (error) {
            throw new Error(error);
        }
    }

    async logout(refreshToken) {
        await TokenService.deleteToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new Error("Пользователь не авторизован");
        }

        const tokenResponse = await TokenService.getByRefreshToken(refreshToken);
        const isRefreshTokenValid = TokenService.validateRefreshToken(refreshToken);

        if (!tokenResponse || !isRefreshTokenValid) {
            throw new Error("Пользователь не авторизован");
        }

        const user = await this.getUserById(tokenResponse.data.userId);
        const userDto = new UserDto({ ...user });

        const tokens = await this.generateAndSaveTokens({ ...userDto });

        return { ...tokens, user: userDto };
    }

    async getUserByEmail(email) {
        const q = query(collection(db, "users"), where("email", "==", email));
        const userResponse = await getDocs(q);
        if (!userResponse.empty) {
            const { firstName, lastName, email, password } = userResponse.docs[0].data();
            const user = new User(firstName, lastName, email, password, userResponse.docs[0].id);
            return user;
        }

        return null;
    }

    async getUserById(userId) {
        const docRef = doc(db, "users", userId);
        const userResponse = await getDoc(docRef);

        if (userResponse.exists()) {
            const { firstName, lastName, email, password } = userResponse.data();
            const user = new User(firstName, lastName, email, password, userResponse.id);
            return user;
        }

        return null;
    }

    async generateAndSaveTokens(payload) {
        const tokens = TokenService.generateTokens(payload);
        await TokenService.saveRefreshToken(payload.id, tokens.refreshToken);
        return tokens;
    }
}

export default new UserService();
