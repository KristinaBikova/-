const todoForm = document.querySelector('#todo-form')
const todoList = document.querySelector('.todos')
const totalTasks = document.querySelector('#total-tasks')
const completedTasks = document.querySelector('#completed-tasks')
const remainingTasks = document.querySelector('#remaining-tasks')
const mainInput = document.querySelector('#todo-form input')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

if(localStorage.getItem('tasks')){
    tasks.map((task) => {
        createTask(task)
    })
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputValue = mainInput.value

    if (inputValue == ''){
        return
    }

   const task = {
        id: new Date().getTime(),
        name: inputValue,
        isCompleted: false
    }

    
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))

    createTask(task)
    todoForm.reset()
    mainInput.focus()
    
})

todoList.addEventListener('click', (e) => {
    if(e.target.classList.contains('remove-task') || e.target.parentElement.classList.contains('remove-task') || e.targetparentElement.parentElement.classList.contains('remove-task')){
        const taskId = e.target.closest('li').id 

        removeTask(taskId)
    }
})

todoList.addEventListener('input', (e) => {
    const taskId = e.target.closest('li').id

    updateTask(taskId, e.target)
} )

function createTask(task) {
    const taskEl = document.createElement('li')

    taskEl.setAttribute('id', task.id)

    if(task.isCompleted) {
        taskEl.classList.add('complete')
    }

    const taskElMarkup = `
                    <div>
                        <input type="checkbox" name="tasks" id="${task.id}" ${task.isCompleted ? 'checked' : ''}>

                        <span ${!task.isCompleted ? 'contenteditable' : ''}>${task.name}</span>
                    </div>
                    <button title="Remove the " ${task.name}" task"  class="remove-task">
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.88626 0.662319C5.92229 0.626336 5.95088 0.58361 5.97039 0.536579C5.98991 0.489548 5.99997 0.439134 6 0.388216C6.00003 0.337297 5.99003 0.286871 5.97058 0.239816C5.95112 0.192762 5.92259 0.15 5.8866 0.113973C5.85062 0.0779459 5.80789 0.049359 5.76086 0.0298444C5.71383 0.0103298 5.66342 0.000269626 5.6125 0.00023833C5.56158 0.000207034 5.51115 0.0102052 5.4641 0.029662C5.41704 0.0491188 5.37428 0.0776531 5.33826 0.113636L2.99995 2.45194L0.662319 0.113636C0.589559 0.040876 0.490875 -7.6665e-10 0.387977 0C0.285079 7.6665e-10 0.186396 0.040876 0.113636 0.113636C0.040876 0.186396 7.6665e-10 0.285079 0 0.387977C-7.6665e-10 0.490875 0.040876 0.589559 0.113636 0.662319L2.45194 2.99995L0.113636 5.33758C0.0776088 5.37361 0.0490306 5.41638 0.029533 5.46345C0.0100353 5.51052 0 5.56097 0 5.61192C0 5.66287 0.0100353 5.71332 0.029533 5.7604C0.0490306 5.80747 0.0776088 5.85024 0.113636 5.88626C0.186396 5.95902 0.285079 5.9999 0.387977 5.9999C0.438927 5.9999 0.489378 5.98987 0.53645 5.97037C0.583521 5.95087 0.626292 5.92229 0.662319 5.88626L2.99995 3.54796L5.33826 5.88626C5.41102 5.95894 5.50966 5.99973 5.6125 5.99966C5.71533 5.9996 5.81393 5.95869 5.8866 5.88593C5.95927 5.81317 6.00006 5.71452 6 5.61169C5.99994 5.50885 5.95902 5.41025 5.88626 5.33758L3.54796 2.99995L5.88626 0.662319Z" fill="#ACACAC"/>
                        </svg>

                    </button>
            `

            taskEl.innerHTML = taskElMarkup

            todoList.appendChild(taskEl)
}

function removeTask(taskId){
    tasks = tasks.filter((task) => task.id !== parseInt (taskId))

    localStorage.setItem('tasks', JSON.stringify(tasks))

    document.getElementById(taskId).remove()

}

function updateTask(taskId, el){
    const task = tasks.find((task) => task.id === parseInt(taskId))

    if (el.hasAttribute('contenteditable')) {

        task.name = el.textContent
    } else {
        const span = el.nextElementSibling
        const parent = el.closest('li')

        task.isCompleted = !task.isCompleted 
        if (task.isCompleted){
            span.removeAttribute('contenteditable')
            parent.classList.add('complete')
        }else{
            span.setAttribute('contenteditable', 'true')
            parent.classList.remove('complete')
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))

   
}
