import React from "react";
import TaskInput from "./components/taskInput/taskInput";
import Footer from "./components/footer/footer";
import "./App.css";

function App() {
  return (
    <div className="App">   
      <div className="wrapper">
        <div className="to-do">
          <h1 className="to-do__title">todos</h1>     
          <div className="to-do__block">
            <TaskInput/>
            <Footer/>
          </div>
        </div>   
      </div>
    </div> 
  );
}


export default App;