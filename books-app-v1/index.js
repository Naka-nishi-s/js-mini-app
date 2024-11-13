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
      <td><button id=${bookInfo.id} onCLick="returnBook(${bookInfo.id})">本を返す</button></td>
      `;

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

  // filter処理
  const filteredBooks = filterBooks(booksArray, keyword);

  // filterした結果を表示
  displayBooks(filteredBooks);
};

/**
 * filter処理
 * @param books 検索対象の本一覧
 * @param keyword 検索に使用するキーワード
 * @param isInclude trueの場合は「キーワードを含む」検索、falseの場合は「キーワードを含まない」検索
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
 * 返却処理
 */
const returnBook = (id) => {
  // 現在表示されている要素を取得
  const tbody = document.getElementById("tbody");
  const rows = tbody.getElementsByTagName("tr");

  const dataList = Array.from(rows).map((row) => {
    const cells = row.getElementsByTagName("td");

    return {
      id: cells[0].textContent.trim(),
      title: cells[1].textContent.trim(),
      author: cells[2].textContent.trim(),
      rentDay: cells[3].textContent.trim(),
      returnDay: cells[4].textContent.trim(),
    };
  });

  const removedBooks = dataList.filter((data) => {
    // idを含むものは除外
    if (data.id.includes(id)) {
      return;
    }

    // 例(id=0は除外)
    if (data.id === "0") {
      return;
    }

    return data;
  });

  displayBooks(removedBooks);
};
