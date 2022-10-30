import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Board = styled.div`
	padding-top: 10px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 200px;
	display: flex;
	flex-direction: column;
`;

const Title = styled.h2`
	text-align: center;
	font-weight: 600;
	margin-bottom: 10px;
	font-size: 18px;
`;

const Form = styled.form`
	width: 100%;
	input {
		width: 100%;
	}
`;

const Area = styled.div<IAreaProps>`
	background-color: ${(props) =>
		props.isDraggingOver
			? "#dfe6e9"
			: props.isDraggingFromThis
			? "#b2bec3"
			: "transparent"};
	flex-grow: 1;
	transition: background-color 0.3s ease-in-out;
	padding: 20px;
`;

interface IDroppableBoardProps {
	toDos: IToDo[];
	boardId: string;
}

interface IForm {
	toDo: string;
}

interface IAreaProps {
	isDraggingOver: boolean;
	isDraggingFromThis: boolean;
}

function DroppableBoard({ toDos, boardId }: IDroppableBoardProps) {
	const setToDos = useSetRecoilState(toDoState);
	const { register, setValue, handleSubmit } = useForm<IForm>();
	const onValid = ({ toDo }: IForm) => {
		const newTaskObj = {
			id: Date.now(),
			text: toDo,
		};
		setToDos((allBoards) => {
			return {
				...allBoards,
				[boardId]: [...allBoards[boardId], newTaskObj],
			};
		});
		setValue("toDo", "");
	};

	return (
		<Board>
			<Title>{boardId}</Title>
			<Form onSubmit={handleSubmit(onValid)}>
				<input
					{...register("toDo", { required: true })}
					type="text"
					placeholder={`Add task on ${boardId}`}
				/>
			</Form>
			<Droppable droppableId={boardId}>
				{(provided, snapshot) => (
					<Area
						isDraggingOver={snapshot.isDraggingOver}
						isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{toDos.map((toDo, index) => (
							<DraggableCard
								key={toDo.id}
								index={index}
								toDoId={toDo.id}
								toDoText={toDo.text}
							/>
						))}
						{provided.placeholder}
					</Area>
				)}
			</Droppable>
		</Board>
	);
}

export default DroppableBoard;
