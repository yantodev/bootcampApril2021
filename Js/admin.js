/**
 * @author eko cahyanto
 * siswa bootcamp G2 Academy
 */

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
}

/**
 * sidebar menu
 */
let header = document.getElementById("header");
let sidebar = document.getElementById("sidebar-menu");
header.innerHTML = `
<span class="logo">
        <a href="/template/backend/admin.html">Admin Dashboard</a>
      </span>
      <span class="website-menu">
        <a href="/template/frontend/index.html"> Logout</a>
      </span>
`
sidebar.innerHTML= `
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

/* ==================================================================================================*/
/**
 * tugas day 34
 * insert data
 */

let pageConfig = {
  showData: 2,
  currentPage: 1,
};
let data = {
  nama: [
    "Eko",
    "Yanto",
    "Yadi",
    "jho",
    "Jhon",
    "Airi Satou",
    "Angelica Ramos",
    "Ashton Cox",
    "Bradley Greer",
    "Brenden Wagner",
    "Bren",
    "Eko",
    "Yanto",
    "Yadi",
    "jho",
    "Jhon",
    "Airi Satou",
    "Angelica Ramos",
    "Ashton Cox",
    "Bradley Greer",
    "Brenden Wagner",
    "Bren",
    "Eko",
    "Yanto",
    "Yadi",
    "jho",
    "Jhon",
    "Airi Satou",
    "Angelica Ramos",
    "Ashton Cox",
    "Bradley Greer",
    "Brenden Wagner",
    "Bren",
  ],
  address: [
    "Jogja",
    "Klaten",
    "Surabaya",
    "Jakarta",
    "Malang",
    "Jogja",
    "Klaten",
    "Surabaya",
    "Jakarta",
    "Malang",
    "Malang",
    "Jogja",
    "Klaten",
    "Surabaya",
    "Jakarta",
    "Malang",
    "Jogja",
    "Klaten",
    "Surabaya",
    "Jakarta",
    "Malang",
    "Malang",
    "Jogja",
    "Klaten",
    "Surabaya",
    "Jakarta",
    "Malang",
    "Jogja",
    "Klaten",
    "Surabaya",
    "Jakarta",
    "Malang",
    "Malang",
  ],
  status: [
    "Active",
    "Suspend",
    "Active",
    "Active",
    "Active",
    "Active",
    "Suspend",
    "Active",
    "Active",
    "Active",
    "Active",
    "Active",
    "Suspend",
    "Active",
    "Active",
    "Active",
    "Active",
    "Suspend",
    "Active",
    "Active",
    "Active",
    "Active",
    "Active",
    "Suspend",
    "Active",
    "Active",
    "Active",
    "Active",
    "Suspend",
    "Active",
    "Active",
    "Active",
    "Active",
  ],
};

const generateTable = () => {
  var j = 1;
  for (let i = 0; i < data.nama.length; i++) {
    let td = document.querySelector("#table_crud > table > tbody");
    td.innerHTML += `
    <td>${j++}</td>
    <td>${data.nama[i]}</td>
    <td>${data.address[i]}</td>
    <td>${data.status[i]}</td>
    <td>
    <a href="#" class="badge badge-sm badge-info" onClick="onedit(this)">Edit</a>
  <a href="#" class="badge badge-sm badge-danger" onClick="ondelete(this)">Delete</a>
    </td>
  `;
  }
  generatePagination(data.nama);
};
function addRow() {
  var table = document.getElementsByTagName("table")[0];
  var newRow = table.insertRow(table.rows.length);

  newRow.setAttribute("id", "row1");

  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);

  // var nomerBaru = cell1.innerHTML = nomer+1;
  // nomer = nomerBaru;
  cell2.innerHTML = `<input type="text" id="namaBaru">`;
  cell3.innerHTML = `<input type="text" id="alamatBaru">`;
  cell4.innerHTML = `<input type="text" id="statusBaru">`;
  cell5.innerHTML = ` <button class="badge badge-primary mb-3" onclick="saveRow();">SAVE</button>`;
}

function saveRow() {
  var nama = $("#namaBaru").val();
  var alamat = $("#alamatBaru").val();
  var status = $("#statusBaru").val();

  if (
    nama === "" ||
    (alamat === "" && nama === undefined) ||
    alamat === undefined
  ) {
    // alert("masukkan nama dan alamat!!!");
    swal("Wrong Input!", "Please Fill the Inputs", "warning");
  } else {
    data.nama.push(nama);
    data.address.push(alamat);
    data.status.push(status);

    var banyak = data.nama.length;
    var nama2 = data.nama[data.nama.length - 1];
    var alamat2 = data.address[data.address.length - 1];
    var status2 = data.status[data.status.length - 1];
    console.log(nama2);
    var td = document.querySelector("#table_data > table > tbody");
    td.innerHTML += `
    <td>${banyak++}</td>
    <td>${nama2}</td>
    <td>${alamat2}</td>
    <td>${status2}</td>
    <td>
    <a href=""><span class="badge badge-primary">Edit</span></a>
    <a href=""><span class="badge badge-danger">Delete</span></a>
    </td>
  `;

    $("#row1").remove();
    swal("Added", "Success!", "success");
  }
}

function reset() {
  $("#row1").remove();
}

/* ==================================================================================================*/
/**
 * latihan crud
 */
var selectedRow = null;
function validateMyForm() {
  event.preventDefault();

  var formData = {};
  formData["name"] = document.getElementById("name").value;
  formData["age"] = document.getElementById("age").value;
  if (selectedRow == null) insertData(formData);
  else onupdate(formData);
  reset();
}

function insertData(formData) {
  var tableData = document
    .getElementById("mytable")
    .getElementsByTagName("tbody")[0];
  let newRow = tableData.insertRow(tableData.length);
  var cell1 = newRow.insertCell(0);
  cell1.innerHTML = formData.name;
  var cell2 = newRow.insertCell(1);
  cell2.innerHTML = formData.age;
  var cell3 = newRow.insertCell(2);
  cell3.innerHTML = `
  <a href="#" class="btn btn-sm btn-info" onClick="onedit(this)">Edit</a>
  <a href="#" class="btn btn-sm btn-danger" onClick="ondelete(this)">Delete</a>
  `;
}
function reset() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  selectedRow = null;
}
function onedit(td) {
  selectedRow = td.parentElement.parentElement;
  document.getElementById("name").value = selectedRow.cells[0].innerHTML;
  document.getElementById("age").value = selectedRow.cells[1].innerHTML;
}
function onupdate(formData) {
  selectedRow.cells[0].innerHTML = formData.name;
  selectedRow.cells[1].innerHTML = formData.age;
}
function ondelete(td) {
  var row = td.parentElement.parentElement;
  document.getElementById("mytable").deleteRow(row.rowIndex);
  reset();
}

const generatePagination = (data) => {
  const pagination = document.querySelector("div.pagination");

  let buttonPage = "";
  let totalPage = Math.ceil(data.nam.length / pageConfig.showData);

  if (pageConfig.currentPage != 1)
    buttonPage += `<span class="page prev">Prev</span>`;

  for (let page = 1; page <= totalPage; page++) {
    let className = "page";
    if (pageConfig.currentPage == page) className = "page active";

    buttonPage += `<span class="${className}">${page}</span>`;
  }

  if (pageConfig.currentPage != totalPage)
    buttonPage += `<span class="page next">Next</span>`;

  pagination.innerHTML = buttonPage;
  mapEvent();
};

const goToPage = (e) => {
  const search = document.querySelector('input[name="search"]');

  if (e.classList.contains("prev")) pageConfig.currentPage--;
  else if (e.classList.contains("next")) pageConfig.currentPage++;
  else pageConfig.currentPage = e.innerText;

  if (search.value != "") generateTable(filteredUsers);
  else generateTable();
};

const mapEvent = () => {
  document.querySelectorAll("span.page").forEach((el) => {
    el.addEventListener("click", () => goToPage(el));
  });
};

const filterRow = (e) => {
  filteredUsers = [];
  for (let index = 0; index < data.name.length; index++) {
    const user = data.name[index];

    if (user.name.toLocaleLowerCase().includes(e.value.toLocaleLowerCase()))
      filteredUsers.push(user);
  }
  generateTable(filteredUsers);
};

/* ==================================================================================================*/
/**
 * tugas day 35
 * search data by row name
 * pagging table
 */
// function myFunction() {
//   var input, filter, table, tr, td, i, txtValue;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   table = document.getElementById("myTable");
//   tr = table.getElementsByTagName("tr");
//   for (i = 0; i < tr.length; i++) {
//     td = tr[i].getElementsByTagName("td")[1]; //get by name
//     // td = tr[i].getElementsByTagName("td")[2]; //get by address
//     // td = tr[i].getElementsByTagName("td")[3]; //get by
//     if (td) {
//       txtValue = td.textContent || td.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     }
//   }
// }

// //jQuery
// // $(document).ready(function () {
// //   $("#myTable").DataTable();
// // });

// //pagging
// var current_page = 1;
// var records_per_page = 4;

// function prevPage() {
//   if (current_page > 1) {
//     current_page--;
//     changePage(current_page);
//   }
// }

// function nextPage() {
//   if (current_page < numPages()) {
//     current_page++;
//     changePage(current_page);
//   }
// }

// //function change page
// function changePage(page) {
//   var btn_next = document.getElementById("btn_next");
//   var btn_prev = document.getElementById("btn_prev");
//   var src = document.getElementById("search");
//   // var listing_table = document.getElementsByTagName("listingTable");
//   var listing_table = document.querySelector("#table_data > table > tbody");
//   var page_span = document.getElementById("page");

//   // Validate page
//   if (page < 1) page = 1;
//   if (page > numPages()) page = numPages();

//   //clear data
//   listing_table.innerHTML = "";

//   //looping data
//   var j = 1;
//   for (
//     var i = (page - 1) * records_per_page;
//     i < page * records_per_page;
//     i++
//   ) {
//     // listing_table.innerHTML += "<td>" + data.nama[i] + "</td>";
//     // listing_table.innerHTML += "<td>" + data.address[i] + "</td>";
//     // listing_table.innerHTML += "<td>" + data.status[i] + "</td>";
//     // var td = document.querySelector("#table_data > table > tbody");

//     listing_table.innerHTML += `
//     <td>${j++}</td>
//     <td>${data.nama[i]}</td>
//     <td>${data.address[i]}</td>
//     <td>${data.status[i]}</td>
//     <td>
//     <a href=""><span class="badge badge-primary">Edit</span></a>
//     <a href=""><span class="badge badge-danger">Delete</span></a>
//     </td>
//   `;
//   }
//   page_span.innerHTML = page;

//   if (page == 1) {
//     btn_prev.style.visibility = "hidden";
//   } else {
//     btn_prev.style.visibility = "visible";
//   }

//   if (page == numPages()) {
//     btn_next.style.visibility = "hidden";
//   } else {
//     btn_next.style.visibility = "visible";
//   }
// }

// function numPages() {
//   return Math.ceil(data.nama.length / records_per_page);
// }

// window.onload = function () {
//   changePage(1);
// };

// const __init = () => {
//   generateTable();
//   mapEvent();
// };
// __init();
