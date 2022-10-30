import React from "react";
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { toDoState } from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import DroppableBoard from "./Components/DroppableBoard";
import { lightTheme, darkTheme, defaultTheme } from "./theme";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import NavigationBar from "./Components/NavigationBar";
import { isLightState } from "./atoms";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color: black;
  transition: background-color 0.3s, color 0.3s;

}
a {
  text-decoration:none;
  color: inherit;
}
`;

const BodyWrapper = styled.div`
	@media (min-width: 1000px) {
		padding: 2.5vw;
	}
	@media (max-width: 999px) {
		padding: 20px;
	}
`;

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
				const taskObj = boardCopy[source.index];
				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination?.index, 0, taskObj);
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
				const taskObj = sourceCopy[source.index];
				const destinationCopy = [...allBoards[destination.droppableId]];
				sourceCopy.splice(source.index, 1);
				destinationCopy.splice(destination?.index, 0, taskObj);

				return {
					...allBoards,
					[source.droppableId]: sourceCopy,
					[destination.droppableId]: destinationCopy,
				};
			});
		}
	};
	const isLight = useRecoilValue(isLightState);
	return (
		<ThemeProvider theme={isLight ? lightTheme : darkTheme}>
			<GlobalStyle />
			<BodyWrapper>
				<NavigationBar />
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
			</BodyWrapper>
		</ThemeProvider>
	);
}

export default App;
