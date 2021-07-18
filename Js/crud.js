function tampilkanwaktu() {
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

let limit = 5; //row view
let currentIndex = 0;
let maxButtonPage = 5; //maks button view
let updateStatus = false; //ceck input

//get data from JSON Placeholder
// const getData = async () => {
//   await fetch("https://jsonplaceholder.typicode.com/posts")
//     .then((response) => response.json())
//     .then((json) => (allTodos = json));
// };

let master = [
  {
    id: 1,
    name: "Axel Pearson",
    email: "velit@maurissapien.co.uk",
    address: "Qutubullapur",
  },
  {
    id: 2,
    name: "Uriah Mccoy",
    email: "tincidunt.nunc.ac@feugiat.co.uk",
    address: "Oudegem",
  },
  {
    id: 3,
    name: "Rajah Roach",
    email: "sem@sagittissemperNam.co.uk",
    address: "Heinsch",
  },
  {
    id: 4,
    name: "Emery Cooper",
    email: "faucibus@Duisrisusodio.org",
    address: "North Bay",
  },
  {
    id: 5,
    name: "Stone Galloway",
    email: "faucibus.ut.nulla@Curabiturmassa.co.uk",
    address: "Jundiaí",
  },
  {
    id: 6,
    name: "Macon Williams",
    email: "Aenean@facilisis.co.uk",
    address: "Mariakerke",
  },
  {
    id: 7,
    name: "Marshall Parrish",
    email: "odio.Phasellus@Fuscealiquet.edu",
    address: "Jhansi",
  },
  {
    id: 8,
    name: "Talon Fuller",
    email: "enim.Etiam@faucibusorci.ca",
    address: "Dieppe",
  },
  {
    id: 9,
    name: "Isaac Clemons",
    email: "Integer.in.magna@malesuadavel.ca",
    address: "Bordeaux",
  },
  {
    id: 10,
    name: "Thaddeus Kim",
    email: "Suspendisse.aliquet@cursusIntegermollis.ca",
    address: "Coleville Lake",
  },
  {
    id: 11,
    name: "Benjamin Forbes",
    email: "Nam.nulla.magna@quistristiqueac.org",
    address: "Vellore",
  },
  {
    id: 12,
    name: "Drake Tillman",
    email: "mi@Quisquetinciduntpede.com",
    address: "Noville",
  },
  {
    id: 13,
    name: "Dustin Gilliam",
    email: "ullamcorper.Duis@ametmassa.org",
    address: "Ururi",
  },
  {
    id: 14,
    name: "Cain Bean",
    email: "adipiscing@lacusvestibulumlorem.net",
    address: "Roosendaal",
  },
  {
    id: 15,
    name: "Justin Walker",
    email: "ultrices@turpisegestasAliquam.org",
    address: "Valda",
  },
  {
    id: 16,
    name: "Phelan Schultz",
    email: "eu.tellus.Phasellus@nislMaecenas.edu",
    address: "Dumai",
  },
  {
    id: 17,
    name: "Kermit Morse",
    email: "risus.Donec@Duis.org",
    address: "Kaneohe",
  },
  {
    id: 18,
    name: "Hoyt Carrillo",
    email: "tristique.pharetra.Quisque@tristique.com",
    address: "Puerto Asís",
  },
  {
    id: 19,
    name: "Hamilton Roth",
    email: "mollis@mollisvitaeposuere.net",
    address: "Temse",
  },
  {
    id: 20,
    name: "Noah Owen",
    email: "magna@quisaccumsanconvallis.ca",
    address: "Fusagasugá",
  },
  {
    id: 21,
    name: "Mason Holloway",
    email: "sit.amet.orci@CuraePhasellus.net",
    address: "Giove",
  },
  {
    id: 22,
    name: "Harrison Holt",
    email: "et.nunc.Quisque@a.edu",
    address: "Appelterre-Eichem",
  },
  {
    id: 23,
    name: "Geoffrey Williams",
    email: "ornare.lectus@ligulaelit.org",
    address: "Murdochville",
  },
  {
    id: 24,
    name: "Travis Pace",
    email: "Aenean.eget.metus@amet.co.uk",
    address: "Roshal",
  },
  {
    id: 25,
    name: "Brady Dixon",
    email: "nisl@purusin.com",
    address: "Hengelo",
  },
  {
    id: 26,
    name: "Abbot Benson",
    email: "rutrum.justo.Praesent@est.ca",
    address: "Fort Worth",
  },
  {
    id: 27,
    name: "Kyle Cooke",
    email: "dolor.Donec.fringilla@tempusnon.ca",
    address: "Sant'Omero",
  },
  {
    id: 28,
    name: "Robert Neal",
    email: "aliquam.eros@Maurismolestiepharetra.edu",
    address: "Verdun",
  },
  {
    id: 29,
    name: "Tucker Wilkins",
    email: "vitae@interdum.ca",
    address: "Tay",
  },
  {
    id: 30,
    name: "Hoyt Small",
    email: "eu.turpis@malesuada.edu",
    address: "Ribeirão Preto",
  },
];

//view tabel
const renderTable = () => {
  const datas = master.slice(currentIndex * limit, (currentIndex + 1) * limit);
  const table = document.querySelector("tbody");

  tr = "";
  datas.forEach((data, idx) => {
    tr += `
            <tr>
                <td class="cell-no">${data.id}</td>
                <td class="cell-no">${data.name}</td>
                <td name="title" class="cell-title">${data.email}</td>
                <td name="body" class="cell-title">${data.address}</td>
                <td>
                <a href="#" class="btn btn-sm btn-info" onClick="onedit(this)">Edit</a>
                <a href="#" class="btn btn-sm btn-danger" onClick="return confirm('Yakin ingin menghapus?'),ondelete(this);">Delete</a>
                </td>
            </tr>
        `;
  });

  table.innerHTML = tr;
  renderPageButton();
};

/**
 * pagination data
 */
const renderPageButton = () => {
  const pagination = document.querySelector(".pagination");
  let pageStart = 1;
  let pageEnd = maxButtonPage;
  const pageTotal = master.length / limit;
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

  if (master.length / limit > currentIndex + 1) {
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

document.addEventListener("click", function (el) {
  if (el.target.classList.contains("next")) {
    nextPage();
  } else if (el.target.classList.contains("prev")) {
    prevPage();
  } else if (el.target.classList.contains("number")) {
    selectPage(el.target);
  }
});

//add row for input data
const addRow = () => {
  const tbody = document.querySelector("table > tbody");
  const input = document.querySelector("input");

  if (updateStatus) return alert("isi dulu input nya!!");

  const newRow = `
          <tr>
          <td align="center">
            <input type="text" id="newid" />
          </td>
          <td>
              <input type="text" id="newname" />
          </td>
          <td>
          <input type="text" id="newemail" />
          </td>
          <td>
          <input type="text" id="newaddress" />
          </td>
          <td>
          <button class="badge badge-primary mb-3" onclick="saveRow();">SAVE</button>
          </td>
          </tr>
      `;
  tbody.innerHTML = newRow + tbody.innerHTML;
  updateStatus = true;
};

// function edit data
let onedit = (td) => {
  selectedRow = td.parentElement.parentElement;
  const todos = master.slice(currentIndex * limit, (currentIndex + 1) * limit);
  const table = document.querySelector("tbody");
  const no = selectedRow.cells[0].innerHTML;
  const valName = selectedRow.cells[1].innerHTML;
  const valEmail = selectedRow.cells[2].innerHTML;
  const valAddress = selectedRow.cells[3].innerHTML;
  tr = "";
  // todos.forEach((todo, idx) => {
  tr += `
  
            <tr>
            <form onsubmit="return validateMyForm()" autocomplete="off">
                <td>${no}</td>
                <td>
                <input type="text" value="${valName}">
                 </td>
                <td>
                <input type="text" value="${valEmail}">
                </td>
                <td>
                <input type="text" value="${valAddress}">
                </td>
                <td>
                <button type="submit" onClick="return validateMyForm()" class="btn btn-primary btn-sm">SAVE</button>
                </td>
                </form>
            </tr>
        `;
  // });

  table.innerHTML = tr;
  renderPageButton();
};

var selectedRow = null;
let validateMyForm = () => {
  event.preventDefault();

  var formData = {};
  formData["title"] = document.querySelector('input[name="title"]').value;
  formData["body"] = document.querySelector('textarea[name="body"]').value;
  if (selectedRow == null) insertData(formData);
  else onupdate(formData);
  // reset();
  console.log(formData);
};

function saveRow() {
  let newid = $("#newid").val();
  var newname = $("#newname").val();
  var newemail = $("#newemail").val();
  var newaddress = $("#newaddress").val();

  if (
    newname === "" ||
    (newaddress === "" && newname === undefined) ||
    newaddress === undefined
  ) {
    // alert("masukkan nama dan alamat!!!");
    swal("Wrong Input!", "Please Fill the Inputs", "warning");
  } else {
    master.push({
      id: newid,
      name: newname,
      email: newemail,
      address: newaddress,
    });
    // console.log(newname);
    // console.log(newemail);
    // console.log(newaddress);
    // master.push(newname);
    // master.push(newemail);
    // master.push(newaddress);
    // console.log(d);

    var banyak = master.length;
    var nama2 = master[master.length - 1];
    var email2 = master[master.length - 1];
    var address2 = master[master.length - 1];
    console.log(nama2);
    var td = document.querySelector("table > tbody");
    td.innerHTML += `
      <td>${banyak++}</td>
      <td>${nama2}</td>
      <td>${email2}</td>
      <td>${address2}</td>
      <td>
      <a href="#" class="btn btn-sm btn-info" onClick="onedit(this)">Edit</a>
      <a href="#" class="btn btn-sm btn-danger" onClick="return confirm('Yakin ingin menghapus?'),ondelete(this);">Delete</a>
      </td>
    `;

    $("#row1").remove();
    swal("Added", "Success!", "success");
    renderTable();
  }
}

function reset() {
  $("#row1").remove();
}

let insertData = (formData) => {
  var tableData = document
    .getElementById("mytable")
    .getElementsByTagName("tbody")[0];
  let newRow = tableData.insertRow(tableData.length);
  var cell1 = newRow.insertCell(0);
  cell1.innerHTML = formData.nama;
  var cell2 = newRow.insertCell(1);
  cell2.innerHTML = formData.body;
  var cell3 = newRow.insertCell(2);
  cell3.innerHTML = `
  <a href="#" class="btn btn-sm btn-info" onClick="onedit(this)">Edit</a>
  <a href="#" class="btn btn-sm btn-danger" onClick="ondelete(this)">Delete</a>
  `;
};
let onupdate = (formData) => {
  selectedRow.cells[1].innerHTML = formData.title;
  selectedRow.cells[2].innerHTML = formData.body;
};
let ondelete = (td) => {
  const row = td.parentElement.parentElement;
  document.getElementById("mytable").deleteRow(row.rowIndex);
  reset();
};

const __init = async () => {
  renderTable();
  renderPageButton();
};
__init();
