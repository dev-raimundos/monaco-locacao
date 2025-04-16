import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import VehicleGallery from "@/components/monaco-vehicle-gallery";
import CarouselImageManager from '@/components/ui/CarouselImageManager';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Painel de Gerenciamento',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                    <CarouselImageManager />
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                    <VehicleGallery />
                </div>
            </div>
        </AppLayout>

    );
}
