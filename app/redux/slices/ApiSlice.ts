// src/services/apiSlice.ts
import {
  ActivateStudentResponse,
  AdminResponse,
  ApiResponse,
  ArticlesResponse,
  AssignmentDetailsResponse,
  AssignmentResponse,
  AssignmentStatsResponse,
  AssignmentSubmissionsResponse,
  BatchesData,
  BatchResponse,
  BatchStudentsResponse,
  CreateArticleRequest,
  CreateArticleResponse,
  CreateBatchResponse,
  CreateStudentResponse,
  CreateTrackRequest,
  DashboardResponse,
  GetLecturesdetailsResponse,
  GetLecturesResponse,
  GetTracksResponse,
  IUser,
  LecturesResponse,
  LoginResponse,
  MySubmissionResponse,
  StudentDashboardResponse,
  StudentProgressResponse,
  Track,
  TrackResponse,
} from "@/app/interfaces";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import CookieService from "@/lib/cookieService";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.habib-academy.tech/api/v1/",
  prepareHeaders: (headers) => {
    const token = CookieService.get("token"); 

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = CookieService.get("refreshToken");

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh-token",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const data = refreshResult.data as { accessToken: string };
        CookieService.set("token", data.accessToken, {
          path: "/",
          maxAge: 60 * 60 * 24,
          sameSite: "strict",
        });

        result = await baseQuery(args, api, extraOptions);
      } else {
        CookieService.remove("token", { path: "/" });
        CookieService.remove("refreshToken", { path: "/" });
        toast.error("Session expired, please login again");
      }
    }
  }

  return result;
};

