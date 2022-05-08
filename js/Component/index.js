let employeeList = [];
const createEmployee = function () {
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
                <td><button class="btn btn-danger" onclick="deleteEmployee('${data[i].tk}')">Xóa</button>
                <button class="btn btn-danger" data-toggle="modal" data-target="#myModal" onclick="getEmployee('${data[i].tk}')">Cập Nhật</button></td>
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
const require = function (val, spanID) {
    if (val.length === 0) {
        document.getElementById("spanId").innerHTML = `* Trường hợp này bắt buộc nhập`;
        return false
    }
    return true;
}
const lenghString = function (val, spanId, min, max) {
    if (val.length < min || val.length > max) {
        document.getElementById("spanId").innerHTML = `* Độ dài phải từ ${min} đến ${max}`;
        return false
    }
    return true;
}