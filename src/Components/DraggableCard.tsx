import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div<{ isDragging: boolean }>`
	border-radius: 5px;
	padding: 10px;
	margin-bottom: 10px;
	background-color: ${(props) =>
		props.isDragging ? "#74b9ff" : props.theme.cardColor};
	box-shadow: ${(props) =>
		props.isDragging ? "0px 2px 20px rgba(0, 0, 0, 0.2)" : "none"};
`;

interface IDraggableCardProps {
	toDo: string;
	index: number;
}

function DraggableCard({ toDo, index }: IDraggableCardProps) {
	return (
		<Draggable key={toDo} draggableId={toDo} index={index}>
			{(magic, snapshot) => (
				<Card
					isDragging={snapshot.isDragging}
					ref={magic.innerRef}
					{...magic.dragHandleProps}
					{...magic.draggableProps}
				>
					{toDo}
				</Card>
			)}
		</Draggable>
	);
}

export default React.memo(DraggableCard);
