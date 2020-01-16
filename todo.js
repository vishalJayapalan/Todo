const newListButton = document.querySelector("#newListButton")
const mainbody = document.querySelector("#mainBody")
newListButton.addEventListener("click",listCreator)
// const list=JSON.parse(localStorage.getItem("todo"))||[]
const list=[]
let count =0//list[list.length-1].id || 0
// console.log(typeof list)
// console.log(list)
function elt(name, attrs, ...children) {
    let dom = document.createElement(name);
    for (let attr of Object.keys(attrs)) {
      dom.setAttribute(attr, attrs[attr]);
    }
    for (let child of children) {
        if (typeof child != "string") dom.appendChild(child);
        else dom.appendChild(document.createTextNode(child));
      }
    return dom;
  }

function listCreator(event){
    count++
    const Name = prompt("Enter List name")
    const res = document.createElement("div")
    res.id=count
    res.textContent=Name
    res.style="background:grey ; text-align:center; width:40%;margin-left:30%"
    mainbody.appendChild(res)
    mainBody.appendChild(document.createElement("br"))
    list.push({id:res.id,name:Name})
    // localStorage.setItem("todo",JSON.stringify(list))
    console.log(list)
}
// window.addEventListener("beforeunload",storeLocal)

// function storeLocal(event){
// localStorage.setItem("todo",JSON.stringify(list))
// }
// function listDelete(event){
//     const element = document.getElementById(event.target.id);
//     element.parentNode.removeChild(element);
// }




