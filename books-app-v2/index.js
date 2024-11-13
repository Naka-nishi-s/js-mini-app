// 返却日
const RETURN_DAYS = 3;

// 本の内容をオブジェクトとして格納
const booksArray = [
  {
    id: 1,
    title: "時給300円の死神",
    author: "藤まる",
    rentDay: "",
    returnDay: "",
  },
  {
    id: 2,
    title: "夢を叶えるゾウ",
    author: "水野 敬也",
    rentDay: "",
    returnDay: "",
  },
  {
    id: 3,
    title: "ノルウェイの森",
    author: "村上 春樹",
    rentDay: "",
    returnDay: "",
  },
  {
    id: 4,
    title: "火花",
    author: "又吉 直樹",
    rentDay: "",
    returnDay: "",
  },
  {
    id: 5,
    title: "海辺のカフカ",
    author: "村上 春樹",
    rentDay: "",
    returnDay: "",
  },
  {
    id: 6,
    title: "嫌われる勇気",
    author: "岸見 一郎",
    rentDay: "",
    returnDay: "",
  },
  {
    id: 7,
    title: "コンビニ人間",
    author: "村田 沙耶香",
    rentDay: "",
    returnDay: "",
  },
  {
    id: 8,
    title: "夜は短し歩けよ乙女",
    author: "森見 登美彦",
    rentDay: "",
    returnDay: "",
  },
  {
    id: 9,
    title: "雪国",
    author: "川端 康成",
    rentDay: "",
    returnDay: "",
  },
  {
    id: 10,
    title: "モモ",
    author: "ミヒャエル・エンデ",
    rentDay: "",
    returnDay: "",
  },
];

/**
 * 表示用関数
 * @param {*} booksInformation
 */
const displayBooks = (booksInformation) => {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  // サンプル用は別作成
  const tr = document.createElement("tr");
  tr.classList.add("box0");
  tr.innerHTML = `
     <td>0</td>
     <td>時給300円の死神</td>
     <td>藤まる</td>
     <td>yyyy/mm/dd(aaa)</td>
     <td>yyyy/mm/dd(aaa)</td>
     <td></td>
      `;

  tbody.append(tr);

  booksInformation.forEach((bookInfo, index) => {
    // trを作成
    const tr = document.createElement("tr");
    tr.classList.add("box1");

    // trにtdを追加
    tr.innerHTML = `
      <td>${bookInfo.id}</td>
      <td>${bookInfo.title}</td>
      <td>${bookInfo.author}</td>
      <td>${bookInfo.rentDay}</td>
      <td>${bookInfo.returnDay}</td>
      <td></td>
      `;

    // ボタン要素を作成
    const button = document.createElement("button");
    button.textContent = bookInfo.rentDay === "" ? "借りる" : "返却する";
    button.addEventListener("click", () => {
      if (bookInfo.rentDay === "") {
        rentBook(bookInfo.id);
      } else {
        returnBook(bookInfo.id);
      }
    });

    // ボタンを最後の td に追加
    tr.querySelector("td:last-child").appendChild(button);

    tbody.append(tr);
  });
};

/**
 * 検索処理
 * @param event イベント処理
 */
const handleSubmit = (event) => {
  event.preventDefault();

  // inputの内容を小文字で取得
  const keyword = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();

  const booksData = getBooksFromLocalStorage();

  // filter処理
  const filteredBooks = filterBooks(booksData, keyword);

  saveFilteredBooksToLocalStorage(filteredBooks);

  // filterした結果を表示
  displayBooks(filteredBooks);
};

/**
 * filter処理
 * @param books 検索対象の本一覧
 * @param keyword 検索に使用するキーワード
 */
const filterBooks = (books, keyword, isInclude = true) => {
  if (isInclude) {
    return books.filter(
      (bookInfo) =>
        bookInfo.author.toLowerCase().includes(keyword) ||
        bookInfo.title.toLowerCase().includes(keyword)
    );
  }
};

