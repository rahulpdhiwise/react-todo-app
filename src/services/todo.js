import update from 'immutability-helper';

/**
 * Get the list of todo items.
 * @return {Array}
 */
export function getAll() {
    return [
        {
            id: 1,
            text: 'Learn Javascript',
            completed: false,
            rating: 0
        },
        {
            id: 2,
            text: 'Learn React',
            completed: false,
            rating: 0
        },
        {
            id: 3,
            text: 'Build a React App',
            completed: false,
            rating: 0
        }
    ];
}

/**
 * Updates the status of a todo item.
 * @param {Array} items - The list of todo items.
 * @param {Number} itemId - The ID of the todo item to update.
 * @param {Boolean} completed - The new completed status.
 * @return {Array} The updated list of todo items.
 */
export function updateStatus(items, itemId, completed) {
    let index = items.findIndex(item => item.id === itemId);

    // Returns a new list of data with updated item.
    return update(items, {
        [index]: {
            completed: {$set: completed}
        }
    });
}

/**
 * Updates the rating of a todo item.
 * @param {Array} items - The list of todo items.
 * @param {Number} itemId - The ID of the todo item to update.
 * @param {Number} rating - The new rating value (0-5).
 * @return {Array} The updated list of todo items.
 */
export function updateRating(items, itemId, rating) {
    let index = items.findIndex(item => item.id === itemId);

    // Returns a new list of data with updated item.
    return update(items, {
        [index]: {
            rating: {$set: rating}
        }
    });
}

/**
 * Adds a new todo item to the list.
 * @param {Array} list - The list of todo items.
 * @param {Object} data - The todo item to add.
 * @return {Array} The updated list of todo items.
 */
export function addToList(list, data) {
    let item = Object.assign({
        id: getNextId(),
        rating: 0
    }, data);

    return list.concat([item]);
}

/**
 * Generates the next todo item ID.
 * @param {Array} items - The list of todo items.
 * @return {Number} The next todo item ID.
 */
function getNextId() {
    return Math.floor(Math.random() * 100000);
}
