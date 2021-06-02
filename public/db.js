let db;

const request = indexedDB.open("BudgetDB", 1);

request.onerror = function (event) {
  console.log(`Whoops! There was an error: ${event.target.onerror}`);
};

request.onsuccess = function (event) {
  console.log("success event:", event);
  db = event.target.result;
    let oldVersion = event.oldVersion;
    let newVersion = event.newVersion || db.version;
    if (!oldVersion) {
        console.log(`DB currently running on version ${db.version} - no updates at this time`);
    } else {
    console.log(`DB updated from version ${oldVersion} to ${newVersion}`);
    }
  if (navigator.onLine) {
    // checkDatabase();
  }
};

request.onupgradeneeded = function (event) {
  // create object store called "BudgetStore" and set autoIncrement to true
  db = event.target.result;
  if (!db.objectStoreNames.contains('BudgetStore')) {
      db.createObjectStore("BudgetStore", { autoIncrement: true});
  }
};  