// Simple unique ID generator
function generateId() {
    return Math.random().toString(36).substring(2, 10);
}
export function getData() {
    const saved = localStorage.getItem("entries");
    if (!saved) return {};

    const entries = JSON.parse(saved);

    return entries;
}


// Save a new entry with a unique ID
export function saveData(dateKey, newEntry) {
    const allEntries = getData();
    const dateEntries = allEntries[dateKey] || [];

    const entryWithId = {
        id: generateId(),
        ...newEntry,
    };

    dateEntries.push(entryWithId);
    allEntries[dateKey] = dateEntries;

    localStorage.setItem("entries", JSON.stringify(allEntries));

    return entryWithId.id; // optional return ID
}

// Delete an entry by its unique ID
export function deleteData(dateKey, id) {
    const allEntries = getData();
    const dateEntries = allEntries[dateKey] || [];

    const updatedList = dateEntries.filter((entry) => entry.id !== id);

    allEntries[dateKey] = updatedList;
    localStorage.setItem("entries", JSON.stringify(allEntries));
}

// Edit an entry by ID
export function editData(dateKey, id, newEntry) {
    const allEntries = getData();
    const dateEntries = allEntries[dateKey] || [];

    const updatedList = dateEntries.map((entry) => {
        if (entry.id === id) {
            return { id, ...newEntry }; // preserve ID
        }
        return entry;
    });

    allEntries[dateKey] = updatedList;
    localStorage.setItem("entries", JSON.stringify(allEntries));
}
