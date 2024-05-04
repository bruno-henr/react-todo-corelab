import "@testing-library/jest-dom"
import { render, act, waitFor, waitForElementToBeRemoved, getByDisplayValue, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import FavoriteTasks from "../../components/FavoriteTasks";
import MockAdapter from "axios-mock-adapter";
import { api } from "../../services/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContext, AppProvider } from "../../context/AppContext";

const apiMock = new MockAdapter(api);
const queryClient = new QueryClient();


describe("FavoriteTasks", () => {
    test("Should be possible to see the loading screen", async () => {
        act(() => {
            apiMock.onGet('/task')
                .reply(200, {
                    "data": [
                        {
                            "id": "673e4122-37f1-4029-a370-1bd082e00cf1",
                            "created_at": "2024-05-01T23:26:09.597Z",
                            "updated_at": "2024-05-01T23:26:09.597Z",
                            "title": "Estudar javascript",
                            "content": "Descrição da tarefa...",
                            "favorite": true,
                            "color": "#B9FFDD"
                        },
                        {
                            "id": "673e4122-37f1-4029-a370-1bd082e00cf1",
                            "created_at": "2024-05-01T23:26:09.597Z",
                            "updated_at": "2024-05-01T23:26:09.597Z",
                            "title": "Estudar Java",
                            "content": "Descrição da tarefa...",
                            "favorite": false,
                            "color": "#B9FFDD"
                        },
                    ],
                    "has_error": false,
                    "error": null
                });
        });

        const { queryByText } = render(
            <QueryClientProvider client={queryClient}>
                <AppProvider>
                    <FavoriteTasks />
                </AppProvider>
            </QueryClientProvider>
        );

        await Promise.all([
            waitForElementToBeRemoved(() => queryByText(/Carregando.../i)),
        ]);
    });


    test("Should be possible to see favorite task of specific title", async () => {

        const { getByPlaceholderText } = render(
            <AppContext.Provider value={{
                favoriteTasks: [
                    {
                        "id": "673e4122-37f1-4029-a370-1bd082e00cf1",
                        "created_at": "2024-05-01T23:26:09.597Z",
                        "updated_at": "2024-05-01T23:26:09.597Z",
                        "title": "Estudar javascript",
                        "content": "Descrição da tarefa...",
                        "favorite": true,
                        "color": "#B9FFDD"
                    },
                ]
            }}>
                <FavoriteTasks />
            </AppContext.Provider>
        );

        const inputElement = getByPlaceholderText('Titulo');

        const valorInput = inputElement?.value;
        
        expect(valorInput).toBe('Estudar javascript');
    });
    // Descrição da tarefa...
    test("Should be possible to see favorite task of specific content", async () => {

        const { getByPlaceholderText } = render(
            <AppContext.Provider value={{
                favoriteTasks: [
                    {
                        "id": "673e4122-37f1-4029-a370-1bd082e00cf1",
                        "created_at": "2024-05-01T23:26:09.597Z",
                        "updated_at": "2024-05-01T23:26:09.597Z",
                        "title": "Estudar javascript",
                        "content": "Descrição da tarefa...",
                        "favorite": true,
                        "color": "#B9FFDD"
                    },
                ]
            }}>
                <FavoriteTasks />
            </AppContext.Provider>
        );

        const inputElement = getByPlaceholderText('Criar nota...');

        const valorInput = inputElement?.value;
        
        expect(valorInput).toBe('Descrição da tarefa...');
    });

    test("Should be possible to see the task removal icon", async () => {

        const { container } = render(
            <AppContext.Provider value={{
                favoriteTasks: [
                    {
                        "id": "673e4122-37f1-4029-a370-1bd082e00cf1",
                        "created_at": "2024-05-01T23:26:09.597Z",
                        "updated_at": "2024-05-01T23:26:09.597Z",
                        "title": "Estudar javascript",
                        "content": "Descrição da tarefa...",
                        "favorite": true,
                        "color": "#B9FFDD"
                    },
                ]
            }}>
                <FavoriteTasks />
            </AppContext.Provider>
        );

        const iconElement = container.querySelector("#icon-delete-task");
        expect(iconElement).toBeInTheDocument();
    });

    test("Should be possible to see the icon to select the task color", async () => {

        const { container } = render(
            <AppContext.Provider value={{
                favoriteTasks: [
                    {
                        "id": "673e4122-37f1-4029-a370-1bd082e00cf1",
                        "created_at": "2024-05-01T23:26:09.597Z",
                        "updated_at": "2024-05-01T23:26:09.597Z",
                        "title": "Estudar javascript",
                        "content": "Descrição da tarefa...",
                        "favorite": true,
                        "color": "#B9FFDD"
                    },
                ]
            }}>
                <FavoriteTasks />
            </AppContext.Provider>
        );

        const iconElement = container.querySelector("#pallet-color-task");
        expect(iconElement).toBeInTheDocument();
    });

    test("Should be possible to see the task edit icon", async () => {

        const { container } = render(
            <AppContext.Provider value={{
                favoriteTasks: [
                    {
                        "id": "673e4122-37f1-4029-a370-1bd082e00cf1",
                        "created_at": "2024-05-01T23:26:09.597Z",
                        "updated_at": "2024-05-01T23:26:09.597Z",
                        "title": "Estudar javascript",
                        "content": "Descrição da tarefa...",
                        "favorite": true,
                        "color": "#B9FFDD"
                    },
                ]
            }}>
                <FavoriteTasks />
            </AppContext.Provider>
        );

        const iconElement = container.querySelector("#icon-edit-task");
        expect(iconElement).toBeInTheDocument();
    });

    test("Should be possible to see task save icon", async () => {

        const { container } = render(
            <AppContext.Provider value={{
                favoriteTasks: [
                    {
                        "id": "673e4122-37f1-4029-a370-1bd082e00cf1",
                        "created_at": "2024-05-01T23:26:09.597Z",
                        "updated_at": "2024-05-01T23:26:09.597Z",
                        "title": "Estudar javascript",
                        "content": "Descrição da tarefa...",
                        "favorite": true,
                        "color": "#B9FFDD"
                    },
                ]
            }}>
                <FavoriteTasks />
            </AppContext.Provider>
        );

        const starIcon: Element | null  = container.querySelector("#icon-favorite-task");
        fireEvent.click(starIcon);

        const iconElement = container.querySelector("#icon-save-edit-task");
        expect(iconElement).toBeInTheDocument();
    });
})