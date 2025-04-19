import React, { useState } from 'react';
import './App.css';

const Visibility = () => {
  const [showLargeBox, setShowLargeBox] = useState(false);
  const [showStatusBox, setShowStatusBox] = useState(false);
  const [status, setStatus] = useState('');
  const [employees, setEmployees] = useState([1, 2, 3]);
  const [tasks, setTasks] = useState({
    1: [{ name: 'Task 1', status: 'Not Started' }, { name: 'Task 2', status: 'Not Started' }, { name: 'Task 3', status: 'Not Started' }],
    2: [{ name: 'Task 1', status: 'Not Started' }, { name: 'Task 2', status: 'Not Started' }, { name: 'Task 3', status: 'Not Started' }],
    3: [{ name: 'Task 1', status: 'Not Started' }, { name: 'Task 2', status: 'Not Started' }, { name: 'Task 3', status: 'Not Started' }]
  });

  const [showInputBox, setShowInputBox] = useState(null); // which employee is adding task
  const [taskInput, setTaskInput] = useState('');         // task name input

  const handleManagerClick = () => {
    setShowLargeBox(prev => !prev);         
    setStatus('Not Started');         
  };

  const [selectedTask, setSelectedTask] = useState(null); // { empId, taskIndex }
  const handleTaskClick = (empId, taskIndex) => {
    setSelectedTask({ empId, taskIndex });
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
      [employeeId]: [...prev[employeeId], { name: taskInput.trim(), status: 'Not Started' }]
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

  const updateStatus = (newStatus) => {
    if (!selectedTask) return;

    const { empId, taskIndex } = selectedTask;

    setTasks(prev => {
      const updated = { ...prev };
      updated[empId][taskIndex] = {
        ...updated[empId][taskIndex],
        status: newStatus
      };
      return updated;
    });

    setStatus(newStatus);
  };

  const getStatusButtonColor = (buttonStatus) => {
    return buttonStatus === 'Not Started' ? 'white' :
           buttonStatus === 'In Progress' ? 'orange' :
           buttonStatus === 'Testing' ? 'yellow' :
           buttonStatus === 'Done' ? 'lightgreen' :
           'white';
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
                  <li key={index}>
                    <button
                      onClick={() => handleTaskClick(emp, index)}
                      style={{
                        backgroundColor:
                          task.status === 'Not Started' ? 'white' :
                          task.status === 'In Progress' ? 'orange' :
                          task.status === 'Testing' ? 'yellow' :
                          task.status === 'Done' ? 'lightgreen' : 'white'
                      }}
                    >
                      {task.name}
                    </button>
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
      <li>
        <button
          onClick={() => updateStatus('Not Started')}
          style={{ backgroundColor: getStatusButtonColor('Not Started') }}
        >
          Not Started
        </button>
      </li>
      <li>
        <button
          onClick={() => updateStatus('In Progress')}
          style={{ backgroundColor: getStatusButtonColor('In Progress') }}
        >
          In Progress
        </button>
      </li>
      <li>
        <button
          onClick={() => updateStatus('Testing')}
          style={{ backgroundColor: getStatusButtonColor('Testing') }}
        >
          Testing
        </button>
      </li>
      <li>
        <button
          onClick={() => updateStatus('Done')}
          style={{ backgroundColor: getStatusButtonColor('Done') }}
        >
          Done
        </button>
      </li>
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
   