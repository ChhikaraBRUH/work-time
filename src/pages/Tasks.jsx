import React, { useState } from "react";
import { useTasks } from "../context/tasks-context";

import { TaskCard, Modal } from "../components";

export const Tasks = () => {
	const [showModal, setshowModal] = useState(false);

	const { taskState } = useTasks();

	const toggleModal = () => {
		setshowModal((prev) => !prev);
	};

	return (
		<div className='flex flex-col gap-8'>
			<section className='flex flex-col bg-white rounded-lg p-8 gap-4'>
				{showModal && <Modal toggleModal={toggleModal} />}

				<p className='text-3xl font-bold'>Welcome back, User!</p>

				{taskState.tasks.length === 0 ? (
					<p className='text-xl font-medium'>No tasks added yet! Add some!</p>
				) : (
					<p className='text-xl font-medium'>You have {taskState.tasks.length} tasks today! Let's get to work!</p>
				)}
			</section>

			<section className='flex flex-col bg-white rounded-lg p-8 gap-10 mb-8'>
				<div className='flex justify-between items-center gap-4'>
					<p className='text-2xl font-medium'>Your Tasks</p>
					<button
						onClick={toggleModal}
						className='border border-indigo-600 bg-indigo-600 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-700 focus:outline-none focus:shadow-outline'>
						+ Add Task
					</button>
				</div>

				<div className='flex flex-col gap-4'>
					{taskState.tasks.map((task) => (
						<TaskCard key={task.id} task={task} toggleModal={toggleModal} />
					))}
				</div>
			</section>
		</div>
	);
};
