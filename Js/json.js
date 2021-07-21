let tampilkanwaktu = () => {
  //fungsi ini akan dipanggil di bodyOnLoad dieksekusi tiap 1000ms = 1detik
  var waktu = new Date(); //membuat object date berdasarkan waktu saat
  var sh = waktu.getHours() + ""; //memunculkan nilai jam, //tambahan script + "" supaya variable sh bertipe string sehingga bisa dihitung panjangnya : sh.length    //ambil nilai menit
  var sm = waktu.getMinutes() + ""; //memunculkan nilai detik
  var ss = waktu.getSeconds() + ""; //memunculkan jam:menit:detik dengan menambahkan angka 0 jika angkanya cuma satu digit (0-9)
  document.getElementById("clock").innerHTML =
    (sh.length == 1 ? "0" + sh : sh) +
    ":" +
    (sm.length == 1 ? "0" + sm : sm) +
    ":" +
    (ss.length == 1 ? "0" + ss : ss);
};
let header = document.getElementById("header");
let sidebar = document.getElementById("sidebar-menu");
header.innerHTML = `
<span class="logo">
        <a href="/template/backend/admin.html">Admin Dashboard</a>
      </span>
      <span class="website-menu">
        <a href="/template/frontend/index.html"> Logout</a>
      </span>
`;
sidebar.innerHTML = `
    <div>
            <h3 id="clock"></h3>
          </div>
          <ul>
            <li class="fa fa-tachometer"><a href="/template/backend/admin.html"> Dashboard</a></li>
            <li class="fa fa-user">
              <a href="/template/backend/profile_admin.html"> My Profile</a>
            </li>
            <li class="fa fa-database">
              <a href="/template/backend/master_data.html"> Master Data</a>
            </li>
            <li class="fa fa-database">
              <a href="/template/backend/crud.html"> Crud Data</a>
            </li>
            <li class="fa fa-database">
              <a href="/template/backend/json.html"> JsonPlaceholder Data</a>
            </li>
            <li class="fa fa-sign-out-alt">
              <a href="/template/frontend/index.html"> Logout</a>
            </li>
          </ul>
        </div>
`;
let limit = 5; //view of limited
let allData = []; //tampung data JSON user
let allAlbum = []; //tampung data JSON album
let allPhoto = []; //tampung data JSON photo
let userData = []; //tampung data JSON ALL untuk ditampilkan di tabel
let currentIndex = 0;
let maxButtonPage = 5; //maksimal tampilan button
let filteredUsers = [];

const buildData = () => {
  for (let i = 0; i < allPhoto.length - 4000; i++) {
    //LIST of PhotoData
    const photoData_ith = allPhoto[i];
    const albumNameById = allAlbum.filter(function (currentElement) {
      //ARRAY of Album
      return currentElement.id === photoData_ith.albumId;
    });
    const userNameById = allData.filter(function (currentElement) {
      //ARRAY of User
      return currentElement.id === albumNameById[0].userId;
    });
    userData.push({
      id: photoData_ith.id,
      photoName: photoData_ith.title,
      albumName: albumNameById[0].title,
      user: userNameById[0].name,
      url: photoData_ith.url,
      thumbnail: photoData_ith.thumbnailUrl,
    });
    console.log(photoData_ith);
  }
};
console.log(userData);
// get data from JSON Placeholder
const getDataUsers = async () => {
  await fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => (allData = json));
};
const getDataAlbum = async () => {
  await fetch("https://jsonplaceholder.typicode.com/albums")
    .then((response) => response.json())
    .then((json) => (allAlbum = json));
};
const getDataPhoto = async () => {
  await fetch("https://jsonplaceholder.typicode.com/photos")
    .then((response) => response.json())
    .then((json) => (allPhoto = json));
};

