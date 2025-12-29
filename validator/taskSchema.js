const { z } = require('zod');

const taskBaseSchema = {
    title: z
        .string()
        .trim().min(1, 'Title is required'),
    description: z
        .string()
        .trim().min(1, 'Description is required'),
    completed: z.boolean().default(false).refine((val) => val === true || val === false, 'Completed must be a boolean value (true or false)').optional()
};

const createTaskSchema = z.object({
    ...taskBaseSchema,
}).strict();

const updateTaskSchema = z
    .object({
        ...taskBaseSchema,
    })
    .partial()
    .strict();

const taskIdSchema = z
    .string()
    .regex(/^\d+$/, 'Task ID must be a valid number')
    .transform((val) => Number(val))
    .refine((val) => val > 0, 'Task ID must be a positive number');

module.exports = {
    createTaskSchema,
    updateTaskSchema,
    taskIdSchema,
};
