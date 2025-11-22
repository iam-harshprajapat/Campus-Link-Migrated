"use client";

import { useQuery } from "@tanstack/react-query";
import { notesService } from "@/lib/api/notesService";
import { useAuth } from "@/context/authContext";

export function useCourses() {
    const { token } = useAuth();

    return useQuery({
        queryKey: ["courses"],
        queryFn: () => notesService.getCourses(token!),
        enabled: !!token,
    });
}
