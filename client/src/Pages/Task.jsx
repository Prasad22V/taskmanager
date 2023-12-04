// Task.jsx
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/Task.css";
import Loader from "./Loader";
import comlogo from "../img/comlogo.png"
import headerimg from "../assets/rptn1.png"


const Task = () => {
  const [inputVal, setInputVal] = useState("");
  const [tasks, setTasks] = useState([]);
  const [totalTime, setTotalTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isTaskInProgress, setIsTaskInProgress] = useState(false); // New state
  const [tokens, setTokens] = useState([]);

  // const addTaskToBackend = async (task) => {
  //   try {
  //     setLoading(true);

  //     const res = await fetch("/api/addTask", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({ task }),
  //     });

  //     if (!res.ok) {
  //       throw new Error(res.error);
  //     }

  //     toast.success("Task added successfully!");

  //     // Refresh tasks from the backend if needed
  //     TaskPage();
  //   } catch (error) {
  //     console.error("Error adding task:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const addTaskToBackend = async (task) => {
    try {
      setLoading(true);
  
      const res = await fetch("/api/addTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ task }),
      });
  
      if (!res.ok) {
        throw new Error(res.error);
      }
  
      toast.success("Task added successfully!");
  
      // Set the task in progress state to true
      setIsTaskInProgress(true);
  
      // Refresh tasks from the backend if needed
      TaskPage();
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!inputVal) {
  //     toast.error("Task cannot be empty");
  //     return;
  //   }

  //   addTaskToBackend(inputVal);

  //   setInputVal("");
  // };

  // Adding starttime to backend
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (isTaskInProgress) {
      toast.error("Please stop the current task before adding a new one.");
      return;
    }
  
    if (!inputVal) {
      toast.error("Task cannot be empty");
      return;
    }
  
    addTaskToBackend(inputVal);
  
    setInputVal("");
  };
  
  
  const addStartTimeToBackend = async (taskId) => {

    try {
      const res = await fetch(`/api/addStartTime/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(res.error);
      }

      // Refresh tasks from the backend if needed
      TaskPage();
    } catch (error) {
      console.error("Error adding start time:", error);
    }
  };

  const handleStartTime = async (index, taskId) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();

    setTasks((oldTasks) =>
      oldTasks.map((task, i) =>
        i === index ? { ...task, startTime: formattedTime } : task
      )
    );

    // Add start time to the backend
    await addStartTimeToBackend(taskId);
  };

  const handleTimeUpdate = (index, startTime, stopTime) => {
    const difference = calculateTimeDifference(startTime, stopTime);

    setTasks((oldTasks) =>
      oldTasks.map((task, i) =>
        i === index ? { ...task, stopTime, difference } : task
      )
    );
  };

  const handleStopTime = async (index) => {
    try {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();

      // Assuming you have taskId stored in tasks array for each task
      const taskId = tasks[index]._id;

      // Make a POST request to update stopTime in the backend
      const res = await fetch("/api/updateStopTime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          taskId,
          stopTime: formattedTime,
        }),
      });

      if (!res.ok) {
        throw new Error(res.error);
      }

      toast.success("Your Task has Stopped.");

      // Update the state of tasks with the received data
      const updatedData = await res.json();

      setTasks((prevTasks) =>
        prevTasks.map((task, i) =>
          i === index ? { ...task, stopTime: updatedData.stopTime } : task
        )
      );
      handleTimeUpdate(index, tasks[index].startTime, formattedTime);

      // Refresh tasks from the backend if needed
      TaskPage();
    } catch (error) {
      console.error("Error updating stopTime:", error);
    }
  };

  const calculateTimeDifference = (startTime, stopTime) => {
    if (startTime && stopTime) {
      const start = new Date(`2000-01-01 ${startTime}`);
      const stop = new Date(`2000-01-01 ${stopTime}`);
      const difference = stop - start;

      const hours = Math.floor(difference / 3600000);
      const minutes = Math.floor((difference % 3600000) / 60000);
      const seconds = Math.floor((difference % 60000) / 1000);

      return `${hours}h ${minutes}m ${seconds}s`;
    }

    return "";
  };

  const TaskPage = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tasks", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 401) {
        toast.error("Please Login");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        throw new Error(res.error);
      }

      const data = await res.json();
      console.log("Received data:", data); // Log received data
      setTasks(data.tasks);
      setUserEmail(data.email);
      setTasks(data.tasks);
      setTotalTime(data.totalTime);
      // calculateTotalTime();
      calculateTotalTime(data.tasks, data.totalHours);
      // console.log(data.totalTime, "tejbd");
      // console.log(data.totalTime);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalTime = (tasksArray, totalHoursArray) => {
    let totalMilliseconds = 0;

    tasksArray.forEach((task) => {
      if (task.difference) {
        const [hours, minutes, seconds] = task.difference
          .split(" ")
          .map((value) => parseInt(value));

        totalMilliseconds += hours * 3600000 + minutes * 60000 + seconds * 1000;
      }
    });

    const totalDate = new Date(totalMilliseconds);
    const totalHours = totalDate.getUTCHours();
    const totalMinutes = totalDate.getUTCMinutes();
    const totalSeconds = totalDate.getUTCSeconds();

    // Check if today's date matches any entry in totalHoursArray
  };

  useEffect(() => {
    TaskPage();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="task-main-div">
        <div className="main-nav">
          <div className="innerNavDiv">
          <div className="logo-div">
           <img src={headerimg} alt="logos" className="logoImg" />
          </div>
          <div className="user-logout-btn">
            <p>{userEmail}</p>

            <div className="log-btn">
              <NavLink to="/logout">
                <button className="button logoutBtn" style={{ marginTop: 0, width:'104px' }}>
                  Logout
                </button>
              </NavLink>
            </div>
          
          </div>
          </div>
        </div>
        <div className="main-form-div">
          <div className="form-ol-div">
            <form onSubmit={handleSubmit} className="form-div">
            <div className="totl-tm-div">
              <label className="totl-label">Total Time:</label>
              <input
                type="text"
                value={totalTime}
                readOnly
                name="TotalHours"
                className="totl-tim-inp total-timewalaInp"
              />
            </div>
              <div className="form__group field taskInp_main" style={{padding:'0'}}>
                <textarea
                  type="text"
                  placeholder="Enter Your Task Here..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  name="Task"
                  className="form__field search-taskInp"
                  maxLength="166" 
                  
                ></textarea>
                <label htmlFor="task" className="form__label">
                  Enter Your Task Here...
                </label>
                <button
                type="submit"
                className=" button add-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    Adding Task...
                    <Loader /> {/* Use the Loader component */}
                  </>
                ) : (
                  "Add Task"
                )}
              </button>
              </div>
          
            </form>

            <ol className="listMapped_ordered">
              {Array.isArray(tasks) &&
                tasks.map((task, index) => (
                  <li key={index} className="listMapped">
                    <div className="task">{task.task}</div>
                    <div className="btn-div-Wrapper">
                      <div className="btn-div">
                        <button
                          onClick={() => handleStartTime(index, task._id)}
                          disabled={task.startTime}
                          className={`start-btn timeBTN ${
                            task.startTime ? "disabled" : ""
                          }`}
                        >
                          Start
                        </button>

                        <input
                          type="text"
                          value={task.startTime || "Not started"}
                          readOnly
                          name="startTime"
                          className="totl-tim-inp"
                        />
                      </div>

                      <div className="btn-div">
                        <button
                          onClick={() => handleStopTime(index)}
                          disabled={!task.EndTime || task.EndTime !== "0"}
                          className={`stop-btn timeBTN ${
                            !task.EndTime || task.EndTime !== "0"
                              ? "disabled"
                              : ""
                          }`}
                        >
                          Stop
                        </button>

                        {task.EndTime && (
                          <div>
                            <input
                              type="text"
                              value={task.EndTime}
                              readOnly
                              name="endTime"
                              className="totl-tim-inp"
                            />
                          </div>
                        )}
                      </div>

                      <div className="btn-div" style={{ border: "none" }}>
                        <div className="main-time-diff">Time Difference:</div>

                        <input
                          type="text"
                          value={task.timeDifference}
                          readOnly
                          className="totl-tim-inp"
                        />
                      </div>
                    </div>
                  </li>
                ))}
            </ol>

          </div>

        </div>
      </div>
    </>
  );
};

export default Task;
