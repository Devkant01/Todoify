const wrapper = document.querySelector(".wrapper");
const login = document.querySelector(".login");
const register = document.querySelector(".register");
const cross = document.getElementsByClassName("cross");

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
}

function signupFun() {
    wrapper.style.display = "flex";
    login.style.display = "none";
    register.style.display = "block";
}
