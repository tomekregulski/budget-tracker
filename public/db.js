let db;

const request = indexedDB.open("BudgetDB", 1);

request.onupgradeneeded = function (event) {
  // create object store called "BudgetStore" and set autoIncrement to true
  db = event.target.result;
  db.createObjectStore("BudgetStore", { autoIncrement: true});

};  

request.onerror = function (event) {
  console.log(`Whoops! There was an error: ${event.target.onerror}`);
};

request.onsuccess = function (event) {
  console.log("success event:", event);
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};
