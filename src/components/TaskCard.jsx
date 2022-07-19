import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../components";
import { useTasks } from "../context/tasks-context";

export const TaskCard = ({ task }) => {
	const [editMode, seteditMode] = useState(false);

	const { taskDispatch } = useTasks();
	const { id, title, desc, focusDuration, breakDuration } = task;

	const handleTaskEdit = () => {
		seteditMode((edit) => !edit);
	};

	return (
		<div key={task.id} className='flex justify-between bg-indigo-400 rounded-lg p-8 gap-4'>
			{editMode && (
				<Modal
					id={id}
					title={title}
					desc={desc}
					focusDuration={focusDuration}
					breakDuration={breakDuration}
					editMode={editMode}
					seteditMode={seteditMode}
				/>
			)}

			<Link to='/pomodoro' state={{ pomodoroTask: task }} className='flex flex-col gap-2 flex-grow'>
				<p className='text-xl font-medium text-white capitalize'>{title}</p>
				<div className='flex flex-col'>
					<p className='text-lg font-semibold'>Focus duration:</p>
					<p>{focusDuration} mins</p>
					<p className='text-lg font-semibold'>Break duration:</p>
					<p>{breakDuration} mins</p>
				</div>
			</Link>

			<div className='flex flex-col gap-4'>
				<button
					onClick={() => handleTaskEdit(task.id)}
					className='border border-blue-600 bg-blue-600 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-blue-700 focus:outline-none focus:shadow-outline'>
					Edit Task
				</button>
				<button
					onClick={() => taskDispatch({ type: "DELETE_TASK", payload: { id: task.id } })}
					className='border border-red-600 bg-red-600 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-red-700 focus:outline-none focus:shadow-outline'>
					DELETE
				</button>
			</div>
		</div>
	);
};
