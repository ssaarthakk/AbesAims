import axios from 'axios';
import { saveData, getData } from './storage';

export type StudentData = {
    id: number,
    token: string,
    username: string,
    password: string,
    name: string,
    email: string,
    rollno: string,
    section: string,
    mobile: string,
    quizPin: string,
    year: number,
    semester: number,
    role: string,
    passingYear: number,
    branch?: string
}

// export const login = async (username: string, password: string) => {
//     try {
//         const result = await axios.post("https://abes.platform.simplifii.com/api/v1/admin/authenticate", { username, password });
//         const data = {
//             id: result.data.response.id,
//             token: result.data.token,
//             username: result.data.response.username,
//             password: password,
//             name: result.data.response.name,
//             email: result.data.response.email,
//             rollno: result.data.response.string4,
//             section: result.data.response.string5,
//             mobile: result.data.response.mobile,
//             quizPin: result.data.response.string10,
//             year: result.data.response.int3,
//             semester: result.data.response.int4,
//             role: result.data.response.role,
//             passingYear: result.data.response.int6,
//             branch: null
//         }
//         await saveData('userData', data);
//         return data;
//     } catch (error) {
//         console.log("Cannot login ", error);
//         return null;
//     }
// }

export const getSubjectDetailsAndAttendance = async () => {
    try {
        const studentData: StudentData | null = await getData('userData')
        const token = studentData?.token;
        const response = await axios.get("https://abes.platform.simplifii.com/api/v1/custom/getCFMappedWithStudentID?embed_attendance_summary=1", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data: Array<any> = response.data.response.data;
        const userData: StudentData | null = await getData('userData');
        const updatedUserData = { ...userData, branch: data[0].dept }
        await saveData('userData', updatedUserData);
        return data;
    } catch (error) {
        console.log("Cannot get subject Details ", error);
        return [];
    }
}

export const getSchedule = async () => {
    try {
        const studentData: StudentData | null = await getData('userData')
        const token = studentData?.token;
        const response = await axios.get("https://abes.platform.simplifii.com/api/v1/custom/getMyScheduleStudent", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data: Array<any> = response.data.response.data;
        return data;
    } catch (error) {
        console.log("Cannot get schedule ", error);
        return [];
    }
}

export const getQuizDetails = async () => {
    try {
        const studentData: StudentData | null = await getData('userData')
        const token = studentData?.token;
        const response = await axios.get("https://abes.platform.simplifii.com/api/v1/custom/myEvaluatedQuizzes", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data: Array<any> = response.data.response.data;
        return data;
    } catch (error) {
        console.log("Cannot get schedule ", error);
        return [];
    }
}

export const getSubjectAttendance = async (subjectId: string) => {
    try {
        const studentData: StudentData | null = await getData('userData')
        const token = studentData?.token;
        const id = studentData?.id;
        const response = await axios.get(`https://abes.platform.simplifii.com/api/v1/cards?type=Attendance&sort_by=+datetime1&equalto___fk_student=${id}&equalto___cf_id=${subjectId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data: Array<any> = response.data.response.data;
        return data;
    } catch (error) {
        console.log("Cannot get schedule ", error);
        return [];
    }
}

export const forgotPassoword = async (username: string) => {
    try {
        const response = await axios.patch(`https://abes.platform.simplifii.com/api/v1/forgotpassword`, { username, reset_password_base_url: "https://abes.web.simplifii.com/reset_password.php" });
        const result = { statusCode: response.status, message: response.data.msg };
        return result;
    } catch (error) {
        console.log("Cannot reset password", error);
        return { statusCode: 404, message: "Cannot send link to forget password." };
    }
}

export const changePassword = async (password: string) => {
    try {
        const studentData: StudentData | null = await getData('userData')
        const response = await axios.patch(`https://abes.platform.simplifii.com/api/v1/cards`, { card_unique_code: studentData?.username, action: "ChangePassword", current_password: studentData?.password, password }, {
            headers: {
                Authorization: `Bearer ${studentData?.token}`
            }
        });
        const result = { statusCode: response.status, message: response.data.msg };
        return result;
    } catch (error) {
        console.log("Cannot change password", error);
        return { statusCode: 404, message: "Cannot change password." };
    }
}

export const changePin = async (pin: string) => {
    try {
        const studentData: StudentData | null = await getData('userData')
        const response = await axios.patch(`https://abes.platform.simplifii.com/api/v1/cards`, { card_unique_code: studentData?.username, action: "SetPin", pin }, {
            headers: {
                Authorization: `Bearer ${studentData?.token}`
            }
        });
        const result = { statusCode: response.status, message: response.data.msg };
        return result;
    } catch (error) {
        console.log("Cannot change PIN", error);
        return { statusCode: 404, message: "Cannot change PIN." };
    }
}

export const fetchQuiz = async (quizCode: string) => {
    try {
        const studentData: StudentData | null = await getData('userData');
        const pin = studentData?.quizPin;
        const user_unique_code = studentData?.username;
        const response = await axios.post(`https://faas-blr1-8177d592.doserverless.co/api/v1/web/fn-1c23ee6f-939a-44b2-9c4e-d17970ddd644/abes/fetchQuizDetails`, { pin, quiz_uc: quizCode, user_unique_code });
        const message = response.data.msg || "Quiz fetched successfully";
        const data: any = response.data.response.data;
        return { message, data: { ...data, time_now: response.data.response.time_now } };
    } catch (error) {
        console.log("Cannot get quiz ", error);
        return { message: "Cannot get quiz", data: [] };
    }
}

export const getQuestionsForQuiz = async (quizCode: string) => {
    try {
        const studentData: StudentData | null = await getData('userData');
        const pin = studentData?.quizPin;
        const user_unique_code = studentData?.username;
        const response = await axios.post(`https://faas-blr1-8177d592.doserverless.co/api/v1/web/fn-1c23ee6f-939a-44b2-9c4e-d17970ddd644/abes/getQuestionsForQuiz`, { pin, quiz_uc: quizCode, user_unique_code });
        const message = response.data.msg.length !== 0? response.data.msg : "Questions fetched successfully";
        const data: Array<any> = response.data.response.data;
        return { message, data };
    } catch (error) {
        console.log("Cannot get questions for quiz", error);
        return { message: "Cannot get questions for quiz", data: [] };
    }
}

export const submitAnswer = async (quizCode: string, questionId: string, answer: number) => {
    try {
        const studentData: StudentData | null = await getData('userData');
        const pin = studentData?.quizPin;
        const user_unique_code = studentData?.username;
        const response = await axios.post(`https://faas-blr1-8177d592.doserverless.co/api/v1/web/fn-1c23ee6f-939a-44b2-9c4e-d17970ddd644/abes/submitAnswer`, { quiz_uc: quizCode, question_id: questionId, user_unique_code, answer, pin });
        return response.data.msg || "Questions fetched successfully";
    } catch (error) {
        console.log("Cannot get questions for quiz", error);
        return { message: "Cannot get questions for quiz", data: [] };
    }
}

export const submitAndExitQuiz = async (quizCode: string) => {
    try {
        const studentData: StudentData | null = await getData('userData');
        const pin = studentData?.quizPin;
        const user_unique_code = studentData?.username;
        const response = await axios.post(`https://faas-blr1-8177d592.doserverless.co/api/v1/web/fn-1c23ee6f-939a-44b2-9c4e-d17970ddd644/abes/submitAnswer`, { "quiz_uc": quizCode, user_unique_code, pin });
        return response.data.msg || "Questions fetched successfully";
    } catch (error) {
        console.log("Cannot get questions for quiz", error);
        return { message: "Cannot get questions for quiz", data: [] };
    }
}