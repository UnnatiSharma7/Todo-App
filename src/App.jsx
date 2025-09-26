import { useState ,useEffect} from 'react'
import { Provider } from 'react-redux';
import store from './redux/store';
import RequireAuth from './components/RequireAuth';
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import {fetchWeather} from './redux/slice/weatherSlice';
import Swal from "sweetalert2";
import LogoutButton from './components/LogoutButton';

function App() {
   
    const[task,setTask]=useState("");
    const[tasks,setTaskList]=useState([]);
    const [priority, setPriority] = useState("low");
    const [filter, setFilter] = useState("all");
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isUpdated,setIsUpdated]= useState(false);
    const dispatch = useDispatch();
    const { username} = useSelector((state) => state.auth);
    const { data, loading, error } = useSelector((state) => state.weather);
  

    const handleFetchWeather = () => {
      Swal.fire({
        title: 'Enter your city',
        input: 'text',
        inputPlaceholder: 'Type your city name...',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          const city = result.value; // The user's input
          if (city) {
            //call weather API here with the city
            dispatch(fetchWeather(city));
            setIsPopupVisible(true); 
          } else {
            Swal.fire('Please enter a valid city name.');
          }
        }
      });
      
    };

    useEffect(()=>{
      let taskString=localStorage.getItem("tasks");
      console.log(JSON.parse(taskString));

      if (taskString) {
        setTaskList(JSON.parse(taskString));
        console.log(tasks);
      }
    },[])

    const saveToLS = (taskList) => {
      localStorage.setItem("tasks", JSON.stringify(taskList));
    }
  
  const handleChange=(e)=>{
    setTask(e.target.value);
    console.log(task);
  }

  const handleAdd = async () => {
    if (task.trim() === "") return;
  
    // Ask the user for the task type (Indoor or Outdoor)
    const { value: taskType } = await Swal.fire({
      title: "Task Type",
      text: "Is this task Indoor or Outdoor?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Indoor",
      cancelButtonText: "Outdoor",
    });
  
    // Determine the isIndoor value based on user input
    const isIndoor = taskType === true;
  
    // Add the task to the task list
    const newTask = {
      id: uuidv4(),
      task,
      priority,
      isIndoor,
      isCompleted: false,
    };
  
    const updatedTasks=[...tasks, newTask]; // Update the task list
    setTaskList(updatedTasks);
    setTask(""); // Reset the task input
    setIsUpdated(false); // Reset update state
    setPriority("low"); // Reset priority
    saveToLS(updatedTasks); // Save to Local Storage
  };
  

    const handleEdit=(id)=>{
       const taskToEdit = tasks.find((item) => item.id === id);
       console.log(filteredTasks);
      Swal.fire({
        title: 'Update Task',
        text: 'Are you sure you want to update this task?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          setTask(taskToEdit.task);
          setTaskList(tasks.filter((item) => item.id !== id));
          saveToLS();
          setIsUpdated(true);
          if(isUpdated)
          Swal.fire('Updated!', 'Your task has been updated.', 'success');
        }
      });
    }

    const handleDelete=(id)=>{
      Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to delete this task? This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          setTaskList(tasks.filter((item) => item.id !== id));
          saveToLS();
          Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
        }
      });
    }

    const handlePriorityChange = (e) => {
      setPriority(e.target.value);
    };
    
    //Filtering Tasks based on priority
    const filteredTasks = tasks
    .filter((task) => (filter === "all" ? true : task.priority === filter))
    .sort((a, b) => {
      const priorityOrder = { high: 1, mid: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  return (
    <>
    <Provider store={store}>
    <RequireAuth>
      <LogoutButton username={username}></LogoutButton>
     <div className="container mx-auto my-10 rounded-xl p-5 font-serif text-base bg-violet-100 min-h-[70vh]">
       <div className="addTask flex justify-between gap-1 w-full">
        <input onChange={handleChange} value={task} type="text" placeholder='Add a Task...' 
        className="rounded-2xl border-none px-5 
        w-full py-3 focus:outline-none
        drop-shadow-md hover:drop-shadow-xl
        hover:font-bold"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd(); // Trigger the add task functionality
          }
        }} />
         <select value={priority} onChange={handlePriorityChange} 
         className="bg-transparent text-violet-600
         hover:font-bold transition-all cursor-pointer border px-3
         border-violet-500 rounded-2xl">
          <option value="low">Low</option>
          <option value="mid">Mid</option>
          <option value="high">High</option>
        </select>
       
        <button onClick={handleAdd} className="bg-transparent text-violet-600
         hover:font-bold transition-all cursor-pointer border px-4
         border-violet-500 rounded-2xl">
          {isUpdated ? <p>Update</p>:<p>Add</p>}</button>
       </div>
       <h2 className="text-lg font-bold my-5 text-violet-600">Your Tasks</h2>
       <div className="tasks"> 
        {filteredTasks.length===0 && <div>No Pending Tasks!</div>}
        {filteredTasks.map((item)=>{
        return <div className="task bg-transparent drop-shadow-md hover:drop-shadow-xl flex flex-row 
        flex-wrap bg-violet-200 justify-between my-2 border hover:border-violet-600 
        rounded-2xl px-5 py-5" key={item.id}>
          <div className="text basis-1/3">{item.task}</div>
          <div className="buttons order-last">
          {!item.isIndoor && <button onClick={handleFetchWeather} 
          className="mx-1 text-white bg-violet-700
           hover:bg-violet-800 rounded-2xl px-5 py-2">
            <TiWeatherPartlySunny />
            </button>}
           {/* Weather Popup */}
      
          <button onClick={()=>{handleEdit(item.id)}}  className=" mx-1 text-white bg-violet-700 hover:bg-violet-800 rounded-2xl px-5 py-2"><FaRegEdit /></button>
          <button onClick={()=>{handleDelete(item.id)}} className="mx-1 text-white bg-violet-700 hover:bg-violet-800 rounded-2xl px-5 py-2"><AiTwotoneDelete/>
          </button>
          </div>
        </div>
        })}
        {isPopupVisible && (
        <div className="fixed inset-0 bg-violet bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-violet-100 w-96 p-6 rounded-2xl shadow-lg relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-violet-700 font-bold text-lg"
              onClick={() => setIsPopupVisible(false)}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">Weather Details</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Please Enter a valid city name.</p> }
            {!error && data && (
            <div>
            <h2><strong>Weather in:</strong> {data.name}</h2>
            <p><strong>Temperature:</strong> {data.main.temp} °C</p>
            <p><strong>Condition: </strong>{data.weather[0].description}</p>
           </div>
      )}
          </div>
        </div>
      )}
       </div>
     </div>
     </RequireAuth>
     </Provider>
    </>
  )
}

export default App
