// 当前为0.1版本，项目结构差，功能封装差，代码逻辑差，功能缺失
// 待优化思维和代码及结构
// 作者：冷漠乌鸦(黑鸦)
// 日期：2021-3-24
// 待添加功能，取消已选数字     可以用小键盘快速填数
// 当面添加棋盘 ，棋盘砸地音效  棋盘依次砸地


// 棋盘数据
let boardData = [];
let timeInterval;
let boardElement = [];
let number = 0;
let isStartGame = false;

let startView = document.querySelector(".startView");
startView.onclick = function(){
    if(isStartGame == false){
        isStartGame = true;
        startView.classList.add("isStart");
        setTimeout(()=>{
            startView.classList.add("hide");
        },1600);
    }
}

let BoardHistory = {
    historyData:[],
    historyElement:null,
    init(){
        this.historyElement = document.querySelector(".history");
    },
    refresh(){
        this.historyElement.innerHTML = "";
        let historyUl = document.createElement("ul");
        historyUl.classList.add("historyList");

        for(let i = 0; i<this.historyData.length; i++){
            let historyLi = document.createElement("li");
            historyLi.innerText = this.historyData[i];
            historyLi.classList.add("historyLi");

            historyUl.appendChild(historyLi);
        }
        this.historyElement.appendChild(historyUl);
    },
    push(data){
        this.historyData.push(data);
        this.refresh();
    }
}
BoardHistory.init();
// 创建数字按钮


// initBoard();
let MainBoard = new Board();