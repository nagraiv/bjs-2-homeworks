
class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100;
        this.type = null;
    }

    set state(score) {
        if (score < 0) {
            this._state = 0;
        } else if (score > 100) {
            this._state = 100;
        } else {
            this._state = score;
        }
    }

    get state() {
        return this._state;
    }

    fix() {
        this.state *= 1.5;
    }
}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "magazine";
    }
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "book";
        this.author = author;
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "novel";
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "fantastic";
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "detective";
    }
}

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        if (book instanceof PrintEditionItem && book.state > 30) {
            this.books.push(book);
            console.log('Книга добавлена в библиотеку: ', book.name);
        } else {
            console.log('Книга не включена в библиотеку: ', book.name);
        }
    }

    findBookBy(type, value) {
        const book = this.books.find((item) => item[type] == value);
        return book ? book : null;
    }

    giveBookByName(bookName) {
        const index = this.books.findIndex((item) => item.name === bookName);
        if (index === -1) {
            return null;
        } else {
            return this.books.splice(index, 1)[0];
        }
    }
}

const schoolLibrary = new Library('школьная');
schoolLibrary.addBook(new Magazine('Мурзилка', 1985, 24));
schoolLibrary.addBook(new Magazine('Наука и жизнь, 09', 2015, 124));

schoolLibrary.addBook(new Book('Пушкин А.С.','Избранные стихи', 1919, 302));
schoolLibrary.addBook(new NovelBook('Маргарет Митчелл','Унесённые ветром', 1956, 746));
schoolLibrary.addBook(new FantasticBook('Джоан Роулинг','Гарри Поттер и узник Азкабана', 2003, 582));
schoolLibrary.addBook(new DetectiveBook('Агата Кристи','Десять негритят', 1979, 486));

console.log(schoolLibrary.findBookBy('releaseDate', 1919));

console.log("Количество книг до выдачи: " + schoolLibrary.books.length);
const bookOut = schoolLibrary.giveBookByName('Десять негритят');
console.log("Количество книг после выдачи: " + schoolLibrary.books.length);

bookOut.state = 10;
bookOut.fix();
schoolLibrary.addBook(bookOut);
console.log(schoolLibrary);


class Student {
    constructor(name) {
        this.name = name;
        this.marks = {};
    }

    addMark(mark, subject) {
    // странное условие задачи, могут быть дробные оценки??? проще проверять на равенство числам 2, 3, 4, 5
        if (mark < 2 || mark > 5) {
            return null;
        }
        if (!(this.marks.hasOwnProperty(subject))) {
            this.marks[subject] = [];
        }
        this.marks[subject].push(mark);
    }

    getAverageBySubject(subject) {
        return this.marks.hasOwnProperty(subject) && this.marks[subject].length ?
            this.marks[subject].reduce((acc, el, ind, array) => {
                return ind === array.length - 1 ? (acc + el) / array.length : acc + el;
            }, 0) : 0;
    }

    getAverage() {
        return Array
            // получаем массив средних значений по каждому предмету
            .from(Object.keys(this.marks), key => this.getAverageBySubject(key))
            // находим среднее арифметическое от полученного массива
            .reduce((acc, el, ind, array) => {
                return ind === array.length - 1 ? (acc + el) / array.length : acc + el;
            }, 0);
    }
}

const student = new Student("Олег Никифоров");
student.addMark(5, "химия");
student.addMark(5, "химия");
student.addMark(5, "физика");
student.addMark(4, "физика");
student.addMark(6, "физика");
student.addMark(3, "философия");

console.log('Средний бал по предмету "физика": ', student.getAverageBySubject("физика"));
console.log('Средний бал по предмету "химия": ', student.getAverageBySubject("химия"));
console.log('Средний бал по предмету "экономика": ', student.getAverageBySubject("экономика"));
console.log('Средний бал по всем предметам: ', student.getAverage());
