const {
    getDataService,
    addTaskService,
    updateTaskByIdService,
    deleteTaskByIdService,
} = require('../services/taskService');

const {
    createTaskSchema,
    updateTaskSchema,
    taskIdSchema,
} = require('../validator/taskSchema');
const { handleError } = require('../utils/errorHandler');

const addTask = async (req, res) => {
    try {
        const validatedTask = createTaskSchema.parse(req.body);
        const task = await addTaskService(validatedTask);
        return res.status(201).json(task);
    } catch (error) {
        return handleError(error, res);
    }
};

const updateTaskById = async (req, res) => {
    try {
        const id = taskIdSchema.parse(req.params.id);
        const validatedUpdate = updateTaskSchema.parse(req.body);
        const updatedTask = await updateTaskByIdService(id, validatedUpdate);

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json(updatedTask);
    } catch (error) {
        return handleError(error, res);
    }
};

const getAllTasks = async (_req, res) => {
    try {
        const tasks = await getDataService();
        return res.status(200).json(tasks);
    } catch (error) {
        return handleError(error, res);
    }
};

const getTaskById = async (req, res) => {
    try {
        const id = taskIdSchema.parse(req.params.id);
        const tasks = await getDataService();
        const task = tasks.find(task => task.id === id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json(task);
    } catch (error) {
        return handleError(error, res);
    }
};

const deleteTaskById = async (req, res) => {
    try {
        const id = taskIdSchema.parse(req.params.id);
        const deleted = await deleteTaskByIdService(id);

        if (!deleted) {
            return res.status(404).json({ error: 'Task not found' });
        }

        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        return handleError(error, res);
    }
};

module.exports = {
    addTask,
    updateTaskById,
    getAllTasks,
    getTaskById,
    deleteTaskById,
};
