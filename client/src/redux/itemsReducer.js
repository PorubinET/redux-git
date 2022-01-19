import {
    LOAD_TASK,
    CREATE_TASK,
    FILTER_TASK,
    DELETE_TASK,
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
        case CREATE_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.data]
            }
        case LOAD_TASK:
            const commentsNew = action.data.map(res => {
                return {
                    done: res.done, // sync naming
                    id: res._id,
                    task: res.task
                }
            })
            return {
                ...state,
                tasks: commentsNew,
            }

        case FILTER_TASK:
            return (() => {
                let { filter } = state;
                let filterState;
                action.filt === undefined ? filterState = filter : filterState = action.filt
                console.log(filter)
                return {
                ...state,
                filter: filterState
                }
            })();
            

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
                newTasks.map(res => res.done = !allCheck)
                return {
                    ...state,
                    tasks: [...newTasks] // return same value
                }
            })();

        case TASK_DELETE_ALL:
            return (() => {
                const { tasks } = state;

                const newTasks = tasks.filter((items) => !items.done)
                return {
                    ...state,
                    tasks: newTasks
                }
            })();

        case TASK_DELETE:
            return (() => {
                const { id } = action;
                const { tasks } = state;

                const newTasks = tasks.map(task => task)
                const itemIndex = newTasks.findIndex(res => res.id === id)
                newTasks.splice(itemIndex, 1)
                return {
                    ...state,
                    tasks: [...newTasks]
                }
            })();

        case TASK_COMPLETED:
            const { data } = action;
            const { tasks } = state;
            const newTasks = tasks.map(task => task)
            
            const itemIndex = newTasks.find(res => res.id === data.id)
            console.log(itemIndex, 'itemIndex')
            itemIndex.task = data.task
            return {
                ...state,
                tasks: [...newTasks]
            }
        default:
            return state;
    }
}