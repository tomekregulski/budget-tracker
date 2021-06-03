let db;

const request = indexedDB.open("BudgetDB", 1);

request.onupgradeneeded = function (event) {
  // create object store called "BudgetStore" and set autoIncrement to true
  db = event.target.result;
  if (!db.objectStoreNames.contains('BudgetStore')) {
      db.createObjectStore("BudgetStore", { autoIncrement: true});
  }
};  

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

function saveRecord(record) {
    console.log('saving the record now...');
    console.log(record);
    const transaction = db.transaction(['BudgetStore'], 'readwrite');
    const offLineStore = transaction.objectStore('BudgetStore');
    offLineStore.add(record);
}

function checkDatabase() {
  console.log('checking the db now...');
  let transaction = db.transaction(['BudgetStore'], 'readwrite');
  const store = transaction.objectStore('BudgetStore');
  const getAll = store.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.length !== 0) {
            transaction = db.transaction(['BudgetStore'], 'readwrite');
            const updatedStore = transaction.objectStore('BudgetStore');
            updatedStore.clear();
            console.log('clearing the store...');
          }
        });
    }
  };
}

window.addEventListener('online', checkDatabase);