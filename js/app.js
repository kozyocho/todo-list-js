//addボタンを押したら入力内容を取得
//未完了エリアに取得した内容を表示

function getInputValue() {
  //input要素を取得
  const input = document.getElementById("js-input");

  //input要素の内容を取得
  const inputValue = input.value;

  console.log(inputValue);

  //追加ボタンを押したら入力欄を空白にする
  input.value = "";
}

//追加ボタンを押したらgetInputValue要素を取得
const addButton = document.getElementById("js-add");

addButton.addEventListener("click", getInputValue);
