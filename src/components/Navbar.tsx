import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<nav className="bg-blue-800 shadow-md px-4 py-4 w-screen h-auto">
			<div className="w-screen h-auto bg-blue-800 flex flex-wrap items-center justify-start">
				<h1 className="text-white text-lg font-bold">TO-DO LIST</h1>
				<ul className="justify-start flex space-x-6 text-white text-sm font-semibold">
					<li className="pl-6">
						<Link
							className="hover:bg-blue-900 rounded-full max-w-32 px-4 py-2 text-center"
							to="/"
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							className="hover:bg-blue-900 rounded-full max-w-32 px-4 py-2 text-center"
							to="/about"
						>
							About
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
