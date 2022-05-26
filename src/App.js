import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Landing } from "./pages/Landing";
import { PageNotFound } from "./pages/PageNotFound";
import { Pomodoro } from "./pages/Pomodoro";
import { Tasks } from "./pages/Tasks";

function App() {
	return (
		<div className='App'>
			<h1>Work Time Pomodoro Timer</h1>
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/tasks' element={<Tasks />} />
				<Route path='/pomodoro' element={<Pomodoro />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</div>
	);
}

export default App;
