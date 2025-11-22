"use client";

import { useQuery } from "@tanstack/react-query";
import { notesService } from "@/lib/api/notesService";
import { useAuth } from "@/context/authContext";

export function useNotes(course: string, semester: string, subject: string) {
    const { token } = useAuth();

    return useQuery({
        queryKey: ["notes", course, semester, subject],
        queryFn: () =>
            notesService.getNotes(course, semester, subject, token!),
        enabled: !!token && !!course && !!semester && !!subject,
    });
}
