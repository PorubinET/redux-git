import {
    LOAD_TASK,
    CREATE_TASK,
    FILTER_TASK,
    UPDATE_TEXT,
    DELETE_TASK,
    DELETE_TASK_ALL,
    COMPLETED_ALL_TASK,
    UPDATE_CHECK_TASK
} from "./types";



const initialState = {
    tasks: [],
    filter: 'all',
}


export const itemsReducer = (state = initialState, action) => {
    const {payload} = action;
    const {tasks} = state;

    switch (action.type) {
        case LOAD_TASK:
            return {
                ...state,
                tasks: payload
            }

        case CREATE_TASK:
            return {
                ...state,
                tasks: [...state.tasks, payload]
            }
        
        case FILTER_TASK:
            return (
                {
                    ...state,
                    filter: action.filt
                }
            )

        case UPDATE_TEXT: 
            console.log(payload, "UPDATE_TEXT")
            const newTasks = tasks.map(item => ({
                ...item, task: item._id === payload._id ? payload.task: item.task
            }))
            return {
                ...state,
                tasks: newTasks
            }
        

        case DELETE_TASK_ALL:
            return (() => {
                return {
                    ...state,
                    tasks: tasks.filter((items) => !items.done)
                }
            })();
            
        case UPDATE_CHECK_TASK:
            return (() => { 
                // console.log(payload.done, "UPDATE_CHECK_TASK")
                // let newTasks = [...state.tasks]
                // let itemIndex = newTasks.find(res => res._id === payload._id)
                // ![...state.tasks].find(res => res._id === payload._id).done
                // console.log(itemIndex)
                // const newTasks = [...tasks]
                

                // const currentTask = [...state.tasks].filter(task => task._id === payload._id)
                // console.log(currentTask[0] = payload.done)
                // const { tasks } = state;

                // const newTasks = tasks.map(task => task);
                console.log(payload._id, payload.done)
                console.log(!tasks.filter(res => res._id === payload._id).done)
                // [...state.tasks].find(res => res._id === payload._id)
                // const checkDone = itemIndex.done
                // itemIndex.done = !checkDone
                // return {
                //     ...state,
                //     tasks: newTasks
                // }
            })();

        case COMPLETED_ALL_TASK:
            return (() => {
                const { tasks } = state;
                const newTasks = [...tasks]
                console.log(tasks)

                const allCheck = newTasks.every(items => items.done)
                newTasks.map(res => res.done = !allCheck)
                return {
                    ...state,
                    tasks: [...newTasks]
                }
            })();

        case DELETE_TASK:
            return (
                {
                    ...state,
                    tasks: [...state.tasks].filter(task => task._id !== action._id)
                }
            );
        default:
            return state;
    }
}