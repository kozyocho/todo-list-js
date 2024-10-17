window.addEventListener("load", () => {
  //追加ボタンを押したらgetInputValue要素を取得
  const addButton = document.getElementById("js-add");
  addButton.addEventListener("click", getInputValue);
});

let inputValue = "";
let todoText = "";

//addボタンを押したら入力内容を取得
//未完了エリアに取得した内容を表示
function getInputValue() {
  //input要素を取得
  const input = document.getElementById("js-input");

  //input要素の内容を取得
  inputValue = input.value;

  //追加ボタンを押したら入力欄を空白にする
  input.value = "";

  //生成した要素を未完了エリアに追加する関数を追加
  createIncompleteElement();
}

//要素を動的に生成する処理
function createIncompleteElement(todoText_) {
  const incompleteListElement = document.createElement("div");
  incompleteListElement.className = "todo__list-item";

  //生成した要素を追加する親要素を取得
  const incompleteParentElement = document.getElementById("incomplete-parent");

  //親要素の子要素として生成した要素を追加
  incompleteParentElement.appendChild(incompleteListElement);

  const incompleteTodoContent = document.createElement("div");
  incompleteTodoContent.className = "todo__list-content";
  incompleteListElement.appendChild(incompleteTodoContent);

  const incompleteTodoContentText = document.createElement("p");
  incompleteTodoContentText.className = "todo__list-content-text";
  incompleteTodoContent.appendChild(incompleteTodoContentText);
  if (todoText_) {
    incompleteTodoContentText.textContent = todoText_;
  } else {
    incompleteTodoContentText.textContent = inputValue;
  }

  const incompleteCompleteButton = document.createElement("button");
  incompleteCompleteButton.type = "button";
  incompleteCompleteButton.className = "todo__complete-button";
  incompleteCompleteButton.textContent = "完了";
  incompleteListElement.appendChild(incompleteCompleteButton);

  const incompleteDeleteButton = document.createElement("button");
  incompleteDeleteButton.type = "button";
  incompleteDeleteButton.className = "todo__delete-button";
  incompleteDeleteButton.textContent = "削除";
  incompleteListElement.appendChild(incompleteDeleteButton);

  //未完了ボックス内の完了ボタンにイベントリスナーを追加
  incompleteCompleteButton.addEventListener("click", function () {
    const completeTarget = this.closest(".todo__list-item");

    if (completeTarget) {
      //未完了ボックスから削除して完了ボックスに移動。テキストを保存しておく。
      const todoTextElement = completeTarget.querySelector(
        ".todo__list-content-text"
      );
      todoText = todoTextElement.textContent;
      completeTarget.remove();
      createCompleteElement(todoText);
    }
  });

  //未完了ボックス内の削除ボタンにイベントリスナーを追加
  incompleteDeleteButton.addEventListener("click", function () {
    const deleteTarget = this.closest(".todo__list-item");

    if (deleteTarget) {
      deleteTarget.remove();
    }
  });

  return incompleteTodoContentText;
}

function createCompleteElement(todoText_) {
  //完了エリアに移動
  //生成した要素を追加するための親要素を取得
  const completeParentElement = document.getElementById("complete-parent");

  const completeListElement = document.createElement("div");
  completeListElement.className = "todo__list-item";
  completeParentElement.appendChild(completeListElement);

  const completeTodoContent = document.createElement("div");
  completeTodoContent.className = "todo__list-content";
  completeListElement.appendChild(completeTodoContent);

  const completeTodoContentText = document.createElement("p");
  completeTodoContentText.className = "todo__list-content-text";
  completeTodoContent.appendChild(completeTodoContentText);
  if (todoText_) {
    completeTodoContentText.textContent = todoText_;
  } else {
    console.log("テキストがありません。");
  }

  const completeBackButton = document.createElement("button");
  completeBackButton.type = "button";
  completeBackButton.className = "todo__back-button";
  completeBackButton.textContent = "戻す";
  completeListElement.appendChild(completeBackButton);

  const completeDeleteButton = document.createElement("button");
  completeDeleteButton.type = "button";
  completeDeleteButton.className = "todo__delete-button";
  completeDeleteButton.textContent = "削除";
  completeListElement.appendChild(completeDeleteButton);

  //完了ボックス内の戻るボタンにイベントリスナーを追加。クリックしたら未完了ボックスに移動
  completeBackButton.addEventListener("click", function () {
    const backTarget = this.closest(".todo__list-item");

    if (backTarget) {
      //完了ボックスから削除して未完了ボックスに移動
      //戻す要素の子要素にある.todo__list-content-textを取得
      const todoTextElement = backTarget.querySelector(
        ".todo__list-content-text"
      );
      todoText = todoTextElement.textContent;
      backTarget.remove();
      createIncompleteElement(todoText);
    }
  });

  //完了ボックス内の削除ボタンにイベントリスナーを追加
  completeDeleteButton.addEventListener("click", function () {
    const deleteTarget = this.closest(".todo__list-item");

    if (deleteTarget) {
      deleteTarget.remove();
    }
  });

  return completeTodoContentText;
}
