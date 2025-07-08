import { z } from 'zod';

/**
 * Schema for a string array object.
 *
 * This schema defines an object with a single property 'array'
 * which is an array of strings.
 */
const stringArraySchema = z.object({
  array: z.array(z.string()),
});

/**
 * Schema for an array of string array objects.
 *
 * This schema represents an array where each element is an object
 * conforming to the stringArraySchema.
 */
export const stringArrayArraySchema = z.array(stringArraySchema);

/**
 * Type representing an array of string array objects.
 * Inferred from the stringArrayArraySchema.
 */
export type StringArrayArray = z.input<typeof stringArrayArraySchema>;
