function mousedown1(){
    document.getElementById('title').innerHTML = "OMG You Clicked Me!";
}
function mouseup1(){
    var x = document.getElementById('title');
    x.innerHTML="XD";
    x.style.color="red";
}

//clear all the input
function clc(){
    for(var i=0;i<81;i++){
        document.getElementsByTagName("input")[i].value="";
        document.getElementsByTagName("input")[i].style.color='blue';
    }
    document.body.style.backgroundImage= "urf(sky.jpg)";
    document.body.style.backgroundSize= "1800px 1000px";
}

//press "show answer" button and show answer then
function get_answer(){
    var bool = check_input();
    if (bool){
        var grid = readAPuzzle();
        if(isnotValidGrid(grid)){
            alert("Invalid input, please try again!")
        }
        else{
            if(search(grid)){
                output_ans();
                document.body.style.backgroundImage="url(2.jpg)";
            }
            else{
                alert("Found no solution");
            }
        }
    }
}

//check if the input are vaild
function check_input(){
    var arr = new Array(81);
    for (var i=0;i<81;i++){
        arr[i] = Number(document.getElementsByTagName("input")[i].value);
        if(isNaN(arr[i])){
            alert('Invilid input: 1~9 only');
            return false;
        }
    }
    if(arr.every(function isZero(x){return x===0})){
        alert('No input!');
        return false;
    }
    return true;
}

function  readAPuzzle(){
    var arr = new Array();
        grid = new Array();
    for (var i=0; i<9; i++){
        grid[i] = new Array();
        for (var j=0; j<9;j++){
            grid[i][j]=0;
        }
    }
    for (var i = 0; i<81; i++){
        arr[i] = Number(document.getElementsByTagName("input")[i].value);
        grid[Math.floor(i/9)][i%9] = arr[i];
    }
    return grid
}

function isnotValidGrid(grid){
    for (var i = 0; i<9; i++){
        for(var j=0; j<9; j++){
            if ((grid[i][j]!=0)&&(!isValid(i,j,grid))){
                return true
            }
        }
    }
    return false
}

function isValid(i,j,grid){
    for (var colum = 0; colum <9; colum++){
        if ((grid[i][colum]==grid[i][j])&&(colum!=j)){
            return false
        }
    }
    for (var row = 0; row <9; row++){
        if ((grid[row][j]==grid[i][j])&&(row!=i)){
            return false
        }
    }
    for (var row = Math.floor(i/3)*3; row <Math.floor(i/3)*3+3; row++){
        for ( var colum=Math.floor(j/3)*3; colum<Math.floor(j/3)*3+3;colum++){
            if ((grid[row][colum]==grid[i][j])&&(i!=row)&&(j!=colum))
            return false
        } 
    }
    return true
}
function FreeZerocell(grid){
    var FreeZC = new Array();
    var index = 0;
    for (var i =0 ; i<9 ;i++){
        for (var j = 0; j<9 ; j++){
            if (grid[i][j]===0){
                FreeZC[index]=new Array(i,j);
                index++;
            }
        }
    }
    return FreeZC

}
function search(grid){
    var freeCelllist = FreeZerocell(grid);
    var numberofFreeCells= freeCelllist.length;
        if(numberofFreeCells==0){
            return true
        }
    var k = 0;

    while(true){
        var i = freeCelllist[k][0];
        var j = freeCelllist[k][1];
        if (grid[i][j] == 0){
            grid[i][j] = 1;
        }

        if (isValid(i,j,grid)){
            if (k+1 == numberofFreeCells){
                return true
            }
            else{
                k++;
            }
        }
        else {
            if (grid[i][j]<9){
                grid[i][j]++;
            }
            else{
                while (grid[i][j]==9){
                    if (k==0){
                        return false
                    }
                    grid[i][j]=0;
                    k--;
                    i=freeCelllist[k][0];
                    j=freeCelllist[k][1];
                }
                grid[i][j]++;
            }
        }
    }
    return true

}

function output_ans(){
    var grid = readAPuzzle();
    var grid_original = readAPuzzle();
    
    if(search(grid)){
        for(var i=0; i<81; i++){
            if(grid[Math.floor(i/9)][i%9] != grid_original[Math.floor(i/9)][i%9]){
                document.getElementsByTagName("input")[i].value = grid[Math.floor(i/9)][i%9];
                document.getElementsByTagName("input")[i].style.color = 'black';
            }
        }
    }    
}