export const ApiSlice = createApi({
  reducerPath: "productsApi",
  baseQuery: baseQueryWithReauth,

  tagTypes: [
    "Batch",
    "BatchStudents",
    "Track",
    "Lecture",
    "Assignment",
    "Submission",
    "Dashboard",
    "my-submission",
    "Batches",
  ],

  endpoints: (builder) => ({
    // ================= AUTH =================
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    cerateadmin: builder.mutation<AdminResponse, { email: string; password: string, firstName: string, lastName: string }>({
      query: (credentials) => ({
        url: "auth/admin/create",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Dashboard"],

    }),


    getAdmins: builder.query<AdminResponse, { search?: string; includeSuperAdmins?: boolean }>({
      query: ({ search = "", includeSuperAdmins = false }) => ({
        url: "auth/admin/admins",
        params: {
          Search: search,
          IncludeSuperAdmins: includeSuperAdmins,
        },
      }),
      providesTags: ["Dashboard"],
    }),
    deleteAdmin: builder.mutation<ApiResponse<string>, string>({
      query: (userId) => ({
        url: `auth/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dashboard"],
    }),


    ActiveStudent: builder.mutation<ActivateStudentResponse, { code: string; password: string }>({
      query: (credentials) => ({
        url: "auth/activate",
        method: "POST",
        body: credentials,
      }),
    }),

    // ================= BATCH =================
    getBatch: builder.query<ApiResponse<BatchesData>, void>({
      query: () => "batches?sort=desc",
      providesTags: ["Batch"],
    }),

    createbatcg: builder.mutation<CreateBatchResponse, { name: string; startDate: string }>({
      query: (credentials) => ({
        url: "batches",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Batch", "Dashboard"], // 🔥 Dashboard refresh
    }),

    getBatchdetails: builder.query<BatchResponse, string>({
      query: (batchId) => `batches/${batchId}`,
      providesTags: (result, error, id) => [{ type: "Batch", id }],
    }),

    // ================= STUDENTS =================
    getStudentProgress: builder.query<StudentProgressResponse, { trackId: string; studentId: string }>({
      query: ({ trackId, studentId }) => `tracks/${trackId}/students/${studentId}/progress`,
    }),

createArticle: builder.mutation<
  CreateArticleResponse,
  { title: string; content: string; image: File }
>({
  query: ({ title, content, image }) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    return {
      url: "articles",
      method: "POST",
      body: formData,
    };
  },
}),

    getBatchStudents: builder.query<BatchStudentsResponse, string>({
      query: (batchId) => `batches/${batchId}/students`,
      providesTags: ["BatchStudents"],
    }),

    ADminCreatestudent: builder.mutation<
      CreateStudentResponse,
      { email: string; firstName: string; lastName: string; gender: string; batchId: string }
    >({
      query: (credentials) => ({
        url: "auth/admin/students",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["BatchStudents", "Dashboard"], // 🔥 Dashboard refresh
    }),

    deleteStudent: builder.mutation<ApiResponse<unknown>, { batchId: string; studentId: string }>({
      query: ({ batchId, studentId }) => ({
        url: `batches/${batchId}/students/${studentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BatchStudents", "Dashboard"], // 🔥 Dashboard refresh
    }),

    // ================= TRACKS =================
    getBatchtracks: builder.query<ApiResponse<Track[]>, string>({
      query: (batchId) => `batches/${batchId}/tracks`,
      providesTags: ["Track"],
    }),

    postbatchTracks: builder.mutation<GetTracksResponse, CreateTrackRequest>({
      query: ({ batchId, name }) => ({
        url: `batches/${batchId}/tracks`,
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["Track", "Batch", "Dashboard"]
    }),

    // ================= LECTURES =================
    getlechtuertrack: builder.query<GetLecturesResponse, string>({
      query: (trackId) => `tracks/${trackId}/lectures`,
      providesTags: ["Lecture"], // ✅ Lecture refresh
    }),

    postLecture: builder.mutation<
      LecturesResponse,
      { title: string; ContentText: string; DriveLink: string; file: FileList; trackId: string }
    >({
      query: ({ title, ContentText, DriveLink, file, trackId }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("ContentText", ContentText);
        formData.append("DriveLink", DriveLink);
        if (file?.length) formData.append("file", file[0]);
        return { url: `tracks/${trackId}/lectures`, method: "POST", body: formData };
      },
      invalidatesTags: ["Lecture", "Track", "Dashboard"]
    }),

    // ================= ASSIGNMENTS =================
    getlecturesidassignments: builder.query<AssignmentResponse, string>({
      query: (lectureId) => `lectures/${lectureId}/assignments`,
      providesTags: ["Assignment"],
    }),

    getdashbordadmin: builder.query<AssignmentResponse, string>({
      query: (lectureId) => `lectures/${lectureId}/assignments`,
      providesTags: ["Assignment"],
    }),
    // ================= DELETE LECTURE =================

    deleteLecture: builder.mutation<ApiResponse<string>, string>({
      query: (lectureId) => ({
        url: `lectures/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lecture", "Assignment", "Track", "Dashboard"],
    }),

    // ================= DELETE TRACK =================

    deleteTrack: builder.mutation<ApiResponse<string>, string>({
      query: (trackId) => ({
        url: `tracks/${trackId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Track", "Lecture", "Dashboard"],
    }),

    deleteAssignment: builder.mutation<ApiResponse<string>, string>({
      query: (assignmentId) => ({
        url: `assignments/${assignmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assignment", "Lecture", "Dashboard"],
    }),



    getMe: builder.query<IUser, void>({
      query: () => "auth/me",
      providesTags: ["Dashboard"]
    }),




    getarticles: builder.query<ArticlesResponse , void>({
      query: () => "articles",
      providesTags: ["Dashboard"]
    }),


    postAssignment: builder.mutation<
      ApiResponse<unknown>,
      {
        lectureId: string;
        title: string;
        maxScore: number;
        dueDate: string;
        file?: File; // ✅ أضفنا file هنا
      }
    >({
      query: ({ lectureId, title, maxScore, dueDate, file }) => {
        const formData = new FormData();

        formData.append("title", title);
        formData.append("maxScore", String(maxScore));
        formData.append("dueDate", dueDate);

        // ✅ رفع الملف لو موجود
        if (file) {
          formData.append("file", file);
        }

        return {
          url: `lectures/${lectureId}/assignments`,
          method: "POST",
          body: formData, // ✅ بدل JSON
        };
      },

      invalidatesTags: ["Assignment", "Lecture", "Dashboard"], // 🔥 refresh تلقائي
    }),

    closeAssignment: builder.mutation<ApiResponse<unknown>, string>({
      query: (assignmentId) => ({ url: `assignments/${assignmentId}/close`, method: "POST" }),
      invalidatesTags: ["Assignment", "Lecture", "Dashboard"]
    }),

    getAssignmentSubmissions: builder.query<AssignmentSubmissionsResponse, string>({
      query: (assignmentId) => `assignments/${assignmentId}/submissions`,
      providesTags: ["Submission"], // ✅ Submission refresh
    }),

    getAssignmentmysubmission: builder.query<MySubmissionResponse, string>({
      query: (assignmentId) => `assignments/${assignmentId}/my-submission`,
      providesTags: ["Submission"], // ✅ Submission refresh
    }),

    gradeSubmission: builder.mutation<
      ApiResponse<unknown>,
      { submissionId: string; score: number; feedback: string }
    >({
      query: ({ submissionId, score, feedback }) => ({
        url: `submissions/${submissionId}/grade`,
        method: "POST",
        body: { submissionId, score, feedback },
      }),
      invalidatesTags: ["Submission", "Assignment", "Dashboard"]
    }),

    // ================= DETAILS =================
    gettracksdetails: builder.query<TrackResponse, string>({
      query: (tracksid) => `tracks/${tracksid}`,
      providesTags: ["Track"],
    }),

    gettracksdetailslecture: builder.query<LecturesResponse, string>({
      query: (tracksid) => `tracks/${tracksid}/lectures`,
      providesTags: ["Lecture"], // ✅ Lecture refresh
    }),

    getlecturesid: builder.query<GetLecturesdetailsResponse, string>({
      query: (lecturesdi) => `lectures/${lecturesdi}`,
      providesTags: ["Lecture"], // ✅ Lecture refresh
    }),

    getAssignmentById: builder.query<AssignmentDetailsResponse, string>({
      query: (assignmentId) => `assignments/${assignmentId}`,
      providesTags: ["Assignment"],
    }),

    // ================= DASHBOARD =================
    logout: builder.mutation<void, void>({
      query: () => {
        const refreshToken = CookieService.get("refreshToken");
        return { url: "auth/logout", method: "POST", body: { refreshToken } };
      },
    }),

    getStudentDashboard: builder.query<StudentDashboardResponse, void>({
      query: () => "dashboard/student",
      providesTags: ["Dashboard"],
    }),

    getAdminDashboard: builder.query<DashboardResponse, void>({
      query: () => "dashboard/admin",
      providesTags: ["Dashboard"], // ✅ Dashboard refresh عند أي invalidation
    }),

    submitAssignmentstudentsub: builder.mutation<ApiResponse<unknown>, { assignmentId: string; file: File }>({
      query: ({ assignmentId, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        return { url: `assignments/${assignmentId}/submit`, method: "POST", body: formData };
      },
      invalidatesTags: ["Submission", "Assignment", "Dashboard"]
    }),

    updateBatch: builder.mutation({
      query: (body) => ({ url: "/batches", method: "PUT", body }),
      invalidatesTags: ["Batch", "Dashboard"],
    }),

    updateTrack: builder.mutation({
      query: ({ trackId, name }) => ({
        url: `tracks/${trackId}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["Track", "Dashboard"],
    }),
    getNotifications: builder.query<{ data?: { items?: unknown[] } }, void>({ query: () => "/notifications" }),

    getUnreadCount: builder.query<number, void>({ query: () => "/notifications/unread-count" }),
    deleteBatch: builder.mutation<ApiResponse<string>, string>({
      query: (batchId) => ({
        url: `batches/${batchId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Batch", "Dashboard"],
    }),
    markNotificationRead: builder.mutation<void, string>({
      query: (id) => ({ url: `/notifications/${id}/read`, method: "POST" }),
    }),

    updateAssignment: builder.mutation<
      ApiResponse<string>,
      {
        assignmentId: string;
        title: string;
        maxScore: number;
        dueDate: string;
        file?: File;
      }
    >({
      query: ({ assignmentId, title, maxScore, dueDate, file }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("maxScore", String(maxScore));
        formData.append("dueDate", dueDate);

        if (file) {
          formData.append("file", file);
        }

        return {
          url: `assignments/${assignmentId}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Assignment", "Lecture", "Dashboard"],
    }),


    updateLecture: builder.mutation<
      ApiResponse<string>,
      { lectureId: string; title: string; ContentText: string; DriveLink: string; file?: File }
    >({
      query: ({ lectureId, title, ContentText, DriveLink, file }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("ContentText", ContentText);
        formData.append("DriveLink", DriveLink);
        if (file) formData.append("file", file);


        return {
          url: `lectures/${lectureId}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Lecture", "Track", "Dashboard"],
    }),

    markAllNotificationsRead: builder.mutation<void, void>({
      query: () => ({ url: "/notifications/read-all", method: "POST" }),
    }),

    getAssignmentStats: builder.query<AssignmentStatsResponse, string>({
      query: (assignmentId) => `assignments/${assignmentId}/stats`,
      providesTags: ["Assignment"],
    }),

    getMyBatches: builder.query<ApiResponse<BatchesData>, void>({
      query: () => "batches?sort=desc",
      providesTags: ["Batch"],
    }),

    changePassword: builder.mutation<ApiResponse<unknown>, { currentPassword: string; newPassword: string }>({
      query: (body) => ({
        url: "auth/change-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useADminCreatestudentMutation,
  useActiveStudentMutation,
  useCreatebatcgMutation,
  useGetBatchdetailsQuery,
  useGetBatchQuery,
  useGetBatchStudentsQuery,
  useGetBatchtracksQuery,
  useDeleteStudentMutation,
  usePostbatchTracksMutation,
  useCreateArticleMutation,
  useGettracksdetailsQuery,
  usePostLectureMutation,
  useGetlechtuertrackQuery,
  useGetlecturesidQuery,
  useUpdateAssignmentMutation,
  useGetlecturesidassignmentsQuery,
  useGetAssignmentByIdQuery,
  useGetAssignmentStatsQuery,
  useCloseAssignmentMutation,
  useGetAssignmentSubmissionsQuery,
  useGradeSubmissionMutation,
  useGetStudentProgressQuery,
  useGetMeQuery,
  useGetStudentDashboardQuery,
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
  useSubmitAssignmentstudentsubMutation,
  useUpdateTrackMutation,
  useCerateadminMutation,
  useUpdateLectureMutation,
  useGetAdminDashboardQuery,
  useGetAssignmentmysubmissionQuery,
  useDeleteAssignmentMutation,
  usePostAssignmentMutation,
  useLogoutMutation,
  useDeleteLectureMutation,
  useDeleteBatchMutation,
  useGetAdminsQuery,
  useDeleteAdminMutation,
  useDeleteTrackMutation,
  useUpdateBatchMutation,
  useGetMyBatchesQuery,
  useChangePasswordMutation,
  useGetarticlesQuery,
} = ApiSlice;