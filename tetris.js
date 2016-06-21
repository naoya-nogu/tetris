var COLS = 10 ,ROWS = 20;　//マスとしての大きさ定義
var board = [];　//ボード上の情報
var lose; //一番上まで行ったかどうか
var interval;　//ゲームを実行する時間を定義
var current;　//今操作しているブロックの形
var currentX, currentY ; //今操作しているブロックの位置
var shapes = [　//今操作しているブロックの種類
    [0,1,1,0,
     1,1],
    [1,1,0,0,
     0,1,1],
    [0,1,1,0,
     0,1,1],
    [1,1,1,1],
    [1,1,1,0,
     1],
    [1,1,1,0,
     0,0,1],
    [1,1,1,0, 
     0,1],
    ] 
//ブロックの色の種類
var colors = [
  "green", "red", "yellow", "aqua", "orange", "blue", "purple"
];

function vanish(){ //盤面を空にする 
  for ( var y = 0; y < ROWS; ++y ) {
    board[ y ] = [];
    for ( var x = 0; x < COLS; ++x ) {
      board[ y ][ x ] = 0;
    }
  }
}

function newShape(){
  var id = Math.floor(Math.random() * shapes.length) // ブロックをランダムで決めている
  var shape = shapes[ id ] ;
  current = [];
  for (var y = 0; y < 4 ;++y ){
    current [ y ] = [];
    for (var x = 0 ;x < 4 ;++x){
      var i = 4 * y + x ;
      if ( typeof shape[ i ] != 'undefined' && shape[ i ]){ //shapeが未定義じゃないことを表している
        current [ y ][ x ] = id + 1;
      }
      else{
        current[ y ][ x ] = 0;
      }
    }
  }
  //ブロックを盤面上にセットする
  currentX = 5;
  currentY = 0;
}

function tick(){
  if( valid( 0,1 ) ){
    ++currentY;
  }
  else{
    freeze();//操作していたブロックを固定する
    clearLines(); //一列そろったところを消す
    if ( lose ){
      newGame();//またゲームをスタート
      return false;
    }
    newShape();
  }
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

// 操作ブロックを回す処理
function rotate( current ) {
  var newCurrent = [];
  for ( var y = 0; y < 4; ++y ) {
    newCurrent[ y ] = [];
    for ( var x = 0; x < 4; ++x ) {
      newCurrent[ y ][ x ] = current[ 3 - x ][ y ];
    }
  }
  return newCurrent;
}
//一列そろっているかを確認して、そろっていたら消す
function clearLines(){
  for (var y = ROWS - 1; y >= 0 ; --y){
    rowFilled = true;
    //一列そろっているか確認
    for (var x = 0; x < COLS; ++x){
      if (board[ y ][ x ] == 0){
        rowFilled = false;
        break;
      }
    }
    //そろったブロックの上のブロックを一段落とす
    if (rowFilled){
      for (var yy = y;yy > 0;--yy){
        for (var x = 0;x < COLS ; ++x){
          board[ yy ][ x ] = board[ yy - 1 ][ x ];
        }
      }
      ++y ;//一段落したのでチェック処理を一段下に送る
    }
  }
}

//キーボードを押された時に呼び出される関数
function keyPress(key){
  switch ( key ){
    case 'left':
      if ( valid( -1 ) ){
        --currentX;//左に一つずらす
      }
      break;
    case 'right':
      if( valid( 1 ) ){
        ++currentX;//右にずらす
      }
      break;
    case 'down':
      if ( valid( 0,1 ) ) {
        ++currentY;//下にずらす
      }
      break;
    case 'rotate':
      //操作ブロックを回す
      var rotated = rotate( current );
      if ( valid( 0, 0,rotated ) ){
        current = rotated;//回した後の状態に操作ブロックをセットする
      }
      break;
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
      if (newCurrent[ y ][ x ]){
        if (typeof board[ y + offsetY ] == 'undefined'
          || typeof board[ y + offsetY ][ x + offsetX ] == 'undefined'
          || board[ y + offsetY ][ x + offsetX ]
          || x + offsetX < 0
          || y + offsetY >= ROWS
          || x + offsetX >= COLS ){
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

function newGame(){
  clearInterval(interval);  // ゲームタイマーをクリア
  vanish();  // 盤面をまっさらにする
  newShape();  // 操作ブロックをセット
  lose = false;  // 負け
  interval = setInterval( tick, 250 );  // 250ミリ秒ごとにtickという関数を呼び出す
}

newGame(); //ゲームを開始する