import { useSelector } from "react-redux";
import { Button } from "../button/button";
import {
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalIsOpen,
	selectModalText,
} from "../../selectors";
import styled from "styled-components";

const ModalContainer = ({ className }) => {
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalIsOpen);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="120px" onClick={onConfirm}>
						Да
					</Button>
					<Button width="120px" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	& .overlay {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.7);
	}

	& .box {
		text-align: center;
		margin: 0 auto;
		width: 400px;
		padding: 0 20px 20px;
		background-color: #fff;
		border: 3px solid #000;
		position: relative;
		z-index: 30;
		top: 50%;
		transform: translate(0, -50%);
	}

	& .buttons {
		display: flex;
		justify-content: center;
	}

	& .buttons button {
		margin: 0 5px;
	}
`;
