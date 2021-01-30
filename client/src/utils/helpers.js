// here is the code for the idb storage stuff, that we will need to edit for our project in the future.

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to the database `author-hub` with the version of 1
    const request = window.indexedDB.open("author-hub", 1);
    // create variables to hold reference to the database, transaction (tx), and object store
    let db, tx, store;
    // if version has changed (or if this is the first time using the database), run this method and create the five object stores
    request.onupgradeneeded = function (e) {
      const db = request.result;
      // create object store for each type of data and set "primary" key index to be the `_id` of the data
      // may need to change the keyPath depending on the object
      db.createObjectStore("current-project", { keyPath: "_id" });
      db.createObjectStore("project-chapters", { keyPath: "_id" });
      db.createObjectStore("current-chapter", { keyPath: "_id" });
      db.createObjectStore("projects", { keyPath: "_id" });
      db.createObjectStore("collaborations", { keyPath: "_id" });
    };
    request.onerror = function (e) {
      console.log("There was an error");
    };
    // upon a successful
    request.onsuccess = function (e) {
      // save reference to `db` variable
      db = request.result;
      // open a transaction do whatever we pass into `storeName` (must match one of the object store names)
      tx = db.transaction(storeName, "readwrite");
      // save a reference to that object store
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log("error", e);
      };
      switch (method) {
        case "put":
          store.put(object);
          resolve(object);
          break;
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case "find":
          const foundItem = store.get(object._id);
          foundItem.onsuccess = function () {
            resolve(foundItem.result);
          };
          break;
        case "clear":
          store.clear();
          break;
        case "delete":
          store.delete(object._id);
          break;
        default:
          console.log("No valid method");
          break;
      }
      // close connection when transaction is complete
      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
