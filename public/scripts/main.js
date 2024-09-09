history.pushState(null, null, '/todoify');

const sidebarOpen = document.querySelector(".outside");
const sidebarClose = document.querySelector(".inside");
const sidebar = document.querySelector("#sidebar");
const main = document.querySelector("main");
const addTodo = document.querySelector(".addTodo");
const showAdder = document.querySelector(".showAdder");
const cancelTodo = document.querySelector(".btn1");
const updateTodo = document.querySelector(".todo_update");

sidebarClose.addEventListener('click', () => {
    sidebar.style.left = "-100%";
    sidebarOpen.style.opacity = 1;
    sidebarClose.style.opacity = 0;
    main.style.marginLeft = 0;
})

sidebarOpen.addEventListener('click', () => {
    sidebar.style.left = 0;
    sidebarOpen.style.opacity = 0;
    sidebarClose.style.opacity = 1;
    main.style.marginLeft = "10%";

})

function showAdderFun() {
    showAdder.style.display = "block";
    addTodo.style.display = "none";
}

cancelTodo.addEventListener('click', () => {
    showAdder.style.display = "none";
    addTodo.style.display = "block";
})

function todoStatus() {
    const status = document.querySelector("#todoStatus").value;
    if (status) {
        updateTodo.style.borderColor = "green";
    }
    else {
        updateTodo.style.borderColor = "red";
    }
};

// for custom-alert 
function showAlert(message) {
    return new Promise((res, rej) => {
        const alertBox = document.getElementById('customAlert');
        const alertMessage = document.getElementById('alertMessage');
        alertMessage.innerHTML = message;  // Set the alert message
        alertBox.style.display = 'block';  // Show the alert box
        window.resolveConfirm = function (response) {
            alertBox.style.display = 'none';
            res(response);
        }
    })
}

function updateTodoStatus(form) {
    const todoId = form.querySelector("input[name='todoId']").value;  // Select the todoId within this form
    showAlert("Are you sure you want to update this todo?")
        .then(res => {
            if (!res) {
                return;
            }
            else {
                fetch(`/todoify/todos/todo/${todoId}`, {
                    method: 'PUT',
                })
                    .then(res => {
                        if (res.ok) {
                            location.reload();
                            alert("Todo updated successfully.");
                        } else {
                            alert("Failed to update the todo.");
                        }
                    })
                    .catch(err => console.error('Error:', err));
            }
        })
}

function deleteTodo(form) {
    const todoId = form.querySelector("input[name='deleteTodoId']").value;  // Select the todoId within this form
    const title = form.querySelector("input[name='deleteTodoTitle']").value;
    showAlert(`Are you sure you want to delete <b><u>${title}</u></b> todo?`)
        .then(res => {
            if (!res) {
                return;
            }
            else {
                fetch(`/todoify/todos/todo/${todoId}`, {
                    method: 'DELETE'
                })
                    .then(res => {
                        if (res.ok) {
                            location.reload();
                            alert("Todo deleted successfully.");
                        } else {
                            alert("Failed to delete the todo.");
                        }
                    })
                    .catch(err => console.error('Error:', err));
            }
        })
}


