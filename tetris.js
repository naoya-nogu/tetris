var cols = 10 ,rows = 20;　//マスとしての大きさ定義
var board = []　//ボード上の情報
var time;　//ゲームを実行する時間を定義
var current;　//今操作しているブロックの形
var currentX , currentY ; //今操作しているブロックの位置
var shapes = [　//今操作しているブロックの種類
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
//ブロックの色の種類
var colors = ["green","red","yellow","aqua","orange","blue","purples"]

function newgame(){
  clearInterval(interval);  // ゲームタイマーをクリア
  vanish();  // 盤面をまっさらにする
  newshape();  // 操作ブロックをセット
  lose = false;  // 負け
  interval = setInterval( tick, 250 );  // 250ミリ秒ごとにtickという関数を呼び出す
}

function vanish(){ //盤面を空にする 
  for ( var y = 0; y < ROWS; ++y ) {
    board[ y ] = [];
    for ( var x = 0; x < COLS; ++x ) {
      board[ y ][ x ] = 0;
    }
  }
}

function newshape(){
  var id = Math.floor(Math.random() * shapes.length) // ブロックをランダムで決めている
  var shape = shapes[ id ] ;
  current = [];
  for (var y = 0; y < 4 ;++y ){
    current [y] = [];
    for (var x = 0 ;x < 4 ;++x){
      var i = 4 * y + x ;
      if ( typeof shape[i] != 'underfined' && shape[i]){ //shapeが未定義じゃないことを表している
        current [y][x] = id + 1;
      }
      else{
        current[y][x] = 0;
      }
    }
  }
  //ブロックを盤面上にセットする
  currentX = 5;
  currentY = 0;
}

function tick(){
  if(valid(0,1)){
    ++currentY;
  }
  else{
    freeze();//操作していたブロックを固定する
    clearLines(); //一列そろったところを消す
    if (lose){
      newgame();//またゲームをスタート
      return false;
    }
    newshape();
  }
}

//入力した方向が移動可能なのかを判断する
//ゲームオーバー判定をする
function valid (offsetX,offsetY,newCurrent){
  offsetX = offsetX || 0 ;
  offsetY = offsetY || 0 ;
  offsetX = currentX + offsetX;
  offsetY = currentY + offsetY;
  newCurrent = newCurrent || current;
  for (var y = 0;y < 4 ; ++y ){
    for(var x = 0;x < 4; ++x){
      if (newCurrent[y][x]){
        if (typeof board[y + offsetY] == 'underfined'
          || typeof board[y + offsetY][x + offsetX] == 'underfined'
          || board[y + offsetY][x + offsetX]
          || x + offsetX < 0
          || y + offsetY >= rows
          || x + offsetX >= cols ){
              if (offsetY == 1 && offsetX - currentX == 0 && offsetY - currentY == 1){
                console.log("game over");
                lose = true; //もし操作するブロックが盤面の上にあったらゲームオーバー
              }
              return false;
        }
      }
    }
  }
  return true;
}
//操作するブロックを固定する関数
function freeze() {
  for ( var y = 0; y < 4; ++y ) {
    for ( var x = 0; x < 4; ++x ) {
      if ( current[ y ][ x ] ) {
        board[ y + currentY ][ x + currentX ] = current[ y ][ x ];
      }
    }
  }
}

//一列そろっているかを確認して、そろっていたら消す
function clearLines(){
  for (var y = rows - 1; y >= 0 ; --y){
    rowFilled = true;
    //一列そろっているか確認
    for (var x = 0; x < cols; ++x){
      if (board[y][x] == 0){
        rowFilled = false;
        break;
      }
    }
    //そろったブロックの上のブロックを一段落とす
    if (rowFilled){
      for (var yy = y;yy > 0;--yy){
        for (var x = 0;x < cols ; ++x){
          board[yy][x] = board[yy - 1][x];
        }
      }
      ++y ;//一段落したのでチェック処理を一段下に送る
    }
  }
}

newgame