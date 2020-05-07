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
    document.body.style.backgroundImage= "urf(sky.png)";
    document.body.style.backgroundSize= "1800px 1000px";
}

//press "show answer" button and show answer then
function get_answer(){
    var bool = check_input();
    if (bool){
        var grid = readAPuzzle();
        if(!isValidGrid(grid)){
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
