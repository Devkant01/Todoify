const sidebarOpen = document.querySelector(".outside");
const sidebarClose = document.querySelector(".inside");
const sidebar = document.querySelector("#sidebar");
const main = document.querySelector("main");
const addTodo = document.querySelector(".addTodo");
const showAdder = document.querySelector(".showAdder");
const cancelTodo = document.querySelector(".btn1");

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
