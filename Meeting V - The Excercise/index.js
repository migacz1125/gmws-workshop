(function(){
    const namesData = ["Carlos", "Xenos", "Bert", "Dieter", "Victor", "Steven", "Lucas", "Fletcher", "Rashad", "Edan", "Tate", "Emery", "Jasper", "Brian", "Dominic", "Henry", "Upton", "Bevis", "Tucker", "Brennan", "Derek", "Barrett", "Allen", "Raja", "Francis", "Zane", "Vernon", "Andrew", "Hu", "Davis", "Quamar", "Vance", "Armando", "Chaney", "Grady", "Kenyon", "Derek", "Seth", "Burton", "Neil", "Forrest", "Devin", "Samson", "Conan", "Rudyard", "Dustin", "Amir", "Russell", "Rogan", "Ali", "Linus", "Isaiah", "Xavier", "Xavier", "Benjamin", "Giacomo", "Levi", "Chadwick", "Macaulay", "Daquan", "John", "Armando", "Ferdinand", "Bevis", "Cruz", "Thaddeus", "Yuli", "Marshall", "Gray", "Aaron", "Emerson", "Finn", "Vincent", "Chadwick", "Abbot", "Laith", "Lucas", "Nathan", "Demetrius", "Demetrius", "Merrill", "Barrett", "Warren", "Chester", "Seth", "Stone", "Galvin", "Lars", "Moses", "Cyrus", "Lucius", "Kenneth", "Kermit", "Hashim", "Xenos", "Akeem", "Jason", "Nigel", "Joel", "Damian"]
    let db = null;

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            console.log('web loaded !');
            navigator.serviceWorker.register('/sw.js');
        })
    }

    if (window.Worker) {
        const myWorker = new Worker('./ww.js');

        myWorker.addEventListener('message', (event) => {
            saveSortedArrayInIndexedDB(event.data)
        });

        myWorker.postMessage(namesData);

    } else {
        console.error('web workers are not supported in your browser');
    }

    this.saveSortedArrayInIndexedDB = (namesArray) => {
        let request = indexedDB.open('Main_Database', 1);
        
        request.addEventListener('upgradeneeded', (e) => {
            db = e.target.result;

            if (!db.objectStoreNames.contains('store')) {
                db.createObjectStore('store');
            }
        });

        request.addEventListener('success', (e) => {
            console.log('Request to open database successful!');
            db = e.target.result;

            addArrayToStore(namesArray);
        });

        request.addEventListener('error', (e) => {
            console.log('Error: ' + e.target.error);
        });
    }

    this.addArrayToStore = (value) => {
        const transaction = db.transaction(['store'], 'readwrite');
        const objectStore = transaction.objectStore('store', {keyPath: 'name'});
        
        objectStore.add(value, 'name');

        transaction.addEventListener('error', (e) => {
            console.log('Error: ' + e.target.error.name);
        });

        transaction.addEventListener('complete', (e) => {
            console.log('Woot! Did it!');
        });
    }
    // Write your code here
})();