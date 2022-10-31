import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

const Form = styled.form`
	width: 100%;
	input {
		width: 100%;
	}
`;

interface IForm {
	toDo: string;
}

function NewBoardBtn() {
	const setToDos = useSetRecoilState(toDoState);
	const { register, setValue, handleSubmit } = useForm<IForm>();
	const onValid = ({ toDo }: IForm) => {
		const newTaskObj = {
			id: Date.now(),
			text: "",
		};
		setToDos((allBoards) => {
			return {
				...allBoards,
				[toDo]: [newTaskObj],
			};
		});
		setValue("toDo", "");
	};
	return (
		<Form onSubmit={handleSubmit(onValid)}>
			<input
				{...register("toDo", { required: true })}
				type="text"
				placeholder="Add new board"
			/>
		</Form>
	);
}

export default NewBoardBtn;
