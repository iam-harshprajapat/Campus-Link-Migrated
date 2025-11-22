// lib/api/notesService.ts
import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/notes";

export const notesService = {
    // 1. Get all courses
    async getCourses(token: string) {
        const res = await axios.get(`${API_BASE_URL}/courses`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.courses;
    },

    // 2. Get semesters by course
    async getSemesters(course: string, token: string) {
        const res = await axios.get(`${API_BASE_URL}/courses/${course}/semesters`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.semesters;
    },

    // 3. Get subjects by course + semester
    async getSubjects(course: string, semester: string, token: string) {
        const res = await axios.get(
            `${API_BASE_URL}/courses/${course}/semesters/${semester}/subjects`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return res.data.subjects;
    },

    // 4. Get notes by subject
    async getNotes(course: string, semester: string, subject: string, token: string) {
        const res = await axios.get(
            `${API_BASE_URL}/courses/${course}/semesters/${semester}/subjects/${subject}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        console.log(res.data.notes);
        return res.data.notes;
    },

    // 5. Upload note
    async uploadNote(formData: FormData, token: string) {
        const res = await axios.post(`${API_BASE_URL}/upload`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    },
};
