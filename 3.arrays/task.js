function compareArrays(arr1, arr2) {
  if (!(arr1 instanceof Array) || !(arr2 instanceof Array) || arr1.length !== arr2.length) {
      return false;
  }
  return arr1.every((current, index) => current === arr2[index]);
}

function getUsersNamesInAgeRange(users, gender) {
    if (!(users instanceof Array) || users.length === 0) {
        return 0;
    }
    return users.filter(item => item.gender === gender)
        .map(item => item.age)
        .reduce((accumulator, item, index, array) => {
            return index === array.length - 1 ? (accumulator + item) / array.length : accumulator + item;
        }, 0);
}
