import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';

function App() {
	return (
		<>
			<div className="bg-gray-100 min-h-screen w-full overflow-x-hidden">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/about" element={<About />}></Route>
					<Route></Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
