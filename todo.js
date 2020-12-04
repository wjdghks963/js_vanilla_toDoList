
const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";



let toDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    })
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}


function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1;
    delBtn.innerText="❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);   //부모 element(li)안에 ()것을 넣는 것 
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj ={
        text: text, //line9 text
        id: newId
    };
    toDos.push(toDoObj); //toDos array 안에 toDoObj 집어넣음
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value=""; //Input에 넣은 값 삭제 (LS에 저장은 됨)
}

function loadToDos(){
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos !== null){
        const pareedTodos = JSON.parse(loadToDos);  //object화
        pareedTodos.forEach(function(toDo){
            paintToDo(toDo.text);
        } )
    }
}



function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
    
}

init();