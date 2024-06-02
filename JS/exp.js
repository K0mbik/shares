const dd = JSON.parse(localStorage.getItem('box'));
const dt = document.getElementById('box2');

if(localStorage.getItem('box')){
    dt.innerHTML =dd;
}

function LS(){
    localStorage.removeItem("box");
}