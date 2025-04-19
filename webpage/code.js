import React, { useState } from 'react';
import './App.css'; 

const Visibility = () => {
  const [showLargeBox, setShowLargeBox] = useState(false);
  const [showStatusBox, setShowStatusBox] = useState(false);
  const [status, setStatus] = useState('');
  const [employees, setEmployees] = useState([1, 2, 3]);
  const [tasks, setTasks] = useState({
    1: ['Task 1', 'Task 2', 'Task 3'],
    2: ['Task 1', 'Task 2', 'Task 3'],
    3: ['Task 1', 'Task 2', 'Task 3']
  });

  const [showInputBox, setShowInputBox] = useState(null); // which employee is adding task
  const [taskInput, setTaskInput] = useState('');         // task name input

  const handleManagerClick = () => {
    setShowLargeBox(prev => !prev);         
    setStatus('Not Started');         
  };

  const handleTaskClick = () => {
    setShowStatusBox(true);
    setShowLargeBox(false);
  };

  const addEmployee = () => {
    const newId = employees.length + 1;
    setEmployees(prev => [...prev, newId]); 
    setTasks(prev => ({ ...prev, [newId]: [] }));
  };

  const handleAddTask = (employeeId) => {
    if (!taskInput.trim()) return;
    setTasks(prev => ({
      ...prev,
      [employeeId]: [...prev[employeeId], taskInput.trim()]
    }));
    setTaskInput('');
    setShowInputBox(null);
  };
  const deleteEmployee = (employeeId) => {
    setEmployees(prev => prev.filter(emp => emp !== employeeId));
    setTasks(prev => {
      const newTasks = { ...prev };
      delete newTasks[employeeId];
      return newTasks;
    });
  };
  
  const deleteTask = (employeeId, taskIndex) => {
    setTasks(prev => {
      const updatedTasks = { ...prev };
      updatedTasks[employeeId] = updatedTasks[employeeId].filter((_, index) => index !== taskIndex); // Remove the specific task
      return updatedTasks;
    });
  };
  
  const changeTaskStatus = (status) => {
    if (clickedTask) {
      let backgroundColor = '';
      switch (status) {
        case 'Not Started':
          backgroundColor = '#828282';
          break;
        case 'In Progress':
          backgroundColor = 'orange';
          break;
        case 'Testing':
          backgroundColor = 'yellow';
          break;
        case 'Done':
          backgroundColor = 'green';
          break;
        default:
          break;
      }

      // Apply background color to the clicked task
      clickedTask.style.backgroundColor = backgroundColor;
      setStatus(status);
      setShowStatusBox(false);
      setShowLargeBox(true);
    }
  };
  return (
    <div>
      <div className="taskbox">
        <button onClick={handleManagerClick}>Manager</button>
      </div>

      <div className="taskbox2">
        <button id="editbtn" onClick={addEmployee}>+</button>
      </div>

      <div className={showLargeBox ? '' : 'hidden'}>
        <div className="largebox">
          {employees.map(emp => (
            <div className="empbox" key={emp}>
              <h3>Employee {emp}</h3>
              <ul>
              {(tasks[emp] || []).map((task, index) => (
                 <li>   
                    <button onClick={handleTaskClick}>{task}</button>
                    <button onClick={() => deleteTask(emp, index)}>-</button> 
                  </li>
                ))}
              </ul>

              {showInputBox === emp ? (
                <div>
                  <input
                    type="text"
                    placeholder="Enter task name"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                  />
                  <button onClick={() => handleAddTask(emp)}>Add</button>
                  <button onClick={() => setShowInputBox(null)}>Cancel</button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setShowInputBox(emp)}>Add New Task</button>
                <button onClick={() => deleteEmployee(emp)}>🗑️</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={showStatusBox ? '' : 'hidden'}>
        <div className="statusbox">
          <ul>
            <li><button onClick={() => setStatus('Not Started')}>Not Started</button></li>
            <li><button onClick={() => setStatus('In Progress')}>In Progress</button></li>
            <li><button onClick={() => setStatus('Testing')}>Testing</button></li>
            <li><button onClick={() => setStatus('Done')}>Done</button></li>
          </ul>
          <p>Status: {status}</p>
          <button onClick={() => {
            setShowStatusBox(false);
            setShowLargeBox(true);
          }}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Visibility;
