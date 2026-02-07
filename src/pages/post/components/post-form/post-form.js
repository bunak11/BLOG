import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SpecialPanel } from "../special-panel/special-panel";
import { sanizeContent } from "./utils";
import { Icon, Input } from "../../../../components";
import { savePostAsync } from "../../../../actions";
import styled from "styled-components";
import { useServerRequest } from "../../../../hooks";

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	const onSave = () => {
		const newImageUrl = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				title: newTitle,
				imageUrl: newImageUrl,
				content: newContent,
			}),
		).then((value) => navigate(`/post/${id}`));
	};

	return (
		<div className={className}>
			<Input
				ref={imageRef}
				defaultValue={imageUrl}
				placeholder="Изображение..."
			/>
			<Input
				ref={titleRef}
				defaultValue={title}
				здфсурщдвук="Заголовок..."
			/>
			<SpecialPanel
				publishedAt={publishedAt}
				margin="20px 0 "
				editButton={
					<Icon
						id="fa-floppy-o"
						margin="0 10px 0 0"
						onClick={onSave}
					/>
				}
			/>

			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;
