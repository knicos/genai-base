import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StageBar from './StageBar';

const items = [
    { id: 'model', label: 'Model', status: 'complete' as const },
    { id: 'data', label: 'Data', status: 'available' as const },
    { id: 'training', label: 'Training', status: 'upcoming' as const },
];

window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('StageBar', () => {
    it('renders items', ({ expect }) => {
        render(
            <StageBar
                ariaLabel="Workflow stages"
                items={items}
                activeId="data"
            />
        );

        expect(screen.getByRole('navigation', { name: 'Workflow stages' })).toBeVisible();
        expect(screen.getByRole('button', { name: /model/i })).toBeVisible();
        expect(screen.getByRole('button', { name: /data/i })).toHaveAttribute('aria-pressed', 'true');
    });

    it('calls onChange when an item is selected', async ({ expect }) => {
        const onChange = vi.fn();

        render(
            <StageBar
                items={items}
                activeId="model"
                onChange={onChange}
            />
        );

        await userEvent.click(screen.getByRole('button', { name: /data/i }));

        expect(onChange).toHaveBeenCalledWith('data', items[1]);
    });

    it('renders items with href as links', async ({ expect }) => {
        const onChange = vi.fn();
        const linkedItem = { ...items[1], href: '#data' };

        render(
            <StageBar
                items={[items[0], linkedItem, items[2]]}
                activeId="model"
                onChange={onChange}
            />
        );

        await userEvent.click(screen.getByRole('link', { name: /data/i }));

        expect(screen.getByRole('link', { name: /data/i })).toHaveAttribute('href', '#data');
        expect(onChange).toHaveBeenCalledWith('data', linkedItem);
    });

    it('can render an optional home button', async ({ expect }) => {
        const onClick = vi.fn();

        render(
            <StageBar
                items={items}
                activeId="model"
                homeButton={{ ariaLabel: 'Home', onClick }}
            />
        );

        await userEvent.click(screen.getByRole('button', { name: /home/i }));

        expect(onClick).toHaveBeenCalledOnce();
    });

    it('shows an item popover on hover', async ({ expect }) => {
        const user = userEvent.setup();

        render(
            <StageBar
                items={[
                    ...items.slice(0, 1),
                    {
                        ...items[1],
                        popover: 'Data stage details',
                    },
                    ...items.slice(2),
                ]}
                activeId="data"
                popoverDelay={0}
            />
        );

        await user.hover(screen.getByRole('button', { name: /data/i }));

        expect(screen.getByText('Data stage details')).toBeVisible();
    });
});
