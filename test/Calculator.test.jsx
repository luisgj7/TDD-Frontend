import { afterEach, beforeEach, describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Calculator, operations } from "../src/calculator/Calculator";


describe('calculator', () => {
    let user;

    beforeEach(() => {
        user = userEvent.setup();
    });

    afterEach(cleanup);

    it('should render Calculator', () => {
        render(<Calculator/>);
    });

    it('should render title correctly', () => {
        render(<Calculator/>);
        screen.getByText('Calculator');
    });

    it('should render 4 rows', () => {
        render(<Calculator/>);
        const rows = screen.getAllByRole('row');
        expect(rows.length).toBe(4);
    });

    it('should render operations', () => {
        render(<Calculator/>);
        operations.forEach((operation, index) => {
            screen.getByText(operation);
        });
    });

    it('should render equal sign', () => {
        render(<Calculator/>);
        screen.getByText('=');
    });

    it('should render an input', () => {
        render(<Calculator/>);
        screen.getByRole('textbox');
    });

    it('should user input after clicking a number', async () => {
        render(<Calculator/>);

        await user.click(screen.getByRole('button', { name: 'digit 1' }));

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('1');
    });

    it('should user input after clicking a several numbers', async () => {
        render(<Calculator/>);

        await user.click(screen.getByRole('button', { name: 'digit 1' }));
        await user.click(screen.getByRole('button', { name: 'digit 2' }));
        await user.click(screen.getByRole('button', { name: 'digit 3' }));


        const input = screen.getByRole('textbox');
        expect(input.value).toBe('123');
    });

    it('should user input after clicking numbers and operations', async () => {
        render(<Calculator/>);

        await user.click(screen.getByRole('button', { name: 'digit 1' }));
        await user.click(screen.getByRole('button', { name: 'operator +' }));
        await user.click(screen.getByRole('button', { name: 'digit 1' }));

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('1+1');
    });

    it('should calculate based on user input and show the calc result', async () => {
        render(<Calculator/>);

        await user.click(screen.getByRole('button', { name: 'digit 1' }));
        await user.click(screen.getByRole('button', { name: 'operator +' }));
        await user.click(screen.getByRole('button', { name: 'digit 1' }));
        await user.click(screen.getByRole('button', { name: 'equals' }));

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('2');
    });

    it('should clear error when clicking a number after an error', async () => {
        render(<Calculator />);

        await user.click(screen.getByRole('button', { name: 'operator +' }));
        await user.click(screen.getByRole('button', { name: 'equals' }));
        expect(screen.getByRole('textbox').value).toBe('Invalid expression');

        await user.click(screen.getByRole('button', { name: 'digit 1' }));
        expect(screen.getByRole('textbox').value).toBe('1');
    });

    it('should clear error when clicking AC', async () => {
        render(<Calculator />);

        await user.click(screen.getByRole('button', { name: 'operator +' }));
        await user.click(screen.getByRole('button', { name: 'equals' }));
        expect(screen.getByRole('textbox').value).toBe('Invalid expression');

        await user.click(screen.getByRole('button', { name: 'clear all' }));
        expect(screen.getByRole('textbox').value).toBe('');
    });

    it('should clear error when clicking DEL', async () => {
        render(<Calculator />);

        await user.click(screen.getByRole('button', { name: 'operator +' }));
        await user.click(screen.getByRole('button', { name: 'equals' }));
        expect(screen.getByRole('textbox').value).toBe('Invalid expression');

        await user.click(screen.getByRole('button', { name: 'delete' }));
        expect(screen.getByRole('textbox').value).toBe('');
    });

    it('should show error on invalid expression', async () => {
        render(<Calculator />);

        await user.click(screen.getByRole('button', { name: 'digit 1' }));
        await user.click(screen.getByRole('button', { name: 'operator /' }));
        await user.click(screen.getByRole('button', { name: 'operator /' })); // inválido
        await user.click(screen.getByRole('button', { name: 'equals' }));

        expect(screen.getByRole('textbox').value).toBe('Invalid expression');
    });

    it('should not change value when equals is pressed with empty input', async () => {
        render(<Calculator />);
        await user.click(screen.getByRole('button', { name: 'equals' }));
        expect(screen.getByRole('textbox').value).toBe('');
    });
});