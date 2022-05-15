/* Your Code Here */
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  let timeInEvents = [];
  let timeOutEvents = [];
  //   console.log(payPerHour);
  return { firstName: `${firstName}`, familyName: `${familyName}`, title: `${title}`, payPerHour: payPerHour, timeInEvents, timeOutEvents };
}

function createEmployeeRecords(array) {
  let arr = [];
  for (let i = 0; i < array.length; i++) {
    let a = Object.assign({}, array[i]);

    arr.push(createEmployeeRecord(Object.values(a)));
    // console.log(createEmployeeRecord(Object.values(a)))
  }
  return arr;
}

function createTimeInEvent(date) {
  const d = date.substring(0, date.indexOf(" "));
  const h = date.substring(date.indexOf(" ") + 1);
  //   return [{ type: "TimeIn", hour: parseInt(h), date: d }];
  this.timeInEvents.push({ type: "TimeIn", hour: parseInt(h), date: d });
  return this;
}
function createTimeOutEvent(date) {
  // console.log(date)
  const d = date.substring(0, date.indexOf(" "));
  const h = date.substring(date.indexOf(" ") + 1);
  // console.log(d);
  // console.log(h);
  this.timeOutEvents.push({ type: "TimeOut", hour: parseInt(h), date: d });
  return this;
}

function hoursWorkedOnDate(date) {
  //   console.log(date);

  let timeIn = this.timeInEvents.find((element) => {
    if (element.date === date) {
      let a = element["hour"];
      return a;
    }
  });
  let timeOut = this.timeOutEvents.find((element) => {
    if (element.date === date) {
      let a = element["hour"];
      return a;
    }
  });
  //   console.log(timeIn["hour"]);
  //   console.log(timeOut["hour"]);
  let result = (timeOut["hour"] - timeIn["hour"]) / 100;
  //   console.log(result);
  return result;
}

function wagesEarnedOnDate(date) {
  let workHour = hoursWorkedOnDate.call(this, date);
  let payRate = this.payPerHour;

  return workHour * payRate;
}

function findEmployeeByFirstName(collection, firstNameString) {
  return collection.find(function (e) {
    return e.firstName === firstNameString;
  });
}

function calculatePayroll(arr) {
  return arr.reduce(
    function (memo, d) {
      return memo + allWagesFor.call(d);
    }.bind(this),
    0
  );
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
