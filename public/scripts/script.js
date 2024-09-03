const wrapper = document.querySelector(".wrapper");
const login = document.querySelector(".login");
const register = document.querySelector(".register");
const cross = document.getElementsByClassName("cross");
var currentRoute;

cross[0].addEventListener('click', (e) => {
    e.target.parentElement.style.display = "none";
    wrapper.style.display = "none";
})

cross[1].addEventListener('click', (e) => {
    e.target.parentElement.style.display = "none";
    wrapper.style.display = "none";
})

function loginFun() {
    wrapper.style.display = "flex";
    login.style.display = "block";
    register.style.display = "none";
    if (window.location.pathname === '/' || window.location.pathname === '/features') {
        currentRoute = window.location.pathname;
    }
    history.pushState({ previousRoute: currentRoute }, null, '/todoify/user/login');
}

function signupFun() {
    wrapper.style.display = "flex";
    login.style.display = "none";
    register.style.display = "block";
    if(window.location.pathname === '/' || window.location.pathname === '/features') {
        currentRoute = window.location.pathname;
    }
    history.pushState({ previousRoute: currentRoute }, null, '/todoify/user/signup');
}

function backToCalled() {
    console.log(currentRoute);
    history.pushState(null, null , currentRoute);
}
