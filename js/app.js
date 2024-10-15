window.addEventListener("load", () => {
  //追加ボタンを押したらgetInputValue要素を取得
  const addButton = document.getElementById("js-add");
  addButton.addEventListener("click", getInputValue);
});

//addボタンを押したら入力内容を取得
//未完了エリアに取得した内容を表示
function getInputValue() {
  //input要素を取得
  const input = document.getElementById("js-input");

  //input要素の内容を取得
  const inputValue = input.value;

  //追加ボタンを押したら入力欄を空白にする
  input.value = "";

  //生成した要素を未完了エリアに追加する関数を追加
  addIncomplete(inputValue);
}

function addIncomplete(inputvalue) {
  //作成したp要素を取得
  const target = createIncompleteElement();

  //p要素に入力内容を設定
  target.textContent = inputvalue;
}

/*
1. 入力内容を取得
2. incomplete__list, incomplete__todo-content, incomplete__todo-content-textを生成
3. ターゲットにするp要素を取得
4. p要素のvalueに取得した内容を格納
*/

//要素を動的に生成する処理
function createIncompleteElement() {
  const incompleteListElement = document.createElement("div");
  incompleteListElement.className = "incomplete__list";

  //生成した要素を追加する親要素を取得
  const parentElement = document.getElementById("parent");

  //親要素の子要素として生成した要素を追加
  parentElement.appendChild(incompleteListElement);

  const incompleteTodoContent = document.createElement("div");
  incompleteTodoContent.className = "incomplete__todo-content";
  incompleteListElement.appendChild(incompleteTodoContent);

  const incompleteTodoContentText = document.createElement("p");
  incompleteTodoContentText.className = "incomplete__todo-content-text";
  incompleteTodoContent.appendChild(incompleteTodoContentText);

  const incompleteCompleteButton = document.createElement("button");
  incompleteCompleteButton.type = "button";
  incompleteCompleteButton.className = "incomplete__complete-button";
  incompleteCompleteButton.textContent = "完了";
  incompleteListElement.appendChild(incompleteCompleteButton);

  const incompleteDeleteButton = document.createElement("button");
  incompleteDeleteButton.type = "button";
  incompleteDeleteButton.className = "incomplete__delete-button";
  incompleteDeleteButton.textContent = "削除";
  incompleteListElement.appendChild(incompleteDeleteButton);

  //各ボタンにイベントリスナーを追加
  incompleteCompleteButton.addEventListener("click", function () {
    const completeTarget = this.closest(".incomplete__list");
    console.log(deleteTarget);
    if (completeTarget) {
      completeTarget.remove();
      //削除してから完了エリアに移動
    }
  });

  incompleteDeleteButton.addEventListener("click", function () {
    const deleteTarget = this.closest(".incomplete__list");
    console.log(deleteTarget);
    if (deleteTarget) {
      deleteTarget.remove();
    }
  });

  return incompleteTodoContentText;
}

//削除ボタンを押したら要素を削除
//ページロード時点ではボタンが存在しないから動作しない
//const deleteButtons = document.querySelectorAll(".incomplete__delete-button"); //全ての削除ボタンを取得

// deleteButtons.forEach((deleteButton) => {
//   deleteButton.addEventListener("click", function () {
//     // const clickedButton = event.target;
//     console.log("削除ボタン押下");
//     const deleteTarget = this.closest(".incomplete__list");

//     deleteTarget.remove();
//   });
// });
