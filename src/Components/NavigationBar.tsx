import styled from "styled-components";
import { LightMode, DarkMode } from "@mui/icons-material";
import Icon from "@mui/material/Icon";
import { isLightState } from "../atoms";
import { useRecoilState } from "recoil";

const NavigationWrapper = styled.nav`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.h1`
	color: ${(props) => props.theme.textColor};
	@media (min-width: 1000px) {
		font-size: 2.5vw;
	}
	@media (max-width: 999px) {
		font-size: 20px;
	}
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.5rem;
	width: 2rem;
	height: 2rem;
	background-color: ${(props) => props.theme.cardColor};
	border: none;
	border-radius: 0.2rem;
	color: ${(props) => props.theme.textColor};
`;

interface IThemeIconProps {
	isLight: boolean;
}

function ThemeIcon({ isLight }: IThemeIconProps) {
	return isLight ? <LightMode /> : <DarkMode />;
}

function ThemeSwitch() {
	const [isLight, setIsLight] = useRecoilState(isLightState);
	const toggleTheme = () => {
		console.log(isLight);
		setIsLight((prevTheme) => !prevTheme);
	};
	return (
		<Button onClick={toggleTheme}>
			<ThemeIcon isLight={isLight} />
		</Button>
	);
}

function NavigationBar() {
	const [isLight, setIsLight] = useRecoilState(isLightState);
	const toggleTheme = () => setIsLight((prevTheme) => !prevTheme);
	return (
		<NavigationWrapper>
			<Title>Your Trello Here</Title>
			<ThemeSwitch />
		</NavigationWrapper>
	);
}

export default NavigationBar;
