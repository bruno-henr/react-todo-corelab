import "@testing-library/jest-dom"
import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "../../App";

describe("App", () => {
    test("should be able to see a save notes button", () => {
        const { getByText } = render(<App />);
        const buttonSaveNote = getByText('Salvar nota')
        expect(buttonSaveNote).toBeInTheDocument();
    });

    test("it should be possible to see a space for favorite tasks", () => {
        const { getByText } = render(<App />);
        const spaceForFavoriteTasksText = getByText('Favoritos')
        expect(spaceForFavoriteTasksText).toBeInTheDocument();
    });

    test("it should be possible to see a space for other favorite tasks", () => {
        const { getByText } = render(<App />);
        const spaceForOtherTasksText = getByText('Outras tarefas')
        expect(spaceForOtherTasksText).toBeInTheDocument();
    })
})