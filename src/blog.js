import { useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Header, Footer } from "./components";
import { Authorization, Registration, Post, Users } from "./pages";
import { setUser } from './actions';
import styled from "styled-components";

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Page = styled.div`
	padding: 120px 0 20px;
`;

// const H2 = styled.h2`
// text-align:center;
// `;

export const Blog = () => {

	const dispatch = useDispatch();

useLayoutEffect(() => {
	const curentUserDataJSON = sessionStorage.getItem('userData');

	if (!curentUserDataJSON) {
		return;
	}

	const curentUserData = JSON.parse(curentUserDataJSON);

	dispatch(setUser({
		...curentUserData,
		roleId: Number(curentUserData.roleId),
}));


},[dispatch]);

	return (
		<AppColumn>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<div>Главнвя страница</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="+" element={<div>Ошибка</div>} />
				</Routes>
			</Page>
			<Footer />
		</AppColumn>
	);
};
