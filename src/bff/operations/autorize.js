import {getUser} from '../api';
import { sessions } from "../sessions";

export const autorize =  async(authLogin, authPassword) => {
		const user = await getUser(authLogin);

		// условия для проверки логина и пароля
		if (!user) {
			return {
				error: "Такой пользователь не найден",
				res: null,
			};
		}

		const {id, login, password, registeredAt, roleId} = user

		if (authPassword !== password) {
			return {
				error: "Неверный пароль",
				res: null,
			};
		}

		return {
			error: null,
			res: {
				id,
				login,
				roleId,
				registeredAt,
				session: sessions.create(user),
			},
		};
	};
