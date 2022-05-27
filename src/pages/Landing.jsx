import { Link } from "react-router-dom";
import { ReactComponent as TimerLogo } from "../assets/timer.svg";

export const Landing = () => {
	return (
		<div className='flex flex-col-reverse md:flex-row bg-white rounded-lg p-8 gap-8 items-center'>
			<section className='flex flex-col gap-8'>
				<h2 className='text-6xl font-bold'>
					A simple <span className='text-indigo-600'>Pomodoro Timer </span>that works everywhere.
				</h2>
				<h3 className='text-xl font-semibold'>
					<span className='text-indigo-600'>WorkTime </span>will help you manage your time and let you focus on any tasks such as study,
					writing, or coding.
				</h3>
				<Link to='tasks'>
					<button className='border border-indigo-600 bg-indigo-600 text-white rounded-md px-4 py-2 max-w-fit transition duration-500 ease select-none hover:bg-indigo-700 focus:outline-none focus:shadow-outline'>
						GO TO TASKS ➡
					</button>
				</Link>
			</section>
			<section className='min-h-fit'>
				<TimerLogo className='max-h-96' />
			</section>
		</div>
	);
};
