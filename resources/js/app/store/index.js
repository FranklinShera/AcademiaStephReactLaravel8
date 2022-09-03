import { configureStore } from "@reduxjs/toolkit";
import api from "../api/api";
import { authApi } from "../api/AuthAPI";
import { orderApi } from "../api/OrderAPI";
import academicLevelReducer from "./slices/AcademicLevelSlice";
import appReducer from "./slices/AppSlice";
import authSliceReducer from "./slices/AuthSlice";
import orderSliceReducer from "./slices/OrderSlice";
import paperFormatReducer from "./slices/PaperFormatSlice";
import paperTypesReducer from "./slices/PaperTypeSlice";
import prefferedEnglishReducer from "./slices/PreferredEnglishSlice";
import reviewSliceReducer from "./slices/ReviewSlice";
import subjectAreasReducer from "./slices/SubjectAreaSlice";

const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authSliceReducer,
        orders: orderSliceReducer,
        reviews: reviewSliceReducer,
        paperTypes: paperTypesReducer,
        paperFormats: paperFormatReducer,
        preffEng: prefferedEnglishReducer,
        subjectAreas: subjectAreasReducer,
        academicLevels: academicLevelReducer,

        [orderApi.reducerPath]: orderApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            api.middleware,
            orderApi.middleware,
            authApi.middleware
        ),
});

export default store;
