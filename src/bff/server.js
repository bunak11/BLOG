import { getUser } from "./get-user";
import { addUser } from "./add-user";
import { sessions } from "./sessions";

// изначально пользователю предоставляется только  возможность авторизации - метод autorize в объекте server + register(регистрация) - описана ниже

export const server = {
	//========= Авторизация =============
	async logout(session) {
		sessions.remove(session);
	},
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
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},

	//=========== Регистрация===========
	async register(regLogin, regPassword) {
		const existedUser = await getUser(regLogin);
		if (existedUser) {
			return {
				error: "Такой логин уже занят",
				res: null,
			};
		}

		// добавление пользователя
		const user = await addUser(regLogin, regPassword);
		

		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				roleId: user.role_id,
				session: sessions.create(user),
			},
		};
	},
};
