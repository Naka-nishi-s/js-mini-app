const bookList = [
  { title: "なかにしの絵本", author: "Nakanishi", date: "2024/3/1 10:00:00" },
];

// 初期表示
document.addEventListener("DOMContentLoaded", () => {
  renderBookList();
});

/**
 * 書籍一覧 表示用関数
 * memosの中身をリスト表示する
 */
const renderBookList = () => {
  // 書籍一覧を取得
  const tableBody = document.querySelector("#bookList tbody");

  // 書籍一覧を初期化
  tableBody.innerHTML = "";

  bookList.forEach((book) => {
    const row = document.createElement("tr");
    ["title", "author", "date"].forEach((key) => {
      const cell = document.createElement("td");
      cell.textContent = book[key];
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
};

/**
 * Memo追加用関数
 * ボタン押下時、ランダムな文字列を生成し、書籍一覧の配列の最後尾に追加する
 */
const addBook = () => {
  const newBook = {
    title: `Title-${Math.floor(Math.random() * 100)}`,
    author: `Author-${Math.floor(Math.random() * 100)}`,
    date: new Date().toLocaleString(),
  };

  // 現在の書籍一覧の最後尾に追加
  bookList.push(newBook);

  // 書籍を一覧表示
  renderBookList();
};

/**
 * Memo削除用関数
 * ボタン押下時、書籍一覧の配列の最後尾から要素を1つ削除する
 */
const removeBook = () => {
  // 書籍一覧の配列の最後尾の要素を削除
  bookList.pop();

  // 書籍を一覧表示
  renderBookList();
};
