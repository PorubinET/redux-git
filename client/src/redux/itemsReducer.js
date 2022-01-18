import {
    TASK_LOAD,
    TASK_CREATE,
    TASK_UPDATE,
    TASK_FILTER,
    TASK_DELETE,
    TASK_DELETE_ALL,
    TASK_COMPLETED,
    TASK_COMPLETED_ALL,
    TASK_UPDATE_CHECK
} from "./types";



const initialState = {
    tasks: [],
    filter: 'all',
}



export const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASK_CREATE:
            return {
                ...state, 
                tasks: [...state.tasks, action.data]
            }
        case TASK_LOAD:
            const commentsNew = action.data.map(res => {
                return {
                    done: res.done, // sync naming
                    id: res._id,
                    text: res.task
                }
            })
            return {
                ...state, 
                tasks: commentsNew,
            }    

            case TASK_FILTER:
                return {
                    ...state, 
                    filter: action.filt,
                    tasks: [...state.tasks] // tasks = tasks eq
                }  
    
            // case TASK_FILTER:
            //     return (() => {
            //         const { data } = action;
            //         const { tasks } = state;
            //         console.log(tasks, 'tasks')
                    
            //         console.log(data.filter(items => items.done), "reducer")
            //         console.log(tasks.filter(items => items.done), "reducer")

            //         console.log(action.filt, "action.filt")
            //         let statusFilt = 
            //         (
            //             action.filt === "active" ? data.filter(items => !items.done) :
            //             action.filt === "compleated" ? data.filter(items => items.done) :
            //             data)
            //         {
            //             // const activeFilter = statusFilt.map(res => {
            //             //     return {
            //             //             done: res.done,
            //             //             id: res._id,
            //             //             text: res.task
            //             //     }
            //             // })
            //                 return {
            //                     ...state, 
            //                     // tasks: statusFilt,
            //                 }
            //         }
            //     })();   
////////////////////////

        case TASK_UPDATE_CHECK:
            return (() => {
                const { data } = action;
                const { tasks } = state;
                const newTasks = tasks.map(task => task)

                const itemIndex = newTasks.find(res => res.id === data.id)  
                const checkDone = itemIndex.done
                itemIndex.done = !checkDone
                return {
                    ...state,
                    tasks: [...newTasks]
                }
            })();  

        case TASK_COMPLETED_ALL:
            return (() => {
                const { tasks } = state;
                const newTasks = tasks.map(task => task)

                const allCheck = newTasks.every(items => items.done)
                newTasks.map(res => res.done = !allCheck) // res => { let newTask = { ...res}; newTask.done = !allCheck; return newTask }
                return {
                    ...state, 
                    tasks: [...newTasks] // return same value
                }
            })();

        case TASK_DELETE_ALL:
            return (() => {
                const { tasks } = state;
                const newTask = tasks.filter((items) => !items.done)
                return {
                    ...state, 
                    tasks: newTask
                }
            })();

        // case TASK_DELETE:
        //     return (() => {
        //         const { id } = action;
        //         const { tasks } = state;
        //         // const itemIndex = tasks.findIndex(res => res.id === id) ||||||| use filter
        //         // const deleteTask = [
        //         //     ...tasks.slice(0, itemIndex),
        //         //     ...tasks.slice(itemIndex + 1)
        //         // ];
        //         return {
        //             ...state,
        //             tasks: deleteTask
        //         }
        //     })();

        // case TASK_UPDATE:
        //     const { data } = action;
        //     const { tasks } = state;
        //     // const itemIndex = tasks.findIndex(res => res.id === data.id)  ||||| use map
        //     // console.log(itemIndex, 'itemIndex')
        //     // const nextTask = [
        //     //     ...tasks.slice(0, itemIndex),
        //     //     data,
        //     //     ...tasks.slice(itemIndex + 1)
        //     // ];
        //     return {
        //         ...state, // через оператор ... разворачиваем, копируем и возвращаем новый state
        //         tasks: nextTask
        //     }

          
        default:
            return state;
    }
}