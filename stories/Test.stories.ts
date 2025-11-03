import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within, userEvent, waitFor } from '@storybook/test';
import TestComponent from '../app/Test/page.tsx';

const meta = {
    title: 'Components/TestComponent',
    component: TestComponent,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TestComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByText('Test Component')).toBeInTheDocument();
        await expect(canvas.getByText('A simple component for testing purposes')).toBeInTheDocument();
        await expect(canvas.getByPlaceholderText('test@example.com')).toBeInTheDocument();
        await expect(canvas.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
        await expect(canvas.getByRole('button', { name: /save/i })).toBeInTheDocument();
        await expect(canvas.getByRole('switch', { name: /email notifications/i })).toBeInTheDocument();
        await expect(canvas.queryByText('Notifications Enabled')).not.toBeInTheDocument();
    },
};

export const EmailInput: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        const emailInput = canvas.getByPlaceholderText('test@example.com');
        await user.type(emailInput, 'user@example.com');
        await expect(emailInput).toHaveValue('user@example.com');
    },
};

export const NotificationsEnabled: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        const notificationSwitch = canvas.getByRole('switch', { name: /email notifications/i });

        await expect(canvas.queryByText('Notifications Enabled')).not.toBeInTheDocument();
        await user.click(notificationSwitch);

        await waitFor(() => {
            expect(canvas.getByText('Notifications Enabled')).toBeInTheDocument();
        });

        await expect(notificationSwitch).toBeChecked();
    },
};

export const NotificationsToggle: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        const notificationSwitch = canvas.getByRole('switch', { name: /email notifications/i });

        await user.click(notificationSwitch);

        await waitFor(() => {
            expect(canvas.getByText('Notifications Enabled')).toBeInTheDocument();
        });

        await user.click(notificationSwitch);

        await waitFor(() => {
            expect(canvas.queryByText('Notifications Enabled')).not.toBeInTheDocument();
        });

        await expect(notificationSwitch).not.toBeChecked();
    },
};

export const ButtonInteractions: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        const cancelButton = canvas.getByRole('button', { name: /cancel/i });
        const saveButton = canvas.getByRole('button', { name: /save/i });

        await user.click(cancelButton);
        await expect(cancelButton).toBeInTheDocument();

        await user.click(saveButton);
        await expect(saveButton).toBeInTheDocument();
    },
};

export const CompleteUserFlow: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        const emailInput = canvas.getByPlaceholderText('test@example.com');
        await user.type(emailInput, 'complete@test.com');
        await expect(emailInput).toHaveValue('complete@test.com');

        const notificationSwitch = canvas.getByRole('switch', { name: /email notifications/i });
        await user.click(notificationSwitch);

        await waitFor(() => {
            expect(canvas.getByText('Notifications Enabled')).toBeInTheDocument();
        });

        const saveButton = canvas.getByRole('button', { name: /save/i });
        await user.click(saveButton);

        await expect(emailInput).toHaveValue('complete@test.com');
        await expect(notificationSwitch).toBeChecked();
    },
};

export const AccessibilityLabels: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const emailInput = canvas.getByLabelText('Email');
        await expect(emailInput).toBeInTheDocument();

        const notificationSwitch = canvas.getByRole('switch', { name: /email notifications/i });
        await expect(notificationSwitch).toBeInTheDocument();

        await expect(emailInput).toHaveAttribute('type', 'email');
    },
};

export const KeyboardNavigation: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        const emailInput = canvas.getByPlaceholderText('test@example.com');
        // @ts-ignore
        emailInput.focus();
        await expect(emailInput).toHaveFocus();

        await user.keyboard('keyboard@test.com');
        await expect(emailInput).toHaveValue('keyboard@test.com');

        await user.tab();
        const notificationSwitch = canvas.getByRole('switch', { name: /email notifications/i });
        await expect(notificationSwitch).toHaveFocus();

        await user.keyboard(' ');
        await waitFor(() => {
            expect(canvas.getByText('Notifications Enabled')).toBeInTheDocument();
        });
    },
};

export const WithPrefilledEmail: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        const emailInput = canvas.getByPlaceholderText('test@example.com');
        await user.type(emailInput, 'prefilled@example.com');

        await expect(emailInput).toHaveValue('prefilled@example.com');
    },
};

export const EmptyForm: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        const emailInput = canvas.getByPlaceholderText('test@example.com');
        await expect(emailInput).toHaveValue('');

        const notificationSwitch = canvas.getByRole('switch', { name: /email notifications/i });
        await expect(notificationSwitch).not.toBeChecked();

        const saveButton = canvas.getByRole('button', { name: /save/i });
        await user.click(saveButton);

        await expect(emailInput).toHaveValue('');
    },
};

export const MobileView: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByText('Test Component')).toBeInTheDocument();
        await expect(canvas.getByPlaceholderText('test@example.com')).toBeInTheDocument();
        await expect(canvas.getByRole('switch', { name: /email notifications/i })).toBeInTheDocument();
    },
};

export const TabletView: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'tablet',
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByText('Test Component')).toBeInTheDocument();
        await expect(canvas.getByPlaceholderText('test@example.com')).toBeInTheDocument();
    },
};

export const LongEmailAddress: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        const emailInput = canvas.getByPlaceholderText('test@example.com');
        const longEmail = 'verylongemailaddress.with.many.dots@subdomain.example.com';

        await user.type(emailInput, longEmail);
        await expect(emailInput).toHaveValue(longEmail);
    },
};

export const RapidToggling: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        const notificationSwitch = canvas.getByRole('switch', { name: /email notifications/i });

        await user.click(notificationSwitch);
        await user.click(notificationSwitch);
        await user.click(notificationSwitch);

        await waitFor(() => {
            expect(canvas.getByText('Notifications Enabled')).toBeInTheDocument();
        });
    },
};

export const HoverStates: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const user = userEvent.setup();

        const saveButton = canvas.getByRole('button', { name: /save/i });

        await user.hover(saveButton);
        await expect(saveButton).toBeInTheDocument();
    },
};

export const FocusStates: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const emailInput = canvas.getByPlaceholderText('test@example.com');

        // @ts-ignore
        emailInput.focus();
        await expect(emailInput).toHaveFocus();
    },
};

export const DarkMode: Story = {
    parameters: {
        backgrounds: { default: 'dark' },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByText('Test Component')).toBeInTheDocument();
    },
};