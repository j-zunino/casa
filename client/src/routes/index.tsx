import { createFileRoute } from '@tanstack/react-router';

const Index = () => {
    return <div></div>;
};

export const Route = createFileRoute('/')({
    component: Index,
});
