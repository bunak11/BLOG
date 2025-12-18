import { getUser } from "./get-user";
import { addUser } from "./add-user";
import { createSession } from "./create-session";

// изначально пользователю предоставляется только  возможность авторизации - метод autorize в объекте server + register(регистрация) - описана ниже

export const server = {
	//========= Авторизация =============
	async autorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		// условия для проверки логина и пароля
		if (!user) {
			return {
				error: "Такой пользователь не найден",
				res: null,
			};
		}
		if (authPassword !== user.password) {
			return {
				error: "Неверный пароль",
				res: null,
			};
		}

		return {
			error: null,
			res: createSession(user.role_id),
		};
	},

	//=========== Регистрация===========
	async register(regLogin, regPassword) {
		const user = await getUser(regLogin);
		if (user) {
			return {
				error: "Такой логин уже занят",
				res: null,
			};
		}

		// добавление пользователя
		await addUser(regLogin, regPassword);

		return {
			error: null,
			res: createSession(user.role_id),
		};
	},
};
