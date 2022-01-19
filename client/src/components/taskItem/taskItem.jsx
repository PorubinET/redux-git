import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputDelete, inputUpdate, checkUpdate } from "../../redux/actions";
import './taskItem.css';




function TaskItem(props) {
    let [mode, setMode] = useState(false);
    const [input, setInput] = useState('')
    const { task, id, done } = props
    const dispatch = useDispatch();  
    const tasks = useSelector(state => {
        const { itemsReducer } = state;
        return itemsReducer.tasks;
    })

    // удаляем таску
    const handleDelete = async (e) => {
        e.preventDefault();
        dispatch(inputDelete(id))
    };

    // ввод инпута
    const handleInput = (e) => { setInput(e.target.value = e.target.value.replace(/ +/g, ' ')) }

    // обновление инпута и отправка на сервер
    const handleCheck = (e) => {
        e.preventDefault();
        try {
            console.log(id, "item")
            const index = tasks.findIndex((task) => task._id === id);
            tasks[index] = { ...tasks[index] };
            tasks[index].done = !done;
            dispatch(checkUpdate(id, { done: tasks[index].done }));
        } catch (error) {
            console.log(error);
        }
    }

    // взаимодействие с css
    const removeAttribute = (e) => { 
        e.currentTarget.removeAttribute("readonly", "true") 
    }
    const onBlur = (e) => { 
        e.preventDefault();
        handleUpdateInput(e)
        setMode(false)
        e.currentTarget.classList.remove("to-do__text-active")
    }
    const onFocus = (e) => {
        handleUpdateInput(e)
        e.currentTarget.classList.add("to-do__text-active")
        console.log('onFocus')
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleUpdateInput(e)
            setMode(false)
            e.currentTarget.setAttribute("readonly", "true")
            e.currentTarget.classList.remove("to-do__text-active");
        }
    }
    const modeUpdateTrue = (e) => {
        console.log("modeUpdateTrue")
        e.preventDefault();
        setMode(true)
    }

    const handleUpdateInput = async (e) => {
        e.preventDefault();
        if (!input || input === " ") {
            setInput(e.target.value = props.task);
        }
        else {
            try {
                console.log(task, 'task')
                setInput(task);
            } catch (error) {
                console.log(error);
            }
            dispatch(inputUpdate(input, id, done))
        }
    };

    let classDone, classCheck, classActive;
    if (done) {
        classDone = "to-do__text to-do__done";
        classCheck = "to-do__checkbox to-do__checkbox-actve";
        classActive = "to-do__checkbox-check to-do__checkbox-check-active";
    } else {
        classDone = "to-do__text";
        classCheck = "to-do__checkbox";
        classActive = "to-do__checkbox-check";
    }

    useEffect(() => {
        if (task) {
            setInput(task)
        }
    }, [task])

    return(
        <li className="to-do__list-li">
            <label
                className={classCheck}
                htmlFor="checkItem">
            </label>
            <input
                id="checkItem"
                className="to-do__checkbox-input"
                onClick={handleCheck}
                type="checkbox"
            />
            <img
                className={classActive}
                src="/img/check.svg"
                alt="check"
            />
            <div className="div">
            {mode ? 
                <>  
                <input
                    type="text"
                    autoFocus
                    className={classDone}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyDown={handleKeyDown}                
                    onDoubleClick={removeAttribute}
                    onChange={handleInput}
                    defaultValue={task}
                    id={id}  
                /> 
                </> 
                :
                <>
                <div
                    type="text"
                    readOnly
                    className={classDone}
                    onDoubleClick={modeUpdateTrue}
                    id={id}
                >
                    {task}
                </div> 
                <button className="to-do__checkbox-btn" onClick={handleDelete}>
                    <img className="to-do__checkbox-cross" src="/img/cross.svg" alt="delete"/>
                </button>
                </>}              
            </div> 
        </li>
        )
}



export default TaskItem;
