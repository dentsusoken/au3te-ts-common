import { z } from 'zod';

/**
 * Schema for a string array object.
 *
 * This schema defines an object with a single property 'array'
 * which is an array of strings.
 */
export const stringArraySchema = z.object({
  array: z.array(z.string()).default([]),
});

/**
 * Represents a string array object.
 *
 * @typedef {Object} StringArray
 * @property {string[]} array - An array of strings.
 */
export type StringArray = z.infer<typeof stringArraySchema>;
