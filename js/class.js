// let OBoard = document.querySelector(".Board");
let Omain = document.querySelector(".Board");


// 判断块，区是否同行，同列
//  初始化时，给块分左中右和上中下
// 响应时，只需要呼叫大块等于响应块的位置即可，小块只需要响应小块的位置即可
class Board{
    constructor(){
        this.boardData = [];
        this.timeInterval = undefined;
        this.isStartGame = false;
        this.element = Omain;
        this.children = [];
        this.createChildren();
    }
    // 创建下级对象及元素
    createChildren(){
        for(let i = 0; i < 9; i++){
            let child = new BoardArea(i+1);
            this.children[i+1] = child;
            child.parent = this;
            this.element.appendChild(child.element);
        }
    }
    // 广播下级方块正常化
    allAreaNormal(){
        for(let i = 1; i<10 ; i++){
            this.children[i].allBlockNormal();
        }
    }
    // 广播鼠标移入了方块
    checkHoverLight(obj){
        let hoverBlock = obj;
        let hoverArea = obj.parent;
        for(let i = 1;i<10;i++){
            this.children[i].isLightArea(hoverArea,hoverBlock);
        }
    }
    // 广播鼠标点击了数字按钮
    checkClickNumberButton(obj){
        let clickNumberButton = obj;
        let clickBlock = obj.parent;
        let clickArea = obj.parent.parent;
        for(let i = 1;i<10;i++){
            // 此区域是事件区域
            let isArea = this.children[i].ifRuleArea(clickArea);
            if(this.children[i] == clickArea){
                for(let i = 1;i<10;i++){
                    this.children[i].hideChildren(clickBlock,clickNumberButton);
                }

            // 此区域是事件连带区域
            }else if(isArea.column && isArea.row){
                for(let i = 1;i<10;i++){
                    this.children[i].isClickBlock(clickBlock,clickNumberButton);
                }
            }
        }
    }
    // 广播鼠标右键了卡片
    CardRightClick(obj){
        let clickCard = obj;
        let clickBlock = obj.parent;
        let clickArea = obj.parent.parent;
        for(let i = 1;i<10;i++){
            this.children[i].isCardArea(clickArea,clickBlock,clickCard);
        }
    }
}

// 区 （大区域）
class BoardArea{
    constructor(sort){
        this.element = document.createElement('div');
        this.element.classList.add("middleArea");
        this.sort = sort;
        this.children = [];
        this.parent = null;
        this.createChildren();
        this.position = checkPosition(sort);
    }
    // 创建下级对象及元素
    createChildren(){
        for(let i = 0; i < 9; i++){
            let child = new BoardBlock(i+1);
            this.children[i+1] = child;
            child.parent = this;
            this.element.appendChild(child.element);
        }
    }
    // 辐射广播下级方块正常化
    allBlockNormal(){
        for(let i = 1; i<10 ; i++){
            this.children[i].normal();
        }
    }
    // 辐射广播下级方块高亮
    allBlockLight(){
        for(let i = 1; i<10 ; i++){
            this.children[i].light();
        }
    }
    // 侦听鼠标移入的高亮广播
    isLightArea(hoverArea,hoverBlock){
        // 如果是自己，就不高亮了
        if(hoverArea == this){
            return;
        }
        this.isHoverColumn = false;
        this.isHoverRow = false;
        if(hoverArea.position.column == this.position.column){
            this.isHoverColumn = true;
            for(let i = 1;i<10;i++){
                this.children[i].isLightBlock(hoverBlock);
            }
        }
        if(hoverArea.position.row == this.position.row){
            this.isHoverRow = true;
            for(let i = 1;i<10;i++){
                this.children[i].isLightBlock(hoverBlock);
            }
        }
        
    }
    // 在事件对象的规则范围内
    ifRuleArea(Area){
        let isArea = {
            column:Area.position.column == this.position.column,
            row:Area.position.row == this.position.row
        }
        return isArea;
    }
    // 侦听鼠标点击广播
    isClickArea(clickArea,clickBlock,clickNumberButton){
        // 如果在同区域内的事件
        if(this == clickArea){
            for(let i = 1;i<10;i++){
                this.children[i].hideChildren(clickBlock,clickNumberButton);
            }
            return;
        }
        // 初始化纵横判断结果
        this.isClickColumn = false;
        this.isClickRow = false;
        // 如果在横列
        if(this.ifRuleRow(clickArea)){
            this.isClickRow = true;
            for(let i = 1;i<10;i++){
                this.children[i].isClickBlock(clickBlock,clickNumberButton);
            }
        }
        // 如果在纵列
        if(this.ifRuleColumn(clickArea)){
            this.isClickColumn = true;
            for(let i = 1;i<10;i++){
                this.children[i].isClickBlock(clickBlock,clickNumberButton);
            }
        }
        // this.isRuleArea();
    }
    isRightClick(){

    }
}

