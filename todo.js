const newListButton = document.querySelector("#newListButton")
const mainbody = document.querySelector("#mainBody")
const deleteListButton = document.querySelector("#deleteList")
const renameListButton = document.querySelector("#renameListButton")
const selectListButton = document.querySelector("#selectListButton")


newListButton.addEventListener("click", listCreator)
deleteListButton.addEventListener("click", listDelete)

const list = JSON.parse(localStorage.getItem('todo'))||[]
// let list =[]
console.log(list)
let count = list.length  ? (Number(list[list.length-1].id)) : 0

if(list.length) listFromLocalStorage(list)


function listFromLocalStorage(list){
  for(let i of list){
    const res = document.createElement("p")
    // let check=document.createElement("input")
    // check.type="checkbox"
    // check.id="check"
    // check.appendChild(document.createTextNode(i.name))
    res.id=i.id
    res.textContent=i.name
    // check.appendChild(res)
    mainbody.appendChild(res)
  }
}

// function elt(name, attrs, ...children) {
//     let dom = document.createElement(name);
//     for (let attr of Object.keys(attrs)) {
//       dom.setAttribute(attr, attrs[attr]);
//     }
//     for (let child of children) {
//         if (typeof child != "string") dom.appendChild(child);
//         else dom.appendChild(document.createTextNode(child));
//       }
//     return dom;
//   }

function listCreator(event){
    const Name = prompt("Enter List name")
    // if(Name){
    const res = document.createElement("p")
    let check=document.createElement("input")
    check.type="checkbox"
    res.appendChild(check)
    count++
    res.id = count
    res.textContent = Name
    mainbody.appendChild(res)
    list.push({id:res.id, name:Name})
    console.log(list,"test")
    localStorage.setItem("todo", JSON.stringify(list))
    // console.log(localStorage.getItem())
    console.log(list)
  // }
}
// if(list)
// window.addEventListener("beforeunload",storeLocal)

function storeLocal(){
localStorage.setItem("todo",JSON.stringify(list))
}
function listDelete(event){
    // const element = document.getElementById(event.target.id);
    // element.parentNode.removeChild(element);
}

function renameList(event){

}

function selectList(event){

}

window.addEventListener("mousedown",select)

function select(event){
  if(event.button=2){
    event.preventDefault()
    selectList(event)
  }
}

// const selectP = document.querySelector("p")
// selectP.addEventListener('click',deleteOnClick)

// function deleteOnClick(event){
//   deleteListButton.style.display="bold";
// }
