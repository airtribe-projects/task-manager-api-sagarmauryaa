const { z } = require('zod');

const taskBaseSchema = {
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be less than 100 characters'),

    description: z
        .string()
        .min(5, 'Description must be at least 5 characters')
        .max(500, 'Description must be less than 500 characters')
        .optional(),

    completed: z.boolean().default(false),
};

const createTaskSchema = z.object({
    title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be less than 100 characters'),
    description: z
        .string()
        .min(5, 'Description must be at least 5 characters')
        .max(500, 'Description must be less than 500 characters'),
    completed: z.boolean().default(false),
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
