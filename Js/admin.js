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

var data = {
  nama: ["Eko", "Yanto", "Yadi"],
  address: ["Jogja", "Klaten", "Surabaya"],
  status: ["Active", "Suspend", "Active"],
};
var j = 1;
for (let i = 0; i < data.nama.length; i++) {
  var td = document.querySelector("#table_data > table > tbody");
  td.innerHTML += `
    <td>${j++}</td>
    <td>${data.nama[i]}</td>
    <td>${data.address[i]}</td>
    <td>${data.status[i]}</td>
    <td>
    <a href=""><span class="badge badge-primary">Edit</span></a>
    <a href=""><span class="badge badge-danger">Delete</span></a>
    </td>
  `;
}

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
