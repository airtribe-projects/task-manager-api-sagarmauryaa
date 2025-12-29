const express = require('express');
const router = express.Router();

const {
    addTask,
    getAllTasks,
    getAllTasksByPriority,
    getTaskById,
    updateTaskById,
    deleteTaskById,
} = require('../controllers/taskController');

router.post('/tasks', addTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/priority/:priority', getAllTasksByPriority);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTaskById);
router.delete('/tasks/:id', deleteTaskById);

module.exports = router;
