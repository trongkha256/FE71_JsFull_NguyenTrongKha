let employeeList = [];
const createEmployee = function () {
    if (!validation()) {
        return;
    }
    const tk = document.getElementById("tknv").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("datepicker").value;
    const salary = +document.getElementById("luongCB").value;
    const chucvu = document.getElementById("chucvu").value;
    const time = +document.getElementById("gioLam").value;

    const employee = new Employee(tk, name, email, password, dob, salary, chucvu, time);
    employeeList.push(employee);
    renderEmployee();
    saveData();
}
const deleteEmployee = function (acc) {
    if (findAccount(acc) === -1) {
        alert("No Employee with this account!")
        return;
    }
    employeeList.splice(findAccount(acc), 1)
    renderEmployee()
    saveData();
}
const getEmployee = function (acc) {
    const index = findAccount(acc);
    if (index == -1) {
        alert("No Employee with this account!")
        return;
    }
    const foundStudent = employeeList[index]
    document.getElementById('tknv').value = foundStudent.tk;
    document.getElementById('name').value = foundStudent.name;
    document.getElementById('email').value = foundStudent.email;
    document.getElementById('password').value = foundStudent.password;
    document.getElementById('datepicker').value = foundStudent.dob;
    document.getElementById('luongCB').value = foundStudent.luongCB;
    document.getElementById('chucvu').value = foundStudent.chucvu;
    document.getElementById("gioLam").value = foundStudent.giolam;


    // document.getElementById('btnCapNhat').style = "display: inline-block"
    document.getElementById('btnThemNV').style = "display: none"
    document.getElementById('btnCapNhat').style = "display: block"
    document.getElementById('tknv').disabled = true;
}
const updateEmployee = function () {
    if (!validation()) {
        return;
    }
    const tk = document.getElementById("tknv").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("datepicker").value;
    const salary = +document.getElementById("luongCB").value;
    const chucvu = document.getElementById("chucvu").value;
    const time = +document.getElementById("gioLam").value;
    const index = findAccount(tk);
    if (index === -1) {
        alert("No Employee with this account!")
        return;
    }
    const foundEmployee = employeeList[index];
    foundEmployee.name = name;
    foundEmployee.email = email;
    foundEmployee.password = password;
    foundEmployee.dob = dob;
    foundEmployee.luongCB = salary;
    foundEmployee.chucvu = chucvu;
    foundEmployee.giolam = time
    renderEmployee();
    saveData();
}
const findAccount = function (acc) {
    for (let i = 0; i < employeeList.length; i++) {
        if (acc === employeeList[i].tk) {
            return i;
        }

    }
    return -1;
}
const searchEmployee = function () {
    let type = document.getElementById("searchName").value.toLowerCase().trim();
    let result = []
    for (let i = 0; i < employeeList.length; i++) {
        let employeeType = employeeList[i].graduate().toLowerCase();
        if (type === employeeType || employeeType.includes(type)) {
            result.push(employeeList[i]);
        }
    }
    renderEmployee(result)
}
const renderEmployee = function (data) {
    data = data || employeeList;
    var dataHTML = ""
    for (let i = 0; i < data.length; i++) {
        dataHTML = `
            <tr>
                <td>${data[i].tk}</td>
                <td>${data[i].name}</td>
                <td>${data[i].email}</td>
                <td>${data[i].dob}</td>
                <td>${data[i].chucvu}</td>
                <td>${data[i].calSalary()}</td>
                <td>${data[i].graduate()}</td>
                <td><button class="btn btn-danger" onclick="deleteEmployee('${data[i].tk}')">X??a</button>
                <button class="btn btn-danger" data-toggle="modal" data-target="#myModal" onclick="getEmployee('${data[i].tk}')">C???p Nh???t</button></td>
            </tr>
        `
    }
    document.getElementById('tableDanhSach').innerHTML = dataHTML;

}
var saveData = function () {
    var employeeListJson = JSON.stringify(employeeList)
    localStorage.setItem("list", employeeListJson);
}
var getData = function () {
    var employeeListJson = localStorage.getItem("list");
    if (employeeListJson) {
        employeeList = mapData(JSON.parse(employeeListJson));
        renderEmployee();
    }


}
var mapData = function (dataFromLocal) {
    var data = [];
    for (var i = 0; i < dataFromLocal.length; i++) {
        var currentEmployee = dataFromLocal[i];
        var mappedEmployee = new Employee(currentEmployee.tk, currentEmployee.name,
            currentEmployee.email,
            currentEmployee.password,
            currentEmployee.dob, currentEmployee.luongCB,
            currentEmployee.chucvu, currentEmployee.giolam)
        data.push(mappedEmployee);
    }
    return data;
}
getData();



// Validation:
var validation = function () {
    var isTrue = true
    var id = document.getElementById('tknv').value;
    isTrue &= require(id, "tbTKNV") && lengthString(id, "tbTKNV", 4, 6)
    var name = document.getElementById('name').value;
    var textPattern = /^[A-z ]+$/g;
    isTrue &= require(name, "tbTen") && pattern(name, 'tbTen', textPattern)
    var email = document.getElementById('email').value;
    var emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    isTrue &= require(email, "tbEmail") && pattern(email, 'tbEmail', emailPattern)
    var password = document.getElementById('password').value;
    var passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;
    isTrue &= require(password, "tbMatKhau") && lengthString(password, "tbMatKhau", 6, 10) && pattern(password, "tbMatKhau", passwordPattern);
    var date = document.getElementById("datepicker").value;
    isTrue &= require(date, "tbNgay");
    var chucvu = document.getElementById("chucvu").value;
    isTrue &= nameC(chucvu, "tbChucVu");
    var luong = +document.getElementById("luongCB").value;
    isTrue &= require(luong, "tbLuongCB") && number(luong, "tbLuongCB", 1000000, 2000000)
    var time = +document.getElementById("gioLam").value;
    isTrue &= require(time, "tbGiolam") && number(time, "tbGiolam", 80, 200);
    return isTrue
}

const require = function (val, spanID) {
    if (!val) {
        document.getElementById(spanID).innerHTML = `* Tr?????ng h???p n??y b???t bu???c nh???p!`;
        return false
    }
    return true;
}
const lengthString = function (val, spanId, min, max) {
    if (val.length < min || val.length > max) {
        document.getElementById(spanId).innerHTML = `* ????? d??i ph???i t??? ${min} ?????n ${max}`;
        return false
    }
    return true;
}
var pattern = function (val, spanID, regex) {
    if (!regex.test(val)) {
        document.getElementById(spanID).innerHTML = "* Kh??ng ????ng ?????nh d???ng!";
        return false

    }
    document.getElementById(spanID).innerHTML = ""
    return true;
}
var nameC = function (val, spanID) {
    if (val != "S???p" && val != "Tr?????ng ph??ng" && val != "Nh??n vi??n") {
        document.getElementById(spanID).innerHTML = "* Ch???c v??? kh??ng h???p l???!";
        return false
    }
    document.getElementById(spanID).innerHTML = ""
    return true;
}
var number = function (val, spanID, min, max) {
    if (val < min || val > max) {
        document.getElementById(spanId).innerHTML = `*Gi?? tr??? ph???i t??? ${min} ?????n ${max}`;
        return false
    }
    return true;
}