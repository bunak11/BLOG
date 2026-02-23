import { useEffect, useState } from "react";
import { PrivateContent, H2 } from "../../components/";
import { UserRow, TableRow } from "./components";
import { useServerRequest } from "../../hooks";
import { checkAccess } from "../../utils";
import { ROLE } from "../../constants";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { styled } from "styled-components";

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shoultUpdateUserList, setShoultUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);

	const requestServer = useServerRequest();

	useEffect(() => {
		if ((!checkAccess([ROLE.ADMIN]), userRole)) {
			return;
		}

		Promise.all([
			requestServer("fetchUsers"),
			requestServer("fetchRoles"),
		]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}

			setRoles(rolesRes.res);
			setUsers(usersRes.res);
		});
	}, [requestServer, shoultUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		if ((!checkAccess([ROLE.ADMIN]), userRole)) {
			return;
		}

		requestServer("removeUser", userId).then(() => {
			setShoultUpdateUserList(!shoultUpdateUserList);
		});
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registed-at-column">
							Дата регистрации
						</div>
						<div className="role-column">Роль</div>
					</TableRow>

					{users
						.filter(({ roleId }) => roleId !== ROLE.GUEST)
						.map(({ id, login, registeredAt, roleId }) => (
							<UserRow
								key={id}
								id={id}
								login={login}
								registeredAt={registeredAt}
								roleId={roleId}
								roles={roles.filter(
									({ id: roleId }) =>
										Number(roleId) !== ROLE.GUEST,
								)}
								onUserRemove={() => onUserRemove(id)}
							/>
						))}
				</div>
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 570px;
	margin: 0 auto;
	font-size: 18px;
`;
