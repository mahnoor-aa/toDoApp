import { useEffect, useState } from 'react';
import { FaCheck, FaEdit } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { MdClose, MdDelete } from 'react-icons/md';

interface ToDo {
	title: string;
	date: string;
	time: string;
	completed: boolean;
}

const getCurrentDate = (): string => {
	const curr = new Date();
	return curr.toISOString().split('T')[0];
};

const getCurrentTime = (): string => {
	const curr = new Date();
	return curr.toTimeString().slice(0, 5);
};

export default function Home() {
	const [popUp, setpopUp] = useState<boolean>(false);
	const [index, setIndex] = useState<number | null>(null);
	const [item, setItem] = useState<ToDo>({
		title: '',
		date: getCurrentDate(),
		time: getCurrentTime(),
		completed: false,
	});
	const [items, setItems] = useState<ToDo[]>([]);
	const [editing, setEditing] = useState<boolean>(false);
	const [load, setLoad] = useState<boolean>(false);

	const setFields = (): void => {
		setpopUp(true);
		setEditing(false);
		setItem({
			title: '',
			date: getCurrentDate(),
			time: getCurrentTime(),
			completed: false,
		});
	};

	const submitForm = (event: React.FormEvent) => {
		event.preventDefault();
		if (editing && index !== null) {
			const change = [...items];
			change[index] = { ...item };
			setItems(change);
		} else {
			setItems([...items, item]);
		}
		setEditing(false);
		setpopUp(false);
		setIndex(null);
		setItem({
			title: '',
			date: getCurrentDate(),
			time: getCurrentTime(),
			completed: false,
		});
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setItem((prev) => ({ ...prev, [name]: value }));
	};

	const editItem = (i: number) => {
		setItem(items[i]);
		setIndex(i);
		setEditing(true);
		setpopUp(true);
	};

	const completeItem = (i: number) => {
		const allitems = [...items];
		allitems[i].completed = true;
		setItems(allitems);
	};

	const deleteItem = (i: number) => {
		const allitems = items.filter((_, index) => index !== i);
		setItems(allitems);
	};

	useEffect(() => {
		const savedItems = localStorage.getItem('items');
		if (savedItems) {
			setItems(JSON.parse(savedItems));
		}
		setLoad(true);
	}, []);

	useEffect(() => {
		if (load) {
			localStorage.setItem('items', JSON.stringify(items));
		}
	}, [items]);

	return (
		<div className="flex flex-col items-center p-8 justify-center">
			<div className="mb-8 mt-6">
				<button
					onClick={() => setFields()}
					className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 text-center flex font-semibold cursor-pointer"
				>
					<IoIosAdd className="text-2xl" />
					Delete Task
				</button>
			</div>

			<div className="w-full max-w-2xl">
				{items.length > 0 ? (
					<ul className="space-y-4.5">
						{items.map((item, index) => (
							<li
								key={index}
								className={`border border-white rounded p-4 shadow-sm bg-white relative ${item.completed ? 'bg-gray-300 opacity-50 pointer-events-none' : ''}`}
							>
								<div className="flex justify-between items-center">
									<h2 className="font-semibold text-lg">{item.title}</h2>
									<p className="font-medium text-md text-gray-500">
										{item.date} @ {item.time}
									</p>
								</div>
								<div className="mt-3 flex justify-end gap-2">
									<button
										onClick={() => editItem(index)}
										className="text-gray-600 px-3 py-1 text-lg hover:text-gray-900 cursor-pointer"
									>
										<FaEdit />
									</button>
									<button
										onClick={() => completeItem(index)}
										className="text-green-600 px-3 py-1 text-lg hover:text-green-900 cursor-pointer"
									>
										<FaCheck />
									</button>

									<button
										onClick={() => deleteItem(index)}
										className="text-red-600 px-3 py-1 text-lg hover:text-red-900 cursor-pointer"
									>
										<MdDelete />
									</button>
								</div>
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-600 text-center mt-6">
						No Items Yet.
						<br />
						Click Add Task to get started.
					</p>
				)}
			</div>
			{popUp && (
				<>
					<div className="backdrop-blur-sm fixed inset-0 ">
						<div className="bg-white fixed top-1/2 left-1/2 p-6 rounded-xl shadow-xl w-full max-w-md transform -translate-1/2">
							<button
								className="cursor-pointer absolute top-3 right-3 text-red-700 hover:text-red-900"
								onClick={() => setpopUp(false)}
							>
								<MdClose className="text-2xl" />
							</button>
							<h2 className="text-2xl text-center text-blue-800 font-semibold mb-6">
								{editing ? 'Edit Task' : 'Add Task'}
							</h2>
							<form onSubmit={submitForm}>
								<input
									className="w-full mb-4 border border-gray-400 rounded px-2 py-4"
									name="title"
									value={item.title}
									onChange={handleChange}
									required
									placeholder="Enter Title"
								/>
								<input
									className="w-full mb-4 border border-gray-400 rounded px-2 py-4"
									name="date"
									value={item.date}
									onChange={handleChange}
									type="date"
								/>
								<input
									className="w-full mb-4 border border-gray-400 rounded px-2 py-4"
									name="time"
									value={item.time}
									onChange={handleChange}
									type="time"
								/>
								<button
									type="submit"
									className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 text-center flex font-semibold cursor-pointer mx-auto "
								>
									Save Task
								</button>
							</form>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
