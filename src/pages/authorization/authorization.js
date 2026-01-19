import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff";
import { Button, H2, Input } from "../../components/";
import styled from "styled-components";
import {selectUserRole} from "../../selectors";
import { setUser } from "../../actions";
import { ROLE } from "../../constants";

const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required("Заполните логин") //он нужен обязательно
		.matches(/\w+$/, "Неверный логин. Допускаются только буквы и цифры") // чтобы содержал данные буквы и цифры, и сообщение ошибки если будут другие символы
		.min(5, "Неверно заполнен логин. Минимум 6 символа")
		.max(30, "Неверно заполнен логин. Максимум 30 символов"),
	password: yup
		.string()
		.required("Заполните пароль")
		.matches(
			/[\w#%]+$/,
			"Неверно заполнен пароль. Допускаются буквыб цифры и знаки # %",
		)
		.min(3, "Неверно заполнен пароль. Минимум 3 символа")
		.max(15, "Неверно заполнен пароль. Максимум 15 символов"),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const ErrorMessage = styled.div`
	background-color: #fcadad;
	font-size: 18px;
	margin: 10px 0 0;
	padding: 10px;
`;
//описываем форму с помощью хука useForm
const AuthorizationContainer = ({ className }) => {
	const {
		//в ответ получаем функции из хука useForm
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		// поля по умолчанию
		defaultValues: {
			login: "",
			password: "",
		},
		resolver: yupResolver(authFormSchema),
	});
	// используем форму в разметке
	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();
	const store = useStore();

	const roleId = useSelector(selectUserRole);


	useEffect(() => {
		//получаем метод subscribe из хука useStore он будет вызываться каждый раз когда происходят измнения в stste. нам нужно чтобы он реагировал на изменение в wasLogout

		let currentWasLogout = store.getState().app.wasLogout;
		return store.subscribe(() => {
			let previosWasLogaut = currentWasLogout;
			currentWasLogout = store.getState().app.wasLogout;

			if (currentWasLogout !== previosWasLogaut) {
				reset();
			}
		})

}, [reset, store]);

	const onSubmit = ({ login, password }) => {
		server.autorize(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}
			dispatch(setUser(res));
		});
	};
	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/"/>
	};

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин"
					{...register("login", {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль"
					{...register("password", {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		</div>
	);
};
export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
