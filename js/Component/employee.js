function Employee(tk, name, email, password, dob, luongCB, chucvu, giolam) {
    this.tk = tk;
    this.name = name;
    this.email = email;
    this.password = password;
    this.dob = dob;
    this.luongCB = luongCB;
    this.chucvu = chucvu;
    this.giolam = giolam;
    this.calSalary = function () {
        if (this.chucvu == "Sếp")
            return this.luongCB * 3;
        else if (this.chucvu == "Trưởng phòng")
            return this.luongCB * 2
        return this.luongCB
    }
    this.graduate = function () {
        if (this.giolam >= 192)
            return "Xuất Sắc"
        else if (this.giolam >= 176)
            return "Giỏi"
        else if (this.giolam >= 160)
            return "Khá"
        return "Trung Bình"
    }
}

