import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/AuthSlice";
import orderSliceReducer from "./slices/OrderSlice";
import paperFormatReducer from "./slices/PaperFormatSlice";
import paperTypesReducer from "./slices/PaperTypeSlice";
import prefferedEnglishReducer from "./slices/PreferredEnglishSlice";
import reviewSliceReducer from "./slices/ReviewSlice";
import subjectAreasReducer from "./slices/SubjectAreaSlice";

export const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        orders: orderSliceReducer,
        reviews: reviewSliceReducer,
        paperTypes: paperTypesReducer,
        paperFormats: paperFormatReducer,
        preffEng: prefferedEnglishReducer,
        subjectAreas: subjectAreasReducer,
    },
});