/**
 * 借りる処理
 * @param {*} id
 */
const rentBook = (id) => {
  let booksData;

  const filteredBooksData = getFilteredBooksFromLocalStorage();
  const normalBooksData = getBooksFromLocalStorage();

  if (filteredBooksData) {
    booksData = filteredBooksData;
  } else {
    booksData = normalBooksData;
  }

  if (!booksData) {
    alert("借りる本のデータが見つかりませんでした。");
    return;
  }

  const rentBookData = booksData.find((book) => book.id === id);

  // 現在日時を取得
  const date = new Date();

  // 借りた日は現在
  rentBookData.rentDay = date.toLocaleDateString("sv-SE");

  // 返す日は RETURN_DAYS 日後
  date.setDate(date.getDate() + RETURN_DAYS);
  rentBookData.returnDay = date.toLocaleDateString("sv-SE");

  // データを差し替え
  const newBooksData = booksData.map((books) =>
    books.id === id ? rentBookData : books
  );

  if (filteredBooksData) {
    saveFilteredBooksToLocalStorage(newBooksData);
  } else {
    saveBooksToLocalStorage(newBooksData);
  }

  displayBooks(newBooksData);
};

/**
 * 返却処理
 */
const returnBook = (id) => {
  let booksData;

  const filteredBooksData = getFilteredBooksFromLocalStorage();
  const normalBooksData = getBooksFromLocalStorage();

  if (filteredBooksData) {
    booksData = filteredBooksData;
  } else {
    booksData = normalBooksData;
  }

  if (!booksData) {
    alert("借りる本のデータが見つかりませんでした。");
    return;
  }

  const rentBookData = booksData.find((book) => book.id === id);

  // 借りた日と返す日を空欄にする
  rentBookData.rentDay = "";
  rentBookData.returnDay = "";

  // データを差し替え
  const newBooksData = booksData.map((books) =>
    books.id === id ? rentBookData : books
  );

  if (filteredBooksData) {
    saveFilteredBooksToLocalStorage(newBooksData);
  } else {
    saveBooksToLocalStorage(newBooksData);
  }

  displayBooks(newBooksData);
};

/**
 * 書籍の情報を、LocalStorageに保存する関数
 * @param {*} books
 */
const saveBooksToLocalStorage = (books) => {
  localStorage.setItem("booksData", JSON.stringify(books));
};

/**
 * 書籍情報を、LocalStorageから取得する関数
 * @returns
 */
const getBooksFromLocalStorage = () => {
  const booksData = localStorage.getItem("booksData");
  return booksData ? JSON.parse(booksData) : null;
};

/**
 * 書籍のフィルターした情報を、LocalStorageに保存する関数
 * @param {*} books
 */
const saveFilteredBooksToLocalStorage = (books) => {
  localStorage.setItem("filteredBooksData", JSON.stringify(books));
};

/**
 * 書籍のフィルターした情報を、LocalStorageから取得する関数
 * @returns
 */
const getFilteredBooksFromLocalStorage = () => {
  const booksData = localStorage.getItem("filteredBooksData");
  return booksData ? JSON.parse(booksData) : null;
};

/**
 * 初期処理
 * LocalStorageにデータがある場合は、取得して表示
 * LocalStorageにデータが無い場合は、LocalStorageに初期データを保存して表示
 */
const initializeBooksApp = () => {
  const booksData = getBooksFromLocalStorage();
  if (booksData) {
    displayBooks(booksData);
  } else {
    saveBooksToLocalStorage(booksArray);
    displayBooks(booksArray);
  }
};

initializeBooksApp();

/**
 * 検索結果の削除処理
 */
const clearData = () => {
  // inputの内容を削除
  document.getElementById("searchInput").value = "";

  // LocalStorageの内容を削除
  localStorage.removeItem("filteredBooksData");

  // 初期表示
  initializeBooksApp();
};
