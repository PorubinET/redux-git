import {
    LOAD_TASK,
    CREATE_TASK,
    FILTER_TASK,
    DELETE_TASK,
    TASK_DELETE,
    TASK_COMPLETED,
    TASK_COMPLETED_ALL,
    TASK_UPDATE_CHECK
} from "./types";

import {
    getTasks,
    updateTasks,
    updateTask,
    deleteTask,
    deleteTaskAll
} from "../../src/services/taskServices";


export function taskCreate() {
    return async dispatch => {
        const datadb = await getTasks() /// use create 
        const lastTask = datadb.data[datadb.data.length - 1];//
        const id = lastTask._id, task = lastTask.task, done = lastTask.done;// get from response
        try {
            dispatch({
                type: CREATE_TASK,
                data: {done, id, task} // use payload
            }); 
        } catch (error) {
            console.log(error);
        }
    }
}

export function inputUpdate(task, id, done) {
    console.log(task, 'inputUpdate')
    return async dispatch => {
        try {
            await updateTask(id, { task: task})
            dispatch({
                type: TASK_COMPLETED,
                data: { task, id, done}
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export function checkUpdate(id, done) {
    return async dispatch => {
        try {
            await updateTask(id, done)
            dispatch({
                type: TASK_UPDATE_CHECK,
                data: {id, done}
            });
        } catch (error) {
            console.log(error);
        }
    }
}

// export function inputCompleted(id) { // check if can be removed
//     return {
//         type: TASK_COMPLETED,
//         id
//     }
// }

export function inputDelete(id) {
    return async dispatch => {
        try {
            await deleteTask(id);
            dispatch({
                type: DELETE_TASK,
                id
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export function taskDeleteAll() {
    return async dispatch => {    
        try {
            dispatch({
                type: TASK_DELETE_ALL,
            });
            await deleteTaskAll();
        } catch (error) {
            console.log(error);
        }
    }
}

export function completedAll(done) {
    return async dispatch => {    
        try {
            dispatch({
                type: TASK_COMPLETED_ALL,
                done
            });
            if(done){
                await updateTasks({done: false});
            }
            else{
                await updateTasks({done: true})
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterUpdate(filt){
    return async dispatch => {    
        try {
            const response = await getTasks()
            dispatch({
                type: FILTER_TASK,
                data: response.data, 
                filt
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export function inputLoad() {
    return async dispatch => {
        try {
            const response = await getTasks()
                dispatch({
                    type: LOAD_TASK,
                    data: response.data
                });
        } catch (error) {
            console.log(error)
        }        
    }
}
