import React from "react";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { toDoState } from "./atoms";
import { useRecoilState } from "recoil";
import DroppableBoard from "./Components/DroppableBoard";

const Wrapper = styled.div`
	display: flex;
	max-width: 680px;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Boards = styled.div`
	display: grid;
	width: 100%;
	gap: 10px;

	grid-template-columns: repeat(3, 1fr);
`;

function App() {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const onDragEnd = (info: DropResult) => {
		if (!info.destination) return;
		console.log(info);
		const { destination, draggableId, source } = info;
		if (destination?.droppableId === source.droppableId) {
			setToDos((allBoards) => {
				const boardCopy = [...allBoards[source.droppableId]];
				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination?.index, 0, draggableId);
				return {
					...allBoards,
					[source.droppableId]: boardCopy,
				};
			});
		}
		/* 		setToDos((oldToDos) => {
			const copy = [...oldToDos];
			copy.splice(source.index, 1);
			copy.splice(destination?.index, 0, draggableId);
			return copy;
		}); */
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					{Object.keys(toDos).map((boardId) => (
						<DroppableBoard
							boardId={boardId}
							key={boardId}
							toDos={toDos[boardId]}
						/>
					))}
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
}

export default App;
