import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputDelete, inputUpdate, checkUpdate } from "../../redux/actions";
import './taskItem.css';




function TaskItem(props) {
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
    const handleUpdateInput = async (e) => {
        e.preventDefault();
        if (!input) {
            setInput(e.target.value = props.task);
        }
        else {
            try {
                setInput({ input: task.trim() });
            } catch (error) {
                console.log(error);
            }
            dispatch(inputUpdate(input, id, done))
        }
    };

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
    const onFocus = (e) => { e.currentTarget.classList.add("to-do__text-active") }
    const removeAttribute = (e) => { e.currentTarget.removeAttribute("readonly", "true") }
    const onBlur = (e) => { 
        e.currentTarget.classList.remove("to-do__text-active")
        e.currentTarget.setAttribute("readonly", "true") 
    }
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleUpdateInput(e)
            e.currentTarget.setAttribute("readonly", "true")
            e.currentTarget.classList.remove("to-do__text-active");
        }
    }

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

    return (
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
            <input
                type="text"
                readOnly={true}
                className={classDone}
                onKeyDown={handleKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                onDoubleClick={removeAttribute}
                onChange={handleInput}
                defaultValue={task}
                id={id}
            />
            <button className="to-do__checkbox-btn"
                onClick={handleDelete}
            >
                <img className="to-do__checkbox-cross" src="/img/cross.svg" alt="delete" />
            </button>
        </li>
    )
}



export default TaskItem;
