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
		const { destination, draggableId, source } = info;
		if (!destination) return;
		if (destination?.droppableId === source.droppableId) {
			// same board movement
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
		if (destination?.droppableId !== source.droppableId) {
			// cross board movement
			setToDos((allBoards) => {
				const sourceCopy = [...allBoards[source.droppableId]];
				const destinationCopy = [...allBoards[destination.droppableId]];
				sourceCopy.splice(source.index, 1);
				destinationCopy.splice(destination?.index, 0, draggableId);

				return {
					...allBoards,
					[source.droppableId]: sourceCopy,
					[destination.droppableId]: destinationCopy,
				};
			});
		}
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
