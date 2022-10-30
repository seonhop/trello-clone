import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Board = styled.div`
	padding: 20px 10px 20px 10px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 200px;
`;

const Title = styled.h2`
	text-align: center;
	font-weight: 600;
	margin-bottom: 10px;
	font-size: 18px;
`;

interface IDroppableBoardProps {
	toDos: string[];
	boardId: string;
}

function DroppableBoard({ toDos, boardId }: IDroppableBoardProps) {
	return (
		<Board>
			<Title>{boardId}</Title>
			<Droppable droppableId={boardId}>
				{(magic) => (
					<div ref={magic.innerRef} {...magic.droppableProps}>
						{toDos.map((toDo, index) => (
							<DraggableCard key={toDo} index={index} toDo={toDo} />
						))}
						{magic.placeholder}
					</div>
				)}
			</Droppable>
		</Board>
	);
}

export default DroppableBoard;
