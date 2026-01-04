import { openDB } from "idb";

const DB_NAME = "inventoryDB";
const DB_VERSION = 1;
const STORE_NAME = "items";

// open db if exists or unless creates one
const dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, {
                keyPath: "id", // unique id for each item
            });
        }
    },
});

export async function addItem(item) {
    const db = await dbPromise;
    await db.put(STORE_NAME, item);
}


export async function getAllItems() {
    const db = await dbPromise;
    return await db.getAll(STORE_NAME);
}


export async function getItemById(id) {
    const db = await dbPromise;
    return await db.get(STORE_NAME, id);
}


export async function updateItem(updatedItem) {
    const db = await dbPromise;
    await db.put(STORE_NAME, updatedItem);
}


export async function deleteItem(id) {
    const db = await dbPromise;
    await db.delete(STORE_NAME, id);
}


export async function clearInventory() {
    const db = await dbPromise;
    await db.clear(STORE_NAME);
}