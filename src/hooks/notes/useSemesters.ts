"use client";

import { useQuery } from "@tanstack/react-query";
import { notesService } from "@/lib/api/notesService";
import { useAuth } from "@/context/authContext";

export function useSemesters(course: string) {
    const { token } = useAuth();

    return useQuery({
        queryKey: ["semesters", course],
        queryFn: () => notesService.getSemesters(course, token!),
        enabled: !!token && !!course,
    });
}
