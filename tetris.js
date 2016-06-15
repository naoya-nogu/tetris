var cols = 10 ,rows = 20;
var board = []
var time;
var shapes = [
    [0,1,1,0,
     1,1,0,0],
    [1,1,0,0,
     0,1,1,0],
    [0,1,1,0,
     0,1,1,0],
    [1,1,1,1],
    [1,1,1,0,
     1,0,0,0],
    [1,1,1,0,
     0,0,1,0],
    [1,1,1,0, 
     0,1,0,0],
    ] 
var colors = ["green","red","yellow","aqua","orange","blue","purples"]

function newgame(){
  vanish();
}

function vanish(){
  for (var y = 0 ; ;y++){
    board[y] = []
    for (var x = 0 ; ; x++){

    }
  }
}

function newshape(){
  var id = 
}