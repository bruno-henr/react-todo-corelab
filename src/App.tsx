import AddNewTask from "./components/AddNewTask";
import FavoriteTasks from "./components/FavoriteTasks";
import Header from "./components/Header"
import SearchTasks from "./components/SearchTasks";
import Tasks from "./components/Tasks";
import { useAppContext } from "./context/AppContext";
import './global.scss';


function App() {
  const { dataFilter } = useAppContext();
  console.log('dataFilter ', dataFilter)

  return (
    <div className="container">
      <Header />
      <div className="mainContent">
        {dataFilter.length > 0 && <SearchTasks />}

        {!dataFilter.length && (<>
          <AddNewTask />
          <FavoriteTasks />
          <Tasks />
        </>)}
      </div>
    </div>
  )
}

export default App
