import { removeComment } from "./session";
import { ROLE } from "../constants";

// создаем объект session в которым предоставляем пользователю возможность удалять комментарии и разлогиниваться - методы removeComment и logout

export const createSession = (roleId) => {
	const session = {
		// logout разлогиниться - пользователь лишается тех возможностей которые получил когда пришла сессия - объект session. проходимся forEach по ключам сессии и удаляем все полученные в ней возможности-методы
		logout() {
			Object.keys(session).forEach((key) => {
				delete session[key];
			});
		},
	};
	switch (roleId) {
		case ROLE.ADMIN: {
			session.removeComment = removeComment;
			break;
		}
		case ROLE.MODERATOR: {
			session.removeComment = removeComment;
			break;
		}
		case ROLE.READER: {

			break;
		}
		default:
		//ничего не делать
	}

			// если авторизация прошла успешно - в базе данных найдены логин и пароль, возвращаем error: null, и объект session в которым предоставляем пользователю возможность удалять комментарии и разлогиниваться - методы removeComment и logout
	return session;
};
