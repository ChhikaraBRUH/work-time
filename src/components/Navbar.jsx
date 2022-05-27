export const Navbar = () => {
	return (
		<nav className='flex flex-row justify-between px-8 py-4 min-w-full bg-white items-center'>
			<h1 className='flex flex-wrap items-baseline gap-2'>
				<span className='text-3xl font-bold text-indigo-600'>WorkTime</span>{" "}
				<span className='text-2xl font-medium text-gray-600'>Pomodoro Timer</span>
			</h1>
			<a href='https://github.com/ChhikaraBRUH/work-time' target='_blank'>
				<button
					type='button'
					className='border border-indigo-600 bg-indigo-600 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-700 focus:outline-none focus:shadow-outline'>
					GitHub
				</button>
			</a>
		</nav>
	);
};
