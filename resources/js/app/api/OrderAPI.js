import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath: "orderAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
    }),
    endpoints: (builder) => ({
        orders: builder.query({
            query: () => "/orders",
        }),
        academicLevels: builder.query({
            query: () => "/academic-levels",
        }),
        subjectAreas: builder.query({
            query: () => "/subject-areas",
        }),
        prefferedEnglish: builder.query({
            query: () => "/preffered-english",
        }),
        paperFormats: builder.query({
            query: () => "/paper-formats",
        }),
        paperTypes: builder.query({
            query: () => "/paper-types",
        }),
        reviews: builder.query({
            query: () => "/reviews",
        }),
    }),
});

export const {
    useOrdersQuery,
    useAcademicLevelsQuery,
    useSubjectAreasQuery,
    usePrefferedEnglishQuery,
    usePaperFormatsQuery,
    usePaperTypesQuery,
    useReviewsQuery,
} = orderApi;
