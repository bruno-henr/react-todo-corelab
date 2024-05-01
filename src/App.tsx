import AddNewTask from "./components/AddNewTask";
import FavoriteTasks from "./components/FavoriteTasks";
import Header from "./components/Header"
import './global.scss';


function App() {


  return (
    <div className='container'>
      <Header />
      <div className="mainContent">
        <AddNewTask />
        <FavoriteTasks />
      </div>
    </div>
  )
}

export default App
