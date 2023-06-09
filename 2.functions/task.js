function getArrayParams(...arr) {
  if (!arr.length) {
    return { min: null, max: null, avg: null };
  }
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const arrSum = arr.reduce( (accumulator, item) => accumulator + item);
  const avg = +((arrSum / arr.length).toFixed(2));
  return { min: min, max: max, avg: avg };
}

function summElementsWorker(...arr) {
  return !arr.length ? 0 : arr.reduce( (accumulator, item) => accumulator + item);
}

function differenceMaxMinWorker(...arr) {
  return !arr.length ? 0 : Math.max(...arr) - Math.min(...arr);
}

function differenceEvenOddWorker(...arr) {
  if (!arr.length) {
    return 0;
  }
  // создаём новые массивы из чётных и нечётных чисел
  const evenArr = arr.filter(item => (typeof item === "number") && !(item%2));
  const oddArr = arr.filter(item => (typeof item === "number") && item%2);
  // считаем сумму элементов массива, при пустом массиве в результат попадёт параметр initial, т.е. 0
  const sumEvenArr = evenArr.reduce( (accumulator, item) => accumulator + item, 0);
  const sumOddArr = oddArr.reduce( (accumulator, item) => accumulator + item, 0);
  return sumEvenArr - sumOddArr;
}

function averageEvenElementsWorker(...arr) {
  if (!arr.length) {
    return 0;
  }
  const evenArr = arr.filter(item => (typeof item === "number") && !(item%2));
  const sumEvenArr = evenArr.reduce( (accumulator, item) => accumulator + item, 0);
  return !evenArr.length ? 0 : sumEvenArr / evenArr.length;
}

function makeWork (arrOfArr, func) {
  // проверка, что полученные аргументы являются массивом и функцией
  if (!Array.isArray(arrOfArr) || !(typeof func === "function")) {
    return null;
  }
  const arrOfResults = arrOfArr
      // сначала фильтруем от элементов, которые НЕ массивы, иначе попытка их распаковки вызовет ошибку
      .filter( (item) => Array.isArray(item))
      // затем к каждому элементу применяем функцию-насадку и получаем массив результатов
      .map( (item) => func(...item));
  return Math.max(...arrOfResults);
}
