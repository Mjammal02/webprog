// src/loaders.jsx

async function safeFetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`${url} returned status ${response.status}`);
    }
    return response.json();
}

async function fetchFoundations() {
    return await safeFetchJson('http://localhost:8080/foundations');
}

async function fetchProteins() {
    return await safeFetchJson('http://localhost:8080/proteins');
}

async function fetchExtras() {
    return await safeFetchJson('http://localhost:8080/extras');
}

async function fetchDressings() {
    return await safeFetchJson('http://localhost:8080/dressings');
}

async function fetchIngredientProperties(type, name) {
    return await safeFetchJson(`http://localhost:8080/${type}/${name}`);
}

async function fetchAllIngredients(type, ingredientList) {
    const ingredientPromises = ingredientList.map(ingredient => fetchIngredientProperties(type, ingredient));
    const ingredients = await Promise.all(ingredientPromises);
    return ingredients.reduce((acc, ingredient, index) => {
        acc[ingredientList[index]] = ingredient; // Build the inventory object
        return acc;
    }, {});
}

export async function inventoryLoader() {
    const inventory = {};

    // Fetch all foundations
    const foundations = await fetchFoundations();
    const foundationData = await fetchAllIngredients('foundations', foundations);
    Object.assign(inventory, foundationData);

    // Fetch all proteins
    const proteins = await fetchProteins();
    const proteinData = await fetchAllIngredients('proteins', proteins);
    Object.assign(inventory, proteinData);

    // Fetch all extras
    const extras = await fetchExtras();
    const extraData = await fetchAllIngredients('extras', extras);
    Object.assign(inventory, extraData);

    // Fetch all dressings
    const dressings = await fetchDressings();
    const dressingData = await fetchAllIngredients('dressings', dressings);
    Object.assign(inventory, dressingData);

    return inventory; // Return the complete inventory
}