// 块（小块）
class BoardBlock{
    constructor(sort){
        this.element = document.createElement('div');
        this.element.classList.add("smallArea");
        this.sort = sort;
        this.children = [];
        this.card = null;
        this.parent = null;
        this.position = checkPosition(sort);
        this.createChildren();
        this.EventInit();
    }
    // 创建下级对象及元素
    createChildren(){
        for(let i = 0; i < 9; i++){
            let child = new NumberButton(i+1);
            this.children[i+1] = child;
            child.parent = this;
            this.element.appendChild(child.element);
        }
        let card = new NumberCard(1);
        this.card = card;
        card.parent = this;
        this.element.appendChild(card.element);
    }
    // 事件上报
    EventInit(){
        this.element.onmouseenter = ()=>{
            this.parent.parent.allAreaNormal();
            this.parent.allBlockLight();
            this.parent.parent.checkHoverLight(this);
        }
    }
    // 自身高亮
    light(){
        this.element.classList.add("light");
    }
    // 自身正常
    normal(){
        this.element.classList.remove("light");
    }
    // 侦听二级鼠标移入的高亮广播
    isLightBlock(hoverBlock){
        if(hoverBlock.position.column == this.position.column && this.parent.isHoverColumn){
            this.light();
        }
        if(hoverBlock.position.row == this.position.row  && this.parent.isHoverRow){
            this.light();
        }
    }
    // 在事件对象的规则范围内
    ifRuleBlock(Block){
        let isBlock = {
            column:Block.position.column == this.position.column,
            row:Block.position.row == this.position.row
        }
        return isBlock;
    }
    // 侦听二级鼠标点击广播
    isClickBlock(clickBlock,clickNumberButton){
        if(clickBlock.position.column == this.position.column && this.parent.isHoverColumn){
            for(let i = 1;i<10;i++){
                this.children[i].isHide(clickNumberButton);
            }
        }
        if(clickBlock.position.row == this.position.row  && this.parent.isHoverRow){
            for(let i = 1;i<10;i++){
                this.children[i].isHide(clickNumberButton);
            }
        }
    }
    // 隐藏所有子级别的方块
    hideChildren(clickBlock,clickNumberButton){
        if(this == clickBlock){
            this.card.show(clickNumberButton.sort);
            this.element.classList.add("active");
        }
        for(let i = 1;i<10;i++){
            this.children[clickNumberButton.sort].hide();
        }
    }
}
// 按钮
class NumberButton{
    constructor(sort){
        // 创建数字按钮
        this.element = document.createElement('button')
        this.element.classList.add("numberButton");
        this.element.setAttribute("sort",sort);
        this.element.classList.add("n"+(sort));
        this.element.innerText = sort;
        this.sort = sort;
        this.position = checkPosition(sort);
        this.EventInit();
    }
    EventInit(){
        // 数字按钮被点击
        this.element.onclick = ()=>{
            this.parent.parent.parent.checkClickNumberButton(this);
        }
    }

    // 显示自身
    show(){
        this.element.classList.remove('hide');
    }
    // 隐藏自身
    hide(){
        this.element.classList.add('hide');
    }
    // 判断数字是否相同，相同则隐藏
    isHide(clickNumberButton){
        if(this.sort == clickNumberButton.sort){
            this.hide();
        }
    }
}
// 数字卡片
class NumberCard{
    constructor(sort){
        // 创建卡片
        this.element = document.createElement('button');
        this.element.classList.add("numberCard");
        this.EventInit();
    }
    // 事件上报
    EventInit(){
        // 数字按钮被点击
        this.element.oncontextmenu = ()=>{
            this.parent.parent.parent.CardRightClick(this);
        }
    }
    // 设置数字
    setNumber(sort){
        this.element.innerText = sort;
    }
    // 显示方块本身
    show(sort){
        this.setNumber(sort);
    }
    // hide(){

    // }
}

// 根据序号，返回对应的位置对象
function checkPosition(sort){
    let position = {
        column:"",
        row:""
    }
    if(sort <= 3){
        position.column = "top";
    }else if(sort >= 4 && sort <= 6){
        position.column = "middle";
    }else{
        position.column = "bottom"
    }

    if(sort == 1 || sort == 4 || sort == 7){
        position.row = "left";
    }else if(sort == 2 || sort == 5 || sort == 8){
        position.row = "center";
    }else{
        position.row = "right"
    }

    return position;
}