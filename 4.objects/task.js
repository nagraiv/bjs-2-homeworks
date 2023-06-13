function Student(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.marks = [];
}

Student.prototype.setSubject = function (subjectName) {
    this.subject = subjectName;
}

Student.prototype.addMarks = function (...marksToAdd) {
    if (this.hasOwnProperty('marks')) {
        this.marks.push(...marksToAdd);
    }
}

Student.prototype.getAverage = function () {
    return this.hasOwnProperty('marks') && this.marks.length ?
        this.marks.reduce((acc, el, ind, array) => {
            return ind === array.length - 1 ? (acc + el) / array.length : acc + el;
        }, 0) : 0;
}

Student.prototype.exclude = function (reason) {
    delete this.marks;
    delete this.subject;
    this.excluded = reason;
}
