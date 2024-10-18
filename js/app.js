window.addEventListener("load", () => {
  const addButton = document.getElementById("js-add");
  addButton.addEventListener("click", handleAddTodo);
});

function handleAddTodo() {
  const input = document.getElementById("js-input");
  const inputValue = input.value.trim();

  if (inputValue) {
    createTodoElement(inputValue, "incomplete-parent", true);
    input.value = ""; // 入力欄をクリア
  }
}

/**
 * リストの内容を作成する関数
 * @param {String} text 各リストの内容
 * @param {String} parentId 親要素のid
 * @param {Boolean} isIncomplete 未完了か完了かのフラグ
 */
function createTodoElement(text, parentId, isIncomplete = true) {
  //リストを生成する基準となる親要素を取得
  const parentElement = document.getElementById(parentId);

  //先にリスト用の要素を生成しておく
  //Todoリスト項目の親要素となる div を生成
  const listItem = document.createElement("div");
  listItem.className = "todo__list-item";

  // コンテンツ部分の div を生成し、listItemに追加
  const content = document.createElement("div");
  content.className = "todo__list-content";
  listItem.appendChild(content);

  // Todoリストのテキストを表示するp要素を生成し、コンテンツに追加
  const contentText = document.createElement("p");
  contentText.className = "todo__list-content-text";
  contentText.textContent = text;
  content.appendChild(contentText);

  //ボタン生成時に引数で受け取ったフラグによって未完了か完了か分岐
  if (isIncomplete) {
    //未完了の場合"完了"ボタンを生成し、クリック時に未完了リストから削除して完了リストへ移動するイベントを設定
    const completeButton = createButton("完了", "todo__complete-button", () => {
      //作成した完了ボタンがクリックされた時の処理
      listItem.remove();

      //完了に移動
      createTodoElement(text, "complete-parent", false);
    });
    listItem.appendChild(completeButton);
  } else {
    //完了の場合
    const backButton = createButton("戻す", "todo__back-button", () => {
      //作成した戻すボタンがクリックされた時の処理
      listItem.remove();

      //未完了に戻す
      createTodoElement(text, "incomplete-parent", true);
    });
    listItem.appendChild(backButton);
  }

  //削除ボタンは共通で作成、クリック時に項目をリストから削除するイベントを設定
  const deleteButton = createButton("削除", "todo__delete-button", () => {
    listItem.remove();
  });
  listItem.appendChild(deleteButton);

  //親要素にこのリスト項目を追加
  parentElement.appendChild(listItem);
}

/**
 * ボタンを作成する関数
 * @param {String} label 各ボタンに表示するボタン名
 * @param {String} className 各ボタンのクラス名
 * @param {(event: MouseEvent) => void} onClick 各ボタンクリック時の挙動
 * @returns {HTMLButtonElement} ボタン要素を返す
 */
function createButton(label, className, onClick) {
  //ボタンタグを生成
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;

  //引数で受け取ったonClick関数をイベントリスナーに登録
  button.addEventListener("click", onClick);
  return button;
}
