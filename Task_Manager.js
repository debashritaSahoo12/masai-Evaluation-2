let TaskManager=(()=>{
    let tasks=[],id=1
    return {
        addTask(title){
            tasks.push({
                id:id++,
                title,completed:false
            })
        },
        getAllTasks(){
            return JSON.stringify(tasks)
        },
        markComplete(taskId){
            let task=tasks.find(task=>task.id===taskId)
            if(task){
                task.completed=true
            }
        },
        removeTask(taskId){
            tasks=tasks.filter(task=>task.id!=taskId)
        },
        getPendingTasks(){
            return tasks.filter(task=>!task.completed).map(task=>task.title)
        },
        getCompletedTasks(){
            return tasks.filter(task=>task.completed).map(task=>task.title)
        },
        sortTask(){
            return tasks.sort((a,b)=>a.title.localeCompare(b.title)).map(task=>task.title)
        },
    }
})
let manager=TaskManager()
manager.addTask("Task1")
manager.addTask("Task2");
manager.addTask("Task3");
console.log(manager.getAllTasks())
manager.markComplete(1)
console.log(manager.getPendingTasks())
console.log(manager.getCompletedTasks())
console.log(manager.sortTask())
console.log(manager.getAllTasks())