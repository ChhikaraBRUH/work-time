import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Landing } from "./pages/Landing";
import { PageNotFound } from "./pages/PageNotFound";
import { Pomodoro } from "./pages/Pomodoro";
import { Tasks } from "./pages/Tasks";

function App() {
	return (
		<div className='App min-h-screen bg-indigo-600'>
			<Navbar />
			<div className='m-8'>
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/tasks' element={<Tasks />} />
					<Route path='/pomodoro' element={<Pomodoro />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
