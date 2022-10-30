import { atom, selector } from "recoil";

interface IToDoState {
	[key: string]: IToDo[];
}

export interface IToDo {
	id: number;
	text: string;
}

export const toDoState = atom<IToDoState>({
	key: "toDo",
	default: {
		"To Do": [],
		Doing: [],
		Done: [],
	},
});

export const isLightState = atom<boolean>({
	key: "isLight",
	default: window.matchMedia("(prefers-color-scheme: light)").matches
		? true
		: false,
});
