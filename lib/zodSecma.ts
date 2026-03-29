import { z } from "zod";

// Zod Schema for Login
export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Username must be a valid email" })
    .min(5, { message: "Username must be at least 5 characters" }),
  
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(30, { message: "Password cannot exceed 30 characters" }),
    

  rememberMe: z.boolean().optional(),
});

export const activeScemaStudent = z.object({
  code: z
    .string().min(5, { message: "requier code!!" }),
  
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(30, { message: "Password cannot exceed 30 characters" }),
    

});


export const createStudentSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
gender: z.string().refine(val => ["male", "female", "other"].includes(val), {
  message: "Please select a gender",
})

});

export const createBatchSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Batch name is required" })
    .min(3, { message: "Batch name must be at least 3 characters" })
    .max(50, { message: "Batch name must not exceed 50 characters" }),

  startDate: z
    .string()
    .min(1, { message: "Start date is required" })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
});
export const secmanametrack = z.object({
  name: z
    .string()
    .min(1, { message: "track name is required" })
    .min(3, { message: "track name must be at least 3 characters" })
    .max(50, { message: "track name must not exceed 50 characters" }),
});


export const createLectureSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Lecture title must be at least 3 characters" })
    .max(100, { message: "Lecture title must not exceed 100 characters" }),

  ContentText: z
    .string()
    .trim()
    .min(10, { message: "Content must be at least 10 characters" })
    .max(2000, { message: "Content must not exceed 2000 characters" }),

 DriveLink: z
  .string()
  .min(1, { message: "Drive link is required" })
  .url({ message: "Drive link must be a valid URL" })
  .optional(),
 file:   z.any().optional(),}  )  ;

export const createAssignmentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Assignment title must be at least 3 characters" })
    .max(100, { message: "Assignment title must not exceed 100 characters" }),

  maxScore: z
    .number({ invalid_type_error: "Max score must be a number" })
    .min(1, { message: "Max score must be at least 1" })
    .max(100, { message: "Max score cannot exceed 100" }),

  dueDate: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      { message: "Due date must be a valid date" }
    ),
});





export const createdegreSchema = z.object({
  feedback: z
    .string()
    .trim()
    .min(3, { message: "feedback title must be at least 3 characters" })
    .max(100, { message: "feedback title must not exceed 100 characters" }),

  score: z
    .number({ invalid_type_error: " score must be a number" })
    .min(1, { message: " score must be at least 1" })
    .max(100, { message: " score cannot exceed 100" }),

});



export const editLectureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  ContentText: z.string().min(1, "Content is required"),
  DriveLink: z.string().url("Must be a valid URL").optional(),
  file: z.any().optional(),
});
export const updateBatchSchema = z.object({
  id: z.string().uuid("Invalid batch id"),

  name: z
    .string()
    .min(1, { message: "Batch name is required" })
    .min(3, { message: "Batch name must be at least 3 characters" })
    .max(50, { message: "Batch name must not exceed 50 characters" }),

  startDate: z
    .string()
    .min(1, { message: "Start date is required" })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    
});
export const updateAssignmentSchema = z.object({
  title: z.string().min(3, "Title required"),
  maxScore: z.number().min(1, "Score required"),
  dueDate: z.string().min(1, "Due date required"),
});
export const createArticleSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title too long" }),

  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" }),

  imageUrl: z
  .any()
  .refine((files) => {
    if (!files || files.length === 0) return true;
    return files[0] instanceof File;
  }, "Invalid file")
  .refine((files) => {
    if (!files || files.length === 0) return true;
    return files[0].size <= 2_000_000;
  }, "Max size is 2MB")
  .optional(),
});
export type CreateArticleFormValues = z.infer<typeof createArticleSchema>;
export type UpdateAssignmentFormValues = z.infer<typeof updateAssignmentSchema>;
export type editLectureSchemaValues = z.infer<typeof editLectureSchema>;
export type UpdateBatchFormValues = z.infer<typeof updateBatchSchema>;
export type CreateAssignmentFormValues = z.infer<typeof createAssignmentSchema>;
export type createdegreSchemaval = z.infer<typeof createdegreSchema>;
export type CreateLectureFormValues = z.infer<typeof createLectureSchema>;
export type CreateStudentFormValues = z.infer<typeof createStudentSchema>;
export type LoginFormType = z.infer<typeof loginSchema>;
export type ActiveStudentCodeType = z.infer<typeof activeScemaStudent>;
export type CreateBatchFormValues = z.infer<typeof createBatchSchema>;
export type createsecmanametrack = z.infer<typeof secmanametrack>;
