type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    
};

export function Modal({ open, onClose, children, size = 'xl' }: ModalProps) {
    if (!open) return null;

    const sizeClasses = {
        sm: 'w-105',
        md: 'w-150',
        lg: 'w-225',
        xl: 'w-300',
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* content */}
            <div className={`relative bg-white rounded-lg shadow-xl ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}>
                {children}
            </div>
        </div>
    );
}