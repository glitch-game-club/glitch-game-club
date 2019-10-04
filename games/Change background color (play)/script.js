const colorBtn = document.querySelector('.colorBtn');   // colorBtn variable
const divBcg = document.querySelector('.main');         // divBcg variable

const colors = ['red','green','blue','pink','lime','grey','yellow','orange'];   // colors array

colorBtn.addEventListener('click',changeColor);                         // adding event listenet to colorBtn class

function changeColor(){                                                 // definition of cangeColor functon
let random = Math.floor(Math.random()*colors.length);                     // random variable
divBcg.style.backgroundColor = colors[random];
}