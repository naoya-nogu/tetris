//操作ボタンの設定
document.body.onkeydown = function(e){
  //キーの名前を設定する
  var keys = {
    37: 'left',
    39: 'right',
    40: 'down',
    38: 'rotate'
  };

  if (typeof keys [e.keyCode] != 'undefined') {
    //セットされたキーの場合はtetris.jsの処理を呼び出す
    keyPress(keys[e.keyCode]);
    //描画処理を行う
    render();
  }
};

