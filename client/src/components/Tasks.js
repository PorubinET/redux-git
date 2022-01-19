import { Component } from "react";


import {
    addTask,
    getTasks,
    updateTask,
    updateTasks,
    deleteTask,
    deleteAll
} from "../../src/services/taskServices";


class Tasks extends Component {
    state = { tasks: [], currentTask: "", filter: "all", currentPage: 1, taskPerPages: 4};

    async componentDidMount() {
        try {
            const { data } = await getTasks();
            this.setState({ tasks: data });
        } catch (error) {
            console.log(error);
        }
    }

    paginate = (pageNumber) => {
        this.setState({currentPage: pageNumber}
    )}
    
    prevPage = () => {
        if(this.state.currentPage > 1){
            this.setState(state => ({
                currentPage: state.currentPage - 1
            }))
        } else (
            this.setState({
                currentPage: 1 
            })
        )
    }

    nextPage = () => {
        const totalPages = Math.ceil(this.state.tasks.length / this.state.taskPerPages)

        if(this.state.currentPage < totalPages){
            this.setState(state => ({
                currentPage: state.currentPage + 1
            }))
        } else (
            this.setState({
                currentPage: totalPages
            })
        )
    }
        
    statusPost = (status) => {this.setState({filter: status})}

    filterPost = () => {
        const lastTaskIndex = this.state.currentPage * this.state.taskPerPages
        const firstTaskIndex = lastTaskIndex - this.state.taskPerPages
        const currnetTaskItem = this.state.tasks.slice(firstTaskIndex, lastTaskIndex)
        switch (this.state.filter) {
          case "compleated":
            return currnetTaskItem.filter(tasks => tasks.done); 
          case "active":
            return currnetTaskItem.filter(tasks => !tasks.done);
          default:
            return currnetTaskItem;
        }
    }
    
    handleChange = ({ currentTarget: input }) => {
        this.setState({ currentTask: input.value.replace (/ +/g, ' ')});
    };  
    
    handleSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks;
        if(this.state.currentTask === ' '){
            alert('Заполните поле')
        }
        else{
            try {
                const { data } = await addTask({ task: this.state.currentTask.trim() });
                const tasks = originalTasks;
                tasks.push(data);
                this.setState({ tasks, currentTask: "" });
            } catch (error) {
                console.log(error);
            }
        }   
    };

    handleUpdateInput = async (e) => {
        e.preventDefault();
        if(!this.state.currentTask.length) {
            this.setState({ 
                currentTask: this.props.taskInput     
            })
        } 
        else{
            try {
                await updateTask(this.state.id, {task: this.state.currentTask.trim() });
                this.setState({currentTask: this.state.currentTask.trim() });
            } catch (error) {
                console.log(error);
            }
        } 
    };

    allCompleated = async () => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = [...originalTasks]
            const tasksId = tasks.map(item => item._id);       
            if(tasks.every(item => item.done)){
                tasks.map(item => item.done = !item.done)  
                this.setState({ tasks })
                await updateTasks(tasksId, {
                    done: tasks.every(item => item.done)
                });
            }
            else{
                tasks.map(item => item.done = true)
                this.setState({ tasks })
                await updateTasks(tasksId, {
                    done: true
                });
            }
        } 
        catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    }

    deleteCompleated = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks;
        try {
            const tasks = originalTasks;
            const tasksDone = tasks.filter((tasks) => tasks.done).map(tasks => tasks._id);
            this.setState({tasks: originalTasks.filter(item => !item.done)});
            await deleteAll(tasksDone); 
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleUpdate = async (taskId) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === taskId);
            tasks[index] = { ...tasks[index] };
            tasks[index].done = !tasks[index].done;
            this.setState({ tasks });
            await updateTask(taskId, {
                done: tasks[index].done,
            });
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };

    handleDelete = async (taskId) => {
        const originalTasks = this.state.tasks;
        try {
            const tasks = originalTasks.filter(
                (task) => task._id !== taskId
            );
            this.setState({ tasks });
            await deleteTask(taskId);
        } catch (error) {
            this.setState({ tasks: originalTasks });
            console.log(error);
        }
    };
}

export default Tasks;
