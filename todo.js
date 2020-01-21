const newListButton = document.querySelector("#newListButton")
const mainbody = document.querySelector("#mainBody")
const deleteListButton = document.querySelector("#deleteList")
const renameListButton = document.querySelector("#renameListButton")
const selectListButton = document.querySelector("#selectListButton")
// const select = document.querySelector("p")

let deleteElement;

newListButton.addEventListener("click", listCreator)
deleteListButton.addEventListener("click", listDelete)

// let list =[]
// localStorage.setItem("todo", JSON.stringify(list))
let list = JSON.parse(localStorage.getItem('todo')) || []

let count = list.length ? (Number(list[list.length - 1].id)) : 0

if (list.length) listFromLocalStorage(list)


function listFromLocalStorage(list) {
  for (let i of list) {
    const res = document.createElement("p")
    res.id = i.id
    res.textContent = i.name
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

function listCreator(event) {
  const listName = prompt("Enter List name")
  if (listName) {
    const res = document.createElement("p")
    // let check = document.createElement("input")
    // check.type = "checkbox"
    // res.appendChild(check)
    count++
    res.id = count
    res.textContent = listName
    mainbody.appendChild(res)
    list.push({ id: res.id, name: listName })
    localStorage.setItem("todo", JSON.stringify(list))
    const selectP = document.querySelectorAll("p")
    for (let i of Array.from(selectP)) {
      i.addEventListener("dblclick", renameList)
      i.addEventListener("click", deleteOnClick)
    }
  }
}
// if(list)
// window.addEventListener("beforeunload",storeLocal)

// function storeLocal() {
//   localStorage.setItem("todo", JSON.stringify(list))
// }




function deleteOnClick(event) {
  deleteListButton.style.display = "block";
  deleteElement = event.target
}

function renameList(event) {

  console.log(event.target.id)
}

function listDelete() {
  console.log(deleteElement)
  let element = document.getElementById(deleteElement.id)
  element.parentNode.removeChild(element)
  // deleteElement='';
  console.log(typeof list)
  list.splice(deleteElement.id - 1 ,1)
  console.log(list)
  console.log(typeof list)
  localStorage.setItem("todo", JSON.stringify(list))
}