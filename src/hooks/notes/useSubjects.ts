"use client";

import { useQuery } from "@tanstack/react-query";
import { notesService } from "@/lib/api/notesService";
import { useAuth } from "@/context/authContext";

export function useSubjects(course: string, semester: string) {
    const { token } = useAuth();

    return useQuery({
        queryKey: ["subjects", course, semester],
        queryFn: () => notesService.getSubjects(course, semester, token!),
        enabled: !!token && !!course && !!semester,
    });
}
