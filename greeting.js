const form = document.querySelector(".js-form"),
input = form.querySelector("input"),
greeting = document.querySelector(".js-greetings");


const USER_LS = "currentUser",
SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);   //localStorage에 USER_LS text로서 저장
}

function handleSubmit(event){
    event.preventDefault(); //Default로 설정된 이벤트 해제
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);                 
    form.addEventListener("submit", handleSubmit);  //제출하면 handleSubmit으로
}

function paintGreeting(text) {
    form.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;  
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();//이름이 저장이 안되어 있으면
}
    else{
        paintGreeting(currentUser);
    }

}


function init() {
    loadName();
}

init();