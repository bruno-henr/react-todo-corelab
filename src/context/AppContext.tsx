import { useQuery, useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import React, { createContext, useContext, ReactNode } from 'react';
import { api } from '../services/api';
import { toast } from 'sonner';

export interface Task {
    id: string,
    created_at: string,
    updated_at: string,
    title: string,
    content: string,
    favorite: boolean,
    color: string
}

export interface CreateTaskDTO {
    title: string,
    content: string,
    favorite: boolean,
    color: string
}
export interface UpdateTaskDTO {
    id: string;
    title?: string,
    content?: string,
    favorite?: boolean,
    color?: string
}
interface AppState {
    tasks: Task[] | null;
    favoriteTasks: Task[] | null;
    addNewTaskMutation: UseMutationResult<any, Error, CreateTaskDTO, unknown>;
    updateTaskMutation: UseMutationResult<any, Error, UpdateTaskDTO, unknown>;
    deleteTaskMutation: UseMutationResult<any, Error, string, unknown>;
    rollbackTask: () => void;
    handleRemoveTask: (id: string) => void;
}
// Crie o contexto API
const AppContext = createContext({} as AppState);

// Crie o provedor de contexto
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();
    const { data, isLoading, refetch, } = useQuery({
        queryKey: ['tasks'], queryFn: async () => {
            return await api.get('/task').then(({ data }) => data.data);
        }, retry: 2, refetchOnWindowFocus: true
    });

    const handleRemoveTask = (taskId: string) => {
        const newData = data.filter((task: Task) => task.id !== taskId);
        queryClient.setQueryData(['tasks'], newData);
    };

    const addNewTaskMutation = useMutation({
        mutationFn: (data: CreateTaskDTO) => {
            return api.post('/task', data).then(({ data }) => data.data);
        },
        onSuccess: () => {
            toast.success('Nota criada com sucesso! 😁')
            refetch();
        },
        onError: () => {
            toast.error('Houve um erro ao criar nota.')
        },
    });

    const updateTaskMutation = useMutation({
        mutationFn: (data: UpdateTaskDTO) => {
            return api.put('/task', data).then(({ data }) => data.data);
        },
        onSuccess: () => {
            toast.success('Nota atualizada! 😁');
            refetch();
        },
        onError: () => {
            toast.error('Houve um erro ao criar nota.')
        },
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (id: string) => {
            return api.delete(`/task/${id}`).then(({ data }) => data.data);
        },
        onSuccess: () => {
            toast.success('Nota removida com sucesso.');
            refetch();
        },
        onError: () => {
            toast.error('Houve um erro ao criar nota.')
        },
    });

    const rollbackTask = () => {
        refetch();
    }

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    return (
        <AppContext.Provider value={{
            tasks: data.filter((task: Task) => !task.favorite),
            favoriteTasks: data.filter((task: Task) => task.favorite),
            addNewTaskMutation,
            updateTaskMutation,
            deleteTaskMutation,
            rollbackTask,
            handleRemoveTask
        }}>
            {children}
        </AppContext.Provider>
    );
};


// Crie um hook personalizado para acessar o estado o contexto
export const useAppContext = () => useContext(AppContext);