export type OrderStatus =
    | 'pending'
    | 'canceled'
    | 'processing'
    | 'delivering'
    | 'delivered'

interface OrderStatusProps {
    status: OrderStatus
}

const orderStatusMap: Record<OrderStatus, { label: string; color: string }> = {
    pending: {
        label: 'Pendente',
        color: 'bg-yellow-500',
    },
    canceled: {
        label: 'Cancelado',
        color: 'bg-red-500',
    },
    processing: {
        label: 'Processando',
        color: 'bg-blue-500',
    },
    delivering: {
        label: 'Entregando',
        color: 'bg-blue-500',
    },
    delivered: {
        label: 'Entregue',
        color: 'bg-green-500',
    },
}

export function OrderStatus({status}: OrderStatusProps) {
    return (
        <>
            <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${orderStatusMap[status].color}`}></span>
                <span className="font-medium text-muted-foreground">
                    {orderStatusMap[status].label}
                </span>
            </div>
        </>
    )
}
