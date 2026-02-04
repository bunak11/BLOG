import { getUsers } from "../api";
import { ROLE } from "../constants";
import { sessions } from "../sessions";

export const fetchUsers = async (hash) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: "Доступ запрещен",
			res: null,
		};
	}
	// добавление пользователя
	const users = await getUsers();

	return {
		error: null,
		res: users,
	};
};
