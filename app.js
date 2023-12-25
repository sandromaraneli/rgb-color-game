let hardBtn = document.querySelector('#hard');
let easyBtn = document.querySelector('#easy');
let startBtn = document.querySelector('#start');
let resultBtn = document.querySelector('#result');
let winningText = document.querySelector('#winningText');
let boxIndicator = document.querySelector('.indicator');
let allBoxes = document.querySelectorAll('.box');
let indicator = 'hard';
let winningIndex = 0;
let colorsCollection = [];
let tryCount = document.querySelector('.count');


function getRgbColors(list,quantity){
    winningIndex = Math.round(Math.random() * (quantity - 1)) ; // 0 1 2 3 4 5 // 3

    for(let i = 0; i < quantity; i++){
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);
        let rgb = `rgb(${r},${g},${b})`;
        list.push(rgb)
    }
 
    winningText.innerHTML = getWiningRgb(list,winningIndex);

    return list;
   
}
startBtn.addEventListener('click',function(){

    winningLogic();
    if(indicator == 'hard'){
        hardGame();
   }
   else{
        easyGame();
   }
})

easyBtn.addEventListener('click',function(){
    boxIndicator.classList.remove('hard');
    boxIndicator.classList.add('easy');
    indicator = 'easy'
     winningLogic();
    easyGame()

})
hardBtn.addEventListener('click',function(){
    boxIndicator.classList.remove('easy');
    boxIndicator.classList.add('hard');
    indicator = 'hard'
     winningLogic();
    hardGame()
})
function setColorToBoxes(array){
    while(array.length != 0){
         allBoxes.forEach(box => {
             box.style.backgroundColor = array.pop();
         })
    }
}
function hardGame(){
    getRgbColors(colorsCollection,6);
     setColorToBoxes(colorsCollection)
 
    allBoxes.forEach(box => {
         box.classList.remove('hide');
         box.classList.add('show');
    })

}
function easyGame(){
  getRgbColors(colorsCollection,3);
  setColorToBoxes(colorsCollection);

    allBoxes.forEach((box,index) => {
        if(index > 2){
            box.classList.remove('show');
            box.classList.add('hide');
        }
    })
}
function getWiningRgb(list,num){
    return list[num];
}
function winningLogic(){
    allBoxes.forEach(box => {
        box.addEventListener('click',function(){
            let boxColor = box.style.backgroundColor.replaceAll(' ','');
            if(winningText.innerHTML == boxColor){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });

                  setTimeout(() => {  
                    location.reload()},
                     "2000");
              
            }
            else{
                tryCount.innerHTML--;
                box.style.display  ='none';
                if(tryCount.innerHTML == 0){
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                      });
                      setTimeout(() => {  
                        location.reload()},
                         "2000");
                }
               
            }
        })
    })
}