const renderTable = () => {
  const datas = userData.slice(
    currentIndex * limit,
    (currentIndex + 1) * limit
  );
  // const albums = allAlbum.slice(currentIndex * limit, (currentIndex + 1) * limit);
  // const photos = allPhoto.slice(currentIndex * limit, (currentIndex + 1) * limit);
  const table = document.querySelector("tbody");

  tr = "";
  let no = 1;
  datas.forEach((data, idx) => {
    tr += `
              <tr>
                  <td>${data.id}</td>
                  <td>${data.photoName}</td>
                  <td>${data.albumName}</td>
                  <td>${data.user}</td>
                  <td><img id="myImg" src="${data.thumbnail}" onClick="imgPop('${data.url}','${data.photoName}')"></td>
                  <td></td>
                  <td></td>
              </tr>
          `;
  });

  table.innerHTML = tr;
  renderPageButton();
};

const renderPageButton = () => {
  const pagination = document.querySelector(".pagination");
  let pageStart = 1;
  let pageEnd = maxButtonPage;
  const pageTotal = userData.length / limit;
  const space = Math.floor(maxButtonPage / 2);

  if (currentIndex - space > 0) {
    if (currentIndex + space >= pageTotal) {
      pageStart = pageTotal - maxButtonPage + 1;
      pageEnd = pageTotal;
    } else {
      pageStart = currentIndex - space + 1;
      pageEnd = currentIndex + space + 1;
    }
  }

  let button = `<span class="prev">Prev</span>`;
  for (let index = pageStart; index <= pageEnd; index++) {
    // let classSelected = ""
    // if (index == currentIndex + 1) classSelected = "active"

    button += `<span class="number ${
      index == currentIndex + 1 ? "active" : ""
    }" data-pagination=${index}>${index}</span>`;
  }
  button += `<span class="next">Next</span>`;

  pagination.innerHTML = button;
};

const nextPage = () => {
  // console.log("next");

  if (userData.length / limit > currentIndex + 1) {
    currentIndex += 1;
    renderTable();
  }
};

const prevPage = () => {
  // console.log("prev");

  if (currentIndex > 0) {
    currentIndex -= 1;
    renderTable();
  }
};

const selectPage = (self) => {
  const selectedIndex = parseInt(self.getAttribute("data-pagination")) - 1;
  // console.log("self", selectedIndex);
  currentIndex = selectedIndex;
  renderTable();
};
// const mapEvent = () => {
//   document.querySelectorAll("span.page").forEach((el) => {
//     el.addEventListener("click", () => goToPage(el));
//   });
// };

document.addEventListener("click", function (el) {
  if (el.target.classList.contains("next")) {
    nextPage();
  } else if (el.target.classList.contains("prev")) {
    prevPage();
  } else if (el.target.classList.contains("number")) {
    selectPage(el.target);
  }
});

const filterRow = (e) => {
  filteredUsers = [];
  for (let index = 0; index < userData.length; index++) {
    const user_data = User[index];

    if (
      user_data.albumName
        .toLocaleLowerCase()
        .includes(e.value.toLocaleLowerCase())
    )
      filteredUsers.push(user_data);
  }
  renderTable(filteredUsers);
};

const resetSearch = () => {
  document.querySelector('input[name="search"]').value = "";
};

// Get the modal
let modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
let img = document.getElementById("myImg");
let modalImg = document.getElementById("imgPopUp");
let captionText = document.getElementById("caption");
let imgPop = (data, data2) => {
  modal.style.display = "block";
  modalImg.src = data;
  captionText.innerHTML = "Name Photo : " + data2;
};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
let spanClick = () => {
  modal.style.display = "none";
};

// let preload = () => {
//   document.getElementsByClassName(preloader).innerHTML = `
//   <div class="loading">
//         <img src="./image/loading-buffering.gif">
//         <h3>Sabar gaes dalam proses</h3>
//       </div>
//   `;
// };
const __init = async () => {
  // preload();
  await getDataUsers();
  await getDataAlbum();
  await getDataPhoto();
  await buildData();
  await renderTable();
  await renderPageButton();
  await resetSearch();
};
__init();
