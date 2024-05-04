import "@testing-library/jest-dom"
import { render, act, waitFor, waitForElementToBeRemoved, getByDisplayValue, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import FavoriteTasks from "../../components/FavoriteTasks";
import MockAdapter from "axios-mock-adapter";
import { api } from "../../services/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContext, AppProvider } from "../../context/AppContext";
import EditTask from "../../components/EditTask";

const apiMock = new MockAdapter(api);
const queryClient = new QueryClient();

let taskMock = {
    "id": "673e4122-37f1-4029-a370-1bd082e00cf1",
    "created_at": "2024-05-01T23:26:09.597Z",
    "updated_at": "2024-05-01T23:26:09.597Z",
    "title": "Estudar javascript",
    "content": "Descrição da tarefa...",
    "favorite": true,
    "color": "#B9FFDD"
}

describe("EditTask", () => {
    test("Should be possible to edit the title of a task", async () => {
        const { getByPlaceholderText, container } = render(<EditTask task={taskMock} />);

        const inputTitle = getByPlaceholderText('Titulo');

        fireEvent.change(
            inputTitle,
            { target: { value: 'alterando titulo da tarefa' } }
        )

        const iconElement = container.querySelector("#icon-save-edit-task");
        expect(iconElement).toBeInTheDocument();

        expect(inputTitle.value).toBe('alterando titulo da tarefa')
    });

    test("Should be possible to edit the content of a task", async () => {
        const { getByPlaceholderText, container } = render(<EditTask task={taskMock} />);

        const textareaInput = getByPlaceholderText('Criar nota...');

        fireEvent.change(
            textareaInput,
            { target: { value: 'alterando conteudo dessa tarefa' } }
        )

        const iconElement = container.querySelector("#icon-save-edit-task");
        expect(iconElement).toBeInTheDocument();

        expect(textareaInput.value).toBe('alterando conteudo dessa tarefa')
    });

})