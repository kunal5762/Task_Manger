let taskData = {};
let toDo = document.querySelector("#todo");
let progress = document.querySelector("#progress");
let complete = document.querySelector("#completed");
let countTask = [toDo, progress, complete];
const isMobile = window.innerWidth <= 700; 
let dragItem = null;




// this function is over main function which add elements into column
function addTaskAndCreate(title, desc, column) {
    let div = document.createElement("div");

    div.classList.add("taskSection");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
           <h2>${title}</h2> <p>${desc}</p> <br> <button>Delete</button>
         `;
    makeDragAble(div);
    column.appendChild(div);
    const deleleTask = div.querySelector("button");
    deleleTask.addEventListener("click",()=>{
        div.remove();
        updateCount();
    })
}




// this update over count how many task in column 
function updateCount(){
    countTask.forEach(col => {
        let task = col.querySelectorAll(".taskSection");
        let count = col.querySelector("#count");
        taskData[col.id] = Array.from(task).map(t => {
            return {
                title: t.querySelector("h2").innerHTML,
                desc: t.querySelector("p").innerHTML
            }
        })
        // console.log(taskData)
        localStorage.setItem("task", JSON.stringify(taskData));
        count.innerHTML = task.length;
    })
}



// in this after user is already it showns if not that person should be 
// in it we normally bring the data from local storage
if (localStorage.getItem("task")) {
    const data = JSON.parse(localStorage.getItem("task"));
    console.log(data)
    for (const col in data) {
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
        addTaskAndCreate(task.title,task.desc,column)
        })
        let task = column.querySelectorAll(".taskSection");
        let count = column.querySelector("#count");
        count.innerHTML = task.length;
    }
}


// this function making over card draggable
let task1 = document.querySelectorAll(".taskSection");
function makeDragAble(task) {
    task.addEventListener("dragstart", (e) => {
        dragItem = task;
    })
    task.addEventListener("dragend", (e) => {
        dragItem = null;
    })
}



// we use feature like hover show  remove and two important normally over web brower dont allow to drop the element in other so we drop on this function 
task1.forEach(t => makeDragAble(t));
function addEventDrag(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    })
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");

        if (dragItem) {
            column.appendChild(dragItem);
        }
        countTask.forEach(col => {
            let task = col.querySelectorAll(".taskSection");
            let count = col.querySelector("#count");
            count.innerHTML = task.length;
        })
        updateCount();
    })
}
addEventDrag(toDo);
addEventDrag(progress);
addEventDrag(complete);



// add task button function
const toggleTaskAdd = document.querySelector("#toggle");
const shown = document.querySelector(".modal");
const shownPack = document.querySelector(".modal .bg");
toggleTaskAdd.addEventListener("click", function () {
    shown.classList.toggle("shown")
})
shownPack.addEventListener("click", function () {
    shown.classList.remove("shown");
})



// this function add the task into column 
const addTask = document.querySelector("#add-new-task")
addTask.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-tittle").value;
    const taskDesc = document.querySelector("#task-desc").value;

    addTaskAndCreate(taskTitle,taskDesc,toDo);
    updateCount();
    shown.classList.remove("shown");
     document.querySelector("#task-tittle").value ="";
     document.querySelector("#task-desc").value ="";
})