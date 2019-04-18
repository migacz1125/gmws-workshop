(function(){
    /**
     * sort array of names and resturt to main stream.
     */
    self.addEventListener('message', (event) => {
        let result = [...event.data].sort();
        postMessage(result)
    });
})();