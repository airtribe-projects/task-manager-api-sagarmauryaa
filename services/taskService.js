const { readData, writeData } = require("../utils/fileUtils");

const getDataService = async () => {
    return await readData();
};

const addTaskService = async (newTask) => {
    const data = await readData();
    const nextId =
        data.length === 0 ? 1 : Math.max(...data.map(t => t.id)) + 1;
    const newTaskWithId = { ...newTask, id: nextId };
    data.push(newTaskWithId);
    await writeData(data);
    return newTaskWithId;
};

const updateTaskByIdService = async (id, updatedTask) => {
    const data = await readData();
    const index = data.findIndex(task => task.id === id);


    if (index === -1) {
        return null;
    }

    data[index] = {
        ...data[index],
        ...updatedTask,
        id: data[index].id,
    };
    await writeData(data);
    return data[index];
};

const deleteTaskByIdService = async (id) => {
    const data = await readData();
    const filteredData = data.filter(task => task.id !== id);

    if (filteredData.length === data.length) {
        return false;
    }

    await writeData(filteredData);
    return true;
};

module.exports = {
    getDataService,
    addTaskService,
    updateTaskByIdService,
    deleteTaskByIdService,
};
