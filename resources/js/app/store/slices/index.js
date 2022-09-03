import { authSlice } from "./AuthSlice";
import { orderSlice } from "./OrderSlice";
import { paperTypesSlice } from "./PaperTypeSlice";
import { prefferedEnglishSlice } from "./PreferredEnglishSlice";
import { subjectAreasSlice } from "./SubjectAreaSlice";
import { reviewSlice } from "./ReviewSlice";
import { paperFormatSlice } from "./PaperFormatSlice";
import { appSlice } from "./AppSlice";
import { academicLevelSlice } from "./AcademicLevelSlice";

const slices = {
    appSlice,
    authSlice,
    orderSlice,
    paperTypesSlice,
    academicLevelSlice,
    paperFormatSlice,
    prefferedEnglishSlice,
    subjectAreasSlice,
    reviewSlice,
};

export default slices;
