import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTasks } from "../context/tasks-context";

export const Modal = ({ id, title = "", desc = "", focusDuration = "60", breakDuration = "30", editMode, seteditMode, toggleModal }) => {
	const [info, setInfo] = useState({
		id,
		title,
		desc,
		focusDuration,
		breakDuration,
	});

	const { taskState, taskDispatch } = useTasks();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (editMode) {
			let updatedTasks = taskState.tasks.map((item) => {
				if (item.id === info.id) {
					return { ...info };
				}
				return item;
			});
			taskDispatch({ type: "UPDATE_TASK", payload: updatedTasks });
			seteditMode(false);
		} else {
			taskDispatch({ type: "ADD_TASK", payload: { ...info, id: uuidv4() } });
			toggleModal();
		}
	};

	return (
		<div className='flex flex-col fixed top-0 bottom-0 right-0 left-0 w-100 items-center justify-center'>
			<div
				onClick={() => (editMode ? seteditMode(false) : toggleModal())}
				className='top-0 bottom-0 right-0 left-0 fixed w-100 bg-gray-500 opacity-75'></div>

			<section className='fixed bg-white p-8 rounded-xl w-96 max-w-full'>
				<form className='flex flex-col gap-4' noValidate>
					<div className='flex flex-col'>
						<label htmlFor='input'>Task name</label>

						<input
							type='text'
							className='rounded-md p-1 border-2'
							name='title'
							id='input'
							value={info.title || ""}
							placeholder='Add Title'
							onChange={(e) => handleChange(e)}
							required
						/>
					</div>

					<div className='flex flex-col'>
						<label htmlFor='textarea'>Task Description</label>
						<textarea
							rows={4}
							name='desc'
							className='rounded-md p-1 border-2'
							id='textarea'
							value={info.desc || ""}
							placeholder='Add Description'
							onChange={(e) => handleChange(e)}></textarea>
					</div>

					<div className='flex flex-col'>
						<label htmlFor='focusDuration'>Focus duration (in mins)</label>

						<input
							type='range'
							min='15'
							max='90'
							step='15'
							name='focusDuration'
							id='focusDuration'
							value={info.focusDuration}
							list='tickmarks'
							onChange={(e) => handleChange(e)}
						/>

						<datalist className='datalist flex justify-between text-sm w-100' id='tickmarks'>
							<option className='txt-semibold' value='15' label='15'></option>
							<option className='txt-semibold' value='30' label='30'></option>
							<option className='txt-semibold' value='45' label='45'></option>
							<option className='txt-semibold' value='60' label='60'></option>
							<option className='txt-semibold' value='75' label='75'></option>
							<option className='txt-semibold' value='90' label='90'></option>
						</datalist>
					</div>

					<div className='flex flex-col'>
						<label htmlFor='breakDuration'>Break duration (in mins)</label>

						<input
							type='range'
							min='15'
							max='60'
							step='15'
							name='breakDuration'
							id='breakDuration'
							value={info.breakDuration}
							list='tickmarks'
							className=''
							onChange={(e) => handleChange(e)}
						/>

						<datalist className='datalist flex justify-between text-sm w-100' id='tickmarks'>
							<option className='text-semibold' value='15' label='15'></option>
							<option className='text-semibold' value='30' label='30'></option>
							<option className='text-semibold' value='45' label='45'></option>
							<option className='text-semibold' value='60' label='60'></option>
						</datalist>
					</div>

					<footer className='flex justify-between'>
						<button
							onClick={() => (editMode ? seteditMode(false) : toggleModal())}
							id='cancel'
							className='border border-red-600 bg-red-600 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-red-700 focus:outline-none focus:shadow-outline'>
							Cancel
						</button>

						<button
							disabled={!info.title || !info.desc || !info.focusDuration || !info.breakDuration}
							onClick={(e) => handleSubmit(e)}
							id='add'
							className='border border-green-600 bg-green-600 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-green-700 focus:outline-none focus:shadow-outline disabled:cursor-not-allowed'>
							{editMode ? "Update" : "Add"} Task
						</button>
					</footer>
				</form>
			</section>
		</div>
	);
};
