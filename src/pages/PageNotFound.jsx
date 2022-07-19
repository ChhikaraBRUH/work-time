import { Link } from "react-router-dom";

export const PageNotFound = () => {
	return (
		<div className='flex flex-col bg-white rounded-lg p-8 gap-8 items-center'>
			<h1 className='text-4xl font-bold'>* 404 *</h1>
			<h1 className='text-2xl font-semibold'>We couldn't find what you are looking for.</h1>
			<Link to='/'>
				<button className='border border-indigo-600 bg-indigo-600 text-white rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-indigo-700 focus:outline-none focus:shadow-outline'>
					Go Back Home
				</button>
			</Link>
		</div>
	);
};
