import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const Pomodoro = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { pomodoroTask } = location.state;
	const { title, desc, focusDuration, breakDuration } = pomodoroTask;

	const [pomodoroMode, setpomodoroMode] = useState("focus");
	const [seconds, setSeconds] = useState(0);

	const percentageRef = useRef(100);
	const secondsRef = useRef(seconds);
	const pomodoroModeRef = useRef(pomodoroMode);
	const intervalRef = useRef(null);

	const focusMinutes = Number(focusDuration);
	const breakMinutes = Number(breakDuration);

	const totalSeconds = (pomodoroMode === "focus" ? focusMinutes : breakMinutes) * 60;
	percentageRef.current = (seconds / totalSeconds) * 100;
	let minutesLeft = Math.floor(seconds / 60);
	let secondsLeft = seconds % 60;
	if (minutesLeft < 10) minutesLeft = `0${minutesLeft}`;
	if (secondsLeft < 10) secondsLeft = `0${secondsLeft}`;

	const handleSecondsUpdate = () => {
		secondsRef.current--;
		setSeconds(secondsRef.current);
	};

	const switchPomodoroMode = () => {
		const newMode = pomodoroModeRef.current === "focus" ? "break" : "focus";
		const newSeconds = (newMode === "focus" ? focusMinutes : breakMinutes) * 60;

		setpomodoroMode(newMode);
		pomodoroModeRef.current = newMode;

		setSeconds(newSeconds);
		secondsRef.current = newSeconds;
	};

	const handleStopInterval = () => {
		clearInterval(intervalRef.current);
	};

	const handleStartInterval = () => {
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			if (secondsRef.current === 0) return switchPomodoroMode();
			handleSecondsUpdate();
		}, 1000);
	};

	useEffect(() => {
		setSeconds(focusMinutes * 60);
		secondsRef.current = focusMinutes * 60;
	}, [focusMinutes]);

	return (
		<div className='flex flex-col md:flex-row gap-8 w-full'>
			<div className='flex flex-col bg-white rounded-lg p-8 gap-4 md:w-1/2'>
				<button
					onClick={() => navigate(-1)}
					className='border border-blue-600 bg-blue-600 text-white rounded-md px-4 py-2 max-w-max transition duration-500 ease select-none hover:bg-blue-700 focus:outline-none focus:shadow-outline'>
					⬅ Return to Tasks
				</button>

				<div className='flex flex-col gap-8'>
					<CircularProgressbar
						className='max-h-80'
						counterClockwise={true}
						value={percentageRef.current}
						text={`${minutesLeft} : ${secondsLeft}`}
						styles={buildStyles({
							textSize: "20px",
							trailColor: "#fff",
							pathColor: pomodoroModeRef.current === "focus" ? `#4f46e5` : `#f59e0b`,
							textColor: pomodoroModeRef.current === "focus" ? `#4f46e5` : `#f59e0b`,
						})}
					/>
					<div className='flex flex-row justify-between'>
						<button
							onClick={() => handleStartInterval()}
							id='start-btn'
							className='border border-green-600 bg-green-600 text-white rounded-md px-4 py-2 max-w-max transition duration-500 ease select-none hover:bg-green-700 focus:outline-none focus:shadow-outline'>
							Start
						</button>
						<button
							onClick={() => handleStopInterval()}
							id='pause-btn'
							className='border border-amber-600 bg-amber-600 text-white rounded-md px-4 py-2 max-w-max transition duration-500 ease select-none hover:bg-amber-700 focus:outline-none focus:shadow-outline'>
							Pause
						</button>
						<button
							onClick={() => {
								handleStopInterval();
								secondsRef.current = focusMinutes * 60;
								setSeconds(focusMinutes * 60);
								pomodoroModeRef.current = "focus";
							}}
							className='border border-indigo-600 bg-indigo-600 text-white rounded-md px-4 py-2 max-w-max transition duration-500 ease select-none hover:bg-indigo-700 focus:outline-none focus:shadow-outline'>
							Restart
						</button>
					</div>
				</div>
			</div>

			<div className='flex flex-col bg-white rounded-lg p-8 gap-8 md:w-1/2'>
				<div className='text-4xl font-bold text-indigo-600 capitalize'>
					<span className='font-normal text-black'>Task: </span>
					{title}
				</div>
				<div className='text-lg font-medium capitalize'>
					<span className='font-normal'>Description: </span>
					{desc}
				</div>
			</div>
		</div>
	);
};
