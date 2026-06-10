export interface Notification {
    id: number;
    type: 'success' | 'warning' | 'danger';
    message: string;
    canClose?: boolean;
}