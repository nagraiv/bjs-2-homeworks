"use strict"
function solveEquation(a, b, c) {
  const arr = [];
  const discriminant = b**2 - 4*a*c;
  if (discriminant > 0) {
    arr.push((-b + Math.sqrt(discriminant))/(2*a));
    arr.push((-b - Math.sqrt(discriminant))/(2*a));
  }
  if (discriminant === 0) {
    arr.push((-b)/(2*a));
  }
  return arr;
}

function calculateTotalMortgage(percent, contribution, amount, countMonths) {
  if (isNaN(percent) || isNaN(contribution) || isNaN(amount) || isNaN(countMonths)) {
    return false;
  }
  const rate = parseFloat(percent);
  const downPayment = parseFloat(contribution);
  const loanSum = parseFloat(amount);
  const months = parseInt(countMonths);
  if (rate < 0 || downPayment < 0 || loanSum <= 0 || months <=0) {
    return false;
  }
  const monthPercentage = rate / 1200;
  const body = loanSum - downPayment;
  const monthPay = body * (monthPercentage + (monthPercentage / (Math.pow(1 + monthPercentage, months) - 1)));
  const total = monthPay * months;

  return parseFloat(total.toFixed(2));
}
