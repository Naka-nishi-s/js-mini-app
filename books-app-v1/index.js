// 本の内容をオブジェクトとして格納
const booksArray = [
  {
    id: 1,
    title: "AAA",
    author: "MikeToYou",
    rentDay: "2024-01-01",
    returnDay: "2024-03-03",
  },
  {
    id: 2,
    title: "BBB",
    author: "NiceToYou",
    rentDay: "2024-01-04",
    returnDay: "2024-03-06",
  },
  {
    id: 3,
    title: "CCC",
    author: "GreatToYou",
    rentDay: "2024-01-06",
    returnDay: "2024-03-08",
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

  console.log(removedBooks);
  displayBooks(removedBooks);
};

// // 『本を借りる』ボタンで配列内の本の情報をランダムで取得して一覧に追加する。
// function BookInfoAdd() {
//   // booksArrayからランダムに本を取得
//   const keys = Object.keys(booksArray); // オブジェクトのキーを取得
//   const randomKey = keys[Math.floor(Math.random() * keys.length)]; // ランダムなキーを取得
//   const randomBook = booksArray[randomKey]; // ランダムな本の情報

//   // タイトル名と著者名を取得
//   const title = randomBook.title;
//   const author = randomBook.author;

//   // 本を借りた日を設定
//   const today = new Date();
//   const checkoutBook = formatDate(today); // フォーマットに合わせて表示
//   console.log(checkoutBook);

//   // 本を返す日を設定
//   const returnBook = formatDate(DaysLater(today, 5));
//   console.log(returnBook);

//   // それぞれ
//   BookAdd(title, author, checkoutBook, returnBook);

//   // リスト項目を作成して追加
//   const listItem = document.createElement("li");
//   listItem.textContent = `${randomBook.title} - 著者: ${randomBook.author}`;
//   bookList.appendChild(listItem); // リストに追加
// }

// // 日付を "yyyy/mm/dd" 形式でフォーマットする
// function formatDate(date) {
//   // 年、月、日にち、曜日を設定
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0"); // 月は0から始まるため+1し、2桁に揃える
//   const day = String(date.getDate()).padStart(2, "0"); // 日を2桁に揃える
//   const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
//   const dayOfWeek = weekdays[date.getDay()]; // 曜日を取得

//   // 戻り値として返す
//   return `${year}/${month}/${day}(${dayOfWeek})`;
// }

// // 営業日の計算
// function DaysLater(startDate, days) {
//   let date = new Date(startDate); // 開始日を基準に新しいDateオブジェクトを作成
//   let addedDays = 0;

//   // 営業日を日数分カウントする
//   while (addedDays < days) {
//     date.setDate(date.getDate() + 1); // 日付を1日進める

//     // 土日以外であれば営業日としてカウント
//     if (date.getDay() !== 0 && date.getDay() !== 6) {
//       addedDays++;
//     }
//   }

//   // 戻り値として返す
//   return date;
// }

// // 要素の追加
// function BookAdd(book_title, book_author, book_checkout, book_return) {
//   // 新しい<div>要素を作成して、クラスを追加
//   const newDiv = document.createElement("div");
//   newDiv.classList.add("list");

//   // 新しい<div>要素を作成して、クラスを追加
//   const newItemBox = document.createElement("div");
//   newItemBox.classList.add("item-box");
//   newItemBox.classList.add("box1");

//   // 新しい<div>要素を作成して、クラスを追加
//   const newItems1 = document.createElement("div");
//   newItems1.classList.add("items1");

//   // 新しい<div>要素を作成して、クラスを追加(No)
//   const newInfo1 = document.createElement("div");
//   newInfo1.classList.add("item");

//   // 全てのBookNoをオブジェクトとして取得
//   const bookNo = document.querySelectorAll(".book-No");

//   // LastNoを最後のBookNoオブジェクトとして定義
//   const lastBookNo = bookNo[bookNo.length - 1];
//   const lastNo = lastBookNo.textContent;

//   // No(lastNoに+1した値)を作成
//   newInfo1.textContent = lastNo + 1;
//   console.log(newInfo1.textContent);

//   // newItems1内に要素を追加する
//   newItems1.appendChild(newInfo1);
//   newItemBox.appendChild(newItems1);

//   // 新しい配列を定義して、要素を作成後、クラスを追加する
//   const ArrayItem = [book_title, book_author, book_checkout, book_return];
//   for (let i = 0; i < ArrayItem.length; i++) {
//     // 新しい<div>要素を作成して、クラスを追加
//     const newItems2 = document.createElement("div");
//     newItems2.classList.add("items2");

//     // 新しい<div>要素を作成して、クラスを追加
//     const newInfo2 = document.createElement("div");
//     newInfo2.classList.add("item");

//     // 繰り返したい処理をここに記述
//     console.log(`ループ回数: ${i}`);

//     // 要素内に値を追加する
//     newInfo2.textContent = ArrayItem[i];
//     console.log(ArrayItem[i]);

//     // newItems2内に要素を追加する
//     newItems2.appendChild(newInfo2);
//     newItemBox.appendChild(newItems2);
//   }

//   // ボタンの要素を追加
//   const btn = document.createElement("button");
//   btn.classList.add("item-btn");
//   btn.textContent = "本を返す";

//   // 上記の要素をすべて統合
//   newDiv.appendChild(newItemBox);
//   newDiv.appendChild(btn);

//   // 一覧に新しい本の情報を追加
//   document.querySelector(".contents-area").appendChild(newDiv);
// }
