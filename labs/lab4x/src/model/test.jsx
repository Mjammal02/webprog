async function InventoryLoader() {
  
    try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const foundation = await fetchAllIngridient('foundations');
        const extra = await fetchAllIngridient('extras');
        const protein = await fetchAllIngridient('proteins');
        const dressing = await fetchAllIngridient('dressings');
        const inventory = {...foundation,...extra,...protein,...dressing};
/*         console.log(inventory); */
        return inventory;
    } catch (error) {
        throw new Error(error)
    }

    async function fetchAllIngridient(type){
        const response = safeFetchJson(`http://localhost:8080/${type}`);
        const ingridientNames = await response;
       const currentIngridientAllInfo = await Promise.all(ingridientNames.map(nameOfIngridient =>  fetchIngridientInfo(type,nameOfIngridient)))
        return Object.assign({}, ...currentIngridientAllInfo)
    }

    async function fetchIngridientInfo(typeOfIngridient, nameOfIngridient){
        
        const response = safeFetchJson(`http://localhost:8080/${typeOfIngridient}/${nameOfIngridient}`);
        const ingridient = await response;
        return {[nameOfIngridient]: ingridient};
    }

    function safeFetchJson(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${url} returned status ${response.status}`);
                }
                return response.json();
            });
    }

}

export default InventoryLoader;