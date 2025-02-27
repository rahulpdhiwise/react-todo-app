import update from 'immutability-helper';
import { getTodos as fetchTodos, createTodo, updateTodo, updateTodoStatus, updateTodoRating as updateTodoRatingApi } from './api/todos';

// Local cache of todos
let todoCache = [];

/**
 * Get the list of todo items from the API.
 * @return {Promise<Array>}
 */
export async function getAll() {
    try {
        todoCache = await fetchTodos();
        return todoCache;
    } catch (error) {
        console.error('Error fetching todos:', error);
        return todoCache || [];
    }
}

/**
 * Updates the status of a todo item.
 * @param {Array} items - The list of todo items.
 * @param {Number|String} itemId - The ID of the todo item to update.
 * @param {Boolean} completed - The new completed status.
 * @return {Array} The updated list of todo items.
 */
export function updateStatus(items, itemId, completed) {
    let index = items.findIndex(item => item.id === itemId || item._id === itemId);
    
    if (index === -1) return items;
    
    // Update in the API
    const id = items[index]._id || items[index].id;
    updateTodoStatus(id, completed).catch(error => {
        console.error('Error updating todo status:', error);
    });
    
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
 * @param {Number|String} itemId - The ID of the todo item to update.
 * @param {Number} rating - The new rating value (0-5).
 * @return {Array} The updated list of todo items.
 */
export function updateRating(items, itemId, rating) {
    let index = items.findIndex(item => item.id === itemId || item._id === itemId);
    
    if (index === -1) return items;
    
    // Update in the API
    const id = items[index]._id || items[index].id;
    updateTodoRatingApi(id, rating).catch(error => {
        console.error('Error updating todo rating:', error);
    });
    
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
    const newTodo = {
        text: data.text,
        completed: data.completed || false,
        rating: data.rating || 0
    };
    
    // Create in the API
    createTodo(newTodo).then(createdTodo => {
        // Update the local cache with the created todo
        todoCache = [...todoCache, createdTodo];
    }).catch(error => {
        console.error('Error creating todo:', error);
    });
    
    // For immediate UI update, create a temporary item with a local ID
    const tempItem = {
        ...newTodo,
        id: getNextId() // Temporary ID until API response
    };
    
    return list.concat([tempItem]);
}

/**
 * Generates a temporary ID for new todo items.
 * @return {Number} A temporary ID.
 */
function getNextId() {
    return Math.floor(Math.random() * 100000);
}
