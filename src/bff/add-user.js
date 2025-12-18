
//для записи в базу данных нового пользователя нужно вызвать fetch с методои post и передать все требуемые поля
import { generateDate } from "./generate-date";
export const addUser = (login, password) =>
	fetch("http://localhost:3005/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			login,
			password,
			registered_at: generateDate(),
			role_id: 2,
		}),
	});
