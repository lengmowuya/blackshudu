function createNumberButton(){
    let numberButton = document.createElement('button');
    numberButton.classList.add("number_button");
    number++;
    return numberButton;
}
// 创建小块
function createSmallArea(){
    let smallArea = document.createElement('div');
    smallArea.classList.add("small_area");

    for(let i = 0; i < 9; i++){
        let numberButton = createNumberButton();
        numberButton.innerText = i+1;
        numberButton.setAttribute("buttonIndex",i+1);
        numberButton.classList.add("n"+(i+1));
        smallArea.appendChild(numberButton);
    }

    // 创建卡片
    let cardButton = document.createElement('button');
    cardButton.classList.add("card");
    smallArea.appendChild(cardButton);

    // 添加事件聆听
    smallArea.addEventListener('click',(event)=>{
        let target = event.target;
        if(target.getAttribute("buttonIndex") == undefined){
            return;
        }
        let middleElement = target.parentNode.parentNode;
        let smallElement = target.parentNode;
        let cardButton = smallElement.querySelector(".card");

        // 脆弱代码 待优化 {
        let middleIndex = middleElement.getAttribute("middleIndex");
        let smallIndex = smallElement.getAttribute("smallIndex");
        let buttonIndex = target.getAttribute("buttonIndex");
        // }
        boardData[middleIndex][smallIndex] = buttonIndex;
        // console.log(cardButton);
        cardButton.innerText = buttonIndex;
        // cardButton.classList.add("active");
        smallElement.classList.add('active');
        // console.log(boardData);



        let goalMiddleRowList = [],
            goalMiddleColumnList = [],
            goalSmallRowList = [],
            goalSmallColumnList = [];

        // console.log(middleElement,smallElement);
        // console.log(goalSmallRowList,goalSmallColumnList);

        // 确认大块横向
        if(middleIndex == 1 || middleIndex == 2 || middleIndex == 3){
            goalMiddleRowList = [1,2,3];
        }else if(middleIndex == 4 || middleIndex == 5 || middleIndex == 6){
            goalMiddleRowList = [4,5,6];
        }else{
            goalMiddleRowList = [7,8,9];
        }
        // 确认大块纵向
        if(middleIndex == 1 || middleIndex == 4 || middleIndex == 7){
            goalMiddleColumnList = [1,4,7];
        }else if(middleIndex == 2 || middleIndex == 5 || middleIndex == 8){
            goalMiddleColumnList = [2,5,8];
        }else{
            goalMiddleColumnList = [3,6,9];
        }



        // 确认小块横向
        if(smallIndex == 1 || smallIndex == 2 || smallIndex == 3){
            goalSmallRowList = [1,2,3];
        }else if(smallIndex == 4 || smallIndex == 5 || smallIndex == 6){
            goalSmallRowList = [4,5,6];
        }else{
            goalSmallRowList = [7,8,9];
        }
        // 确认小块纵向
        if(smallIndex == 1 || smallIndex == 4 || smallIndex == 7){
            goalSmallColumnList = [1,4,7];
        }else if(smallIndex == 2 || smallIndex == 5 || smallIndex == 8){
            goalSmallColumnList = [2,5,8];
        }else{
            goalSmallColumnList = [3,6,9];
        }
        // console.log(goalMiddleRowList,goalMiddleColumnList);
        // console.log(goalSmallRowList,goalSmallColumnList);

        // console.log(Omain.querySelectorAll);
        let goalElement = [];
        for(let i = 0; i<3 ; i++){
            // console.log(Omain.querySelectorAll(".middle_area")[goalMiddleRowList[i]-1]);

            for(let j = 0;j<3;j++){
                let timeElement = Omain.querySelectorAll(".middle_area")[goalMiddleRowList[i]-1].querySelectorAll(".small_area")[goalSmallRowList[j]-1];
                goalElement.push(timeElement);
                timeElement = Omain.querySelectorAll(".middle_area")[goalMiddleColumnList[i]-1].querySelectorAll(".small_area")[goalSmallColumnList[j]-1];
                goalElement.push(timeElement);
            }
        }
        for(let i=0; i< 9;i++){
            let timeElement = Omain.querySelectorAll(".middle_area")[middleIndex-1].querySelectorAll(".small_area")[i];
            goalElement.push(timeElement);
        }
        for(let i=0; i< goalElement.length;i++){
            goalElement[i].classList.add("hover");
            // console.log(goalElement[i]);
            goalElement[i].querySelector(".n"+buttonIndex).classList.add("hide");
            // console.log(goalElement[i].querySelector(".n"+buttonIndex).classList.add("hide"));
        }
        BoardHistory.push("大块-"+middleIndex+"  小块-"+smallIndex+"  选数-"+buttonIndex);
        console.log(goalElement.length);
    })
    smallArea.addEventListener('mouseenter',(event)=>{
        // console.log("over");
        let target = event.target;

        let middleElement = target.parentNode;
        let smallElement = target;

        // let cardButton = smallElement.querySelector(".card");
        let middleIndex = middleElement.getAttribute("middleIndex");
        let smallIndex = smallElement.getAttribute("smallIndex");
        let buttonIndex = target.getAttribute("buttonIndex");


        let allSmallArea = document.querySelectorAll(".small_area");
        for(let i=0; i< allSmallArea.length;i++){
            allSmallArea[i].classList.remove("hover");
        }


        let goalMiddleRowList = [],
            goalMiddleColumnList = [],
            goalSmallRowList = [],
            goalSmallColumnList = [];

        // console.log(middleElement,smallElement);
        // console.log(goalSmallRowList,goalSmallColumnList);

        // 确认大块横向
        if(middleIndex == 1 || middleIndex == 2 || middleIndex == 3){
            goalMiddleRowList = [1,2,3];
        }else if(middleIndex == 4 || middleIndex == 5 || middleIndex == 6){
            goalMiddleRowList = [4,5,6];
        }else{
            goalMiddleRowList = [7,8,9];
        }
        // 确认大块纵向
        if(middleIndex == 1 || middleIndex == 4 || middleIndex == 7){
            goalMiddleColumnList = [1,4,7];
        }else if(middleIndex == 2 || middleIndex == 5 || middleIndex == 8){
            goalMiddleColumnList = [2,5,8];
        }else{
            goalMiddleColumnList = [3,6,9];
        }



        // 确认小块横向
        if(smallIndex == 1 || smallIndex == 2 || smallIndex == 3){
            goalSmallRowList = [1,2,3];
        }else if(smallIndex == 4 || smallIndex == 5 || smallIndex == 6){
            goalSmallRowList = [4,5,6];
        }else{
            goalSmallRowList = [7,8,9];
        }
        // 确认小块纵向
        if(smallIndex == 1 || smallIndex == 4 || smallIndex == 7){
            goalSmallColumnList = [1,4,7];
        }else if(smallIndex == 2 || smallIndex == 5 || smallIndex == 8){
            goalSmallColumnList = [2,5,8];
        }else{
            goalSmallColumnList = [3,6,9];
        }
        // console.log(goalMiddleRowList,goalMiddleColumnList);
        // console.log(goalSmallRowList,goalSmallColumnList);

        // console.log(Omain.querySelectorAll);
        let goalElement = [];
        for(let i = 0; i<3 ; i++){
            // console.log(Omain.querySelectorAll(".middle_area")[goalMiddleRowList[i]-1]);

            for(let j = 0;j<3;j++){
                let timeElement = Omain.querySelectorAll(".middle_area")[goalMiddleRowList[i]-1].querySelectorAll(".small_area")[goalSmallRowList[j]-1];
                goalElement.push(timeElement);
                timeElement = Omain.querySelectorAll(".middle_area")[goalMiddleColumnList[i]-1].querySelectorAll(".small_area")[goalSmallColumnList[j]-1];
                goalElement.push(timeElement);
            }
        }
        for(let i=0; i< 9;i++){
            let timeElement = Omain.querySelectorAll(".middle_area")[middleIndex-1].querySelectorAll(".small_area")[i];
            goalElement.push(timeElement);
        }
        for(let i=0; i< goalElement.length;i++){
            goalElement[i].classList.add("hover");
        }
        // console.log(goalElement);
    })
    return smallArea;
}
// 创建中块
function createMiddleArea(){
    let middleArea = document.createElement('div');
    middleArea.classList.add("middle_area");
    for(let i = 0; i < 9; i++){
        let smallArea = createSmallArea();
        smallArea.setAttribute("smallIndex",i+1);
        middleArea.appendChild(smallArea);
    }
    // console.log(middleArea);
    boardData.push([]);
    return middleArea;
}
function initBoard(){
    for(let i = 0; i < 9; i++){
        let middleArea = createMiddleArea();
        middleArea.setAttribute("middleIndex",i+1);
        Omain.appendChild(middleArea);
    }
    boardData.push([]);
}