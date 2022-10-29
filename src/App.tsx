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

const Wrapper = styled.div`
	display: flex;
	max-width: 480px;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Boards = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(3, 1fr);
`;

const Board = styled.div`
	padding: 30px 10px 20px 10px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 200px;
`;

const Card = styled.div`
	border-radius: 5px;
	padding: 10px;
	margin-bottom: 10px;
	background-color: ${(props) => props.theme.cardColor};
`;

function App() {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
		if (!destination) return;
		setToDos((oldToDos) => {
			const copy = [...oldToDos];
			copy.splice(source.index, 1);
			copy.splice(destination?.index, 0, draggableId);
			return copy;
		});
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					<Droppable droppableId="one">
						{(magic) => (
							<Board ref={magic.innerRef} {...magic.droppableProps}>
								{toDos.map((toDo, index) => (
									<Draggable key={toDo} draggableId={toDo} index={index}>
										{(magic) => (
											<Card
												ref={magic.innerRef}
												{...magic.dragHandleProps}
												{...magic.draggableProps}
											>
												{toDo}
											</Card>
										)}
									</Draggable>
								))}
								{magic.placeholder}
							</Board>
						)}
					</Droppable>
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
}

export default App;
