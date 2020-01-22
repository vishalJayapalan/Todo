const newListButton = document.querySelector("#newListButton")
const mainbody = document.querySelector("#mainBody")
const deleteListButton = document.querySelector("#deleteList")
const renameListButton = document.querySelector("#renameListButton")
const selectListButton = document.querySelector("#selectListButton")
// const select = document.querySelector("p")

let deleteElement;
// localStorage.clear()
newListButton.addEventListener("click", listCreator)
deleteListButton.addEventListener("click", listDelete)

let list = JSON.parse(localStorage.getItem('todo')) || []
let count = list.length ? (Number(list[list.length - 1])) : 0

if (list.length) listFromLocalStorage(list)

function listFromLocalStorage(list) {
  for (let i of list) {
    let cnt = JSON.parse(localStorage.getItem(`${i}`))
    const res = document.createElement("p")
    res.id = i
    res.textContent = cnt.name
    mainbody.appendChild(res)
  }
}

function listCreator(event) {
  const listName = prompt("Enter List name")
  if (listName) {
    const res = document.createElement("p")
    count++
    res.id = count
    res.textContent = listName
    mainbody.appendChild(res)
    list.push(res.id)
    localStorage.setItem(`${res.id}`, JSON.stringify({ id: res.id, name: listName }))
    localStorage.setItem('todo', JSON.stringify(list))
    const selectP = document.querySelectorAll("p")
    for (let i of Array.from(selectP)) {
      i.addEventListener("dblclick", renameList)
      i.addEventListener("click", deleteOnClick)
    }
  }
  console.log(list)
}

function deleteOnClick(event) {
  deleteListButton.style.display = "block";
  deleteElement = event.target
}

function renameList(event) {
  // console.log(document.getElementById('1'))
  let id = event.target.id
  let renameName = document.getElementById(`${id}`)
  // console.log(renameName)
  let lName = prompt("Enter the List Name")
  if(lName) {
    renameName.textContent = lName
    console.log(renameName)
    localStorage.setItem(`${id}`,JSON.stringify({id,name:lName}))
  }
  // document.getElementById(`${event.target.id}`).parentNode.replaceChild((document.createElement('input').setAttribute("type", "text")), document.getElementById(`${event.target.id}`))
}

function listDelete() {
  let element = document.getElementById(deleteElement.id)
  element.parentNode.removeChild(element)
  list = list.filter(a => a != deleteElement.id)
  localStorage.removeItem(`${deleteElement.id}`)
  localStorage.setItem('todo', JSON.stringify(list))
  count = list.length ? count : 0
}
const selectP = document.querySelectorAll("p")
for (let i of Array.from(selectP)) {
  // i.addEventListener("mousedown",event=>{
  //   if(event.button == 0){
  //     deleteOnClick()
  //   }
  //   else if(event.button == 2){
  //     event.preventDefault()
  //     renameList()
  //   }
  // })
  i.addEventListener("dblclick", renameList)
  i.addEventListener("click", deleteOnClick)
} 