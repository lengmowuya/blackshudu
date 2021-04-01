// let OBoard = document.querySelector(".Board");
let Omain = document.querySelector(".Board");


// 判断块，区是否同行，同列
//  初始化时，给块分左中右和上中下
// 响应时，只需要呼叫大块等于响应块的位置即可，小块只需要响应小块的位置即可


// 待优化内容：
    // 1.event不要随着广播传递，可以直接使用
    // 2.事件直接抽离，不用每次生成对象都有个实例方法
    // 3.期盼点：流形的事件逻辑处理
    // 4.事件集中注册
    // 5.优化冗余函数
    // 6.优化类的函数注册
    // 7.每级的对象，都可以轻松的直接访问到某一上级
    // 8.对象文件分离

// 组件基类
class Component{
    constructor(sort){
        this.sort = sort;
        this.position = this.checkPosition(sort);
        this.parent = null;
        this.children = [];
    }
    // 创建自身元素
    createElementSelf(elementType,className){
        this.element = document.createElement(elementType);
        this.element.classList.add(className);
    }
    // 根据序号，返回对应的位置对象
    checkPosition(sort){
        // 纵横对象
        let position = {
            column:"",
            row:""
        }
        // 判断纵列位置
        if(sort <= 3){
            position.column = "top";
        }else if(sort >= 4 && sort <= 6){
            position.column = "middle";
        }else{
            position.column = "bottom"
        }
        // 判断横向位置
        if(sort == 1 || sort == 4 || sort == 7){
            position.row = "left";
        }else if(sort == 2 || sort == 5 || sort == 8){
            position.row = "center";
        }else{
            position.row = "right"
        }
        // 返回纵横对象
        return position;
    }
}

class Board extends Component{
    constructor(setting){
        super();
        this.boardData = [];
        this.timeInterval = undefined;
        this.isStartGame = false;
        this.element = Omain;
        this.createChildren();
        this.canChangeStone = setting.canChangeStone;
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
    // 鼠标移入了Block
    checkHoverLight(eventObj){
        let event = {
            area : eventObj.parent,
            block : eventObj
        }
        for(let i = 1;i<10;i++){
            this.children[i].isLightArea(event);
        }
    }
    // 鼠标点击了numberButton
    checkClickNumberButton(eventObj){
        let event = {
            area : eventObj.parent.parent,
            block : eventObj.parent,
            numberButton : eventObj
        }
        for(let i = 1;i<10;i++){
            this.children[i].isClickArea(event);
        }
    }
    // 鼠标右键了numberCard
    CardRightClick(eventObj){
        let event = {
            area : eventObj.parent.parent,
            block : eventObj.parent,
            numberCard : eventObj
        }
        for(let i = 1;i<10;i++){
            this.children[i].isCardClickArea(event);
        }
    }
}

// 区 （大区域）
class BoardArea extends Component{
    constructor(sort){
        super(sort);
        this.createElementSelf('div','middleArea');
        // 创建下级
        this.createChildren();
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
    isLightArea(event){
        // 如果是自己，就不高亮了
        if(event.area == this){
            return;
        }
        // this.isHoverColumn = false;
        // this.isHoverRow = false;
        let isArea = this.ifRuleArea(event.area);
        if(isArea.column){
            for(let i = 1;i<10;i++){
                this.children[i].HoverArea_ColumnCheck(event);
            }
        }
        if(isArea.row){
            for(let i = 1;i<10;i++){
                this.children[i].HoverArea_RowCheck(event);
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
    // 鼠标点击按钮的二级事件广播
    isClickArea(event){
        let isArea = this.ifRuleArea(event.area);
        // 如果在同区域内的事件
        if(this == event.area){
            for(let i = 1;i<10;i++){
                this.children[i].hideChildren(event);
            }
            return;
        }
        // 如果在横列
        if(isArea.row){
            for(let i = 1;i<10;i++){
                this.children[i].ClicButton_RowCheck(event);
            }
        }
        // 如果在纵列
        if(isArea.column){
            for(let i = 1;i<10;i++){
                this.children[i].ClicButton_ColumnCheck(event);
            }
        }
    }
    isCardClickArea(event){
        let isArea = this.ifRuleArea(event.area);
        //如果在同区域内的事件
        if(this == event.area){
            for(let i = 1;i<10;i++){
                this.children[i].showChildren(event);
            }
            return;
        }
        // 如果在横列
        if(isArea.row){
            for(let i = 1;i<10;i++){
                this.children[i].ClickCard_RowCheck(event);
            }
        }
        // 如果在纵列
        if(isArea.column){
            for(let i = 1;i<10;i++){
                this.children[i].ClickCard_ColumnCheck(event);
            }
        }
    }
}
// 块（小块）
class BoardBlock extends Component{
    constructor(sort){
        super(sort);
        this.createElementSelf('div','smallArea');
        this.card = null;
        this.createChildren();
        this.EventInit();
    }
    setStone(number){
        this.element.classList.add('stone');
        this.element.classList.add('active');
        this.isStone = true;
        this.value= number;
        this.card.setSort(number);
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
    HoverArea_ColumnCheck(event){
        let isBlock = this.ifRuleBlock(event.block);
        if(isBlock.column){
            this.light();
        }
    }
    HoverArea_RowCheck(event){
        let isBlock = this.ifRuleBlock(event.block);
        if(isBlock.row){
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
    ClicButton_ColumnCheck(event){
        let isBlock = this.ifRuleBlock(event.block);
        if(isBlock.column){
            // 隐藏选定数字按钮
            this.children[event.numberButton.sort].hide();
        }
    }
    ClicButton_RowCheck(event){
        let isBlock = this.ifRuleBlock(event.block);
        if(isBlock.row){
            // 隐藏选定数字按钮
            this.children[event.numberButton.sort].hide();
        }
    }
    ClickCard_ColumnCheck(event){
        let isBlock = this.ifRuleBlock(event.block);
        if(isBlock.column){
            // 隐藏选定数字按钮
            this.children[event.numberCard.sort].show();
        }
    }
    ClickCard_RowCheck(event){
        let isBlock = this.ifRuleBlock(event.block);
        if(isBlock.row){
            // 隐藏选定数字按钮
            this.children[event.numberCard.sort].show();
        }
    }
    // 隐藏所有子级别的方块
    hideChildren(event){
        if(this == event.block){
            this.card.setSort(event.numberButton.sort);
            this.element.classList.add("active");
        }
        for(let i = 1;i<10;i++){
            this.children[event.numberButton.sort].hide();
        }
    }
    showChildren(event){
        if(this == event.block){
            // this.card.hi(event.numberCard.sort);
            this.element.classList.remove("active");
        }
        for(let i = 1;i<10;i++){
            this.children[event.numberCard.sort].show();
        }
    }
}
// 按钮
class NumberButton extends Component{
    constructor(sort){
        // 创建数字按钮
        super(sort);
        this.createElementSelf('button',`numberButton`);
        this.element.classList.add(`n${sort}`);
        this.element.setAttribute("sort",sort);
        this.element.innerText = sort;
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
    isHide(event){
        if(this.sort == event.numberButton.sort){
            this.hide();
        }
    }
}
// 数字卡片
class NumberCard extends Component{
    constructor(sort){
        // 创建卡片
        super(sort);
        this.createElementSelf('button','numberCard');
        this.EventInit();
    }
    // 事件上报
    EventInit(){
        // 数字按钮被点击
        this.element.onclick = ()=>{
            if(this.parent.isStone && !this.parent.parent.parent.canChangeStone){
                return false;
            }
            this.parent.parent.parent.CardRightClick(this);
            return false;
        }
    }
    // 设置数字
    setSort(sort){
        this.sort = sort;
        this.element.innerText = sort;
    }
    // 显示方块本身
    show(sort){
        // this.setNumber(sort);
    }
}