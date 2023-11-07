// const todos = [{
//     text: "Order cat food",
//     completed: false
// }, {
//     text: "Clean kitchen",
//     completed: true
// }, {
//     text: "Buy food",
//     completed: true
// }, {
//     text: "Do work",
//     completed: false
// }, {
//     text: "Walk dog",
//     completed: true
// }]

const todos = JSON.parse(localStorage.getItem("todos")) ?? []

const container = document.querySelector("#todoContainer");

// Create summary message

const summary = document.createElement("h2");

const todosLeft = todos.reduce((cT, cV) => !cV.completed ? cT + 1 : cT, 0);

summary.textContent = `You have ${todosLeft} todos left`;

container.appendChild(summary);

// Live filter notes

const filter = {
    text: ""
}

const filterTodos = () => {

    const notes = document.querySelectorAll("p").forEach((p) => {
        p.remove();
    })

    const filtered = todos.filter((todo) => {
        return todo.text.toLowerCase().includes(filter.text)
    })

    filtered.forEach((todo) => {
        const p = document.createElement("p");
        p.textContent = todo.text;
        container.appendChild(p)
    })
}

filterTodos()

// Todo Filter 

document.querySelector("#todoFilter").addEventListener("input", (e) => {
    filter.text = e.target.value.toLowerCase();
    filterTodos()
})

// Form Submit

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const newTodoInput = document.querySelector("#newTodo");
    todos.push({
        text: e.target.elements.addTodoInput.value,
        completed: false
    })
    localStorage.setItem("todos", JSON.stringify(todos))
    newTodoInput.value = "";

    filterTodos();
})