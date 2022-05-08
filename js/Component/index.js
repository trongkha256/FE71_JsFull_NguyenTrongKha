let employeeList = [];
const renderEmployee = function (data) {
    data = data || employeeList;
    var dataHTML = ""
    for (let i = 0; i < data.length; i++) {
        dataHTML = `
            <tr>
                <th>${data.tk}</th>
                <th>${data.name}</th>
                <th>${data.email}</th>
                <th>${data.dob}</th>
                <th>${data.chucvu}</th>
                <th>${data.calSalary()}</th>
                <th>${data.graduate()}</th>
            </tr>
        `
    }
}