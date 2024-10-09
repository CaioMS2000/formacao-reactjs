import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { ArrowRight, Search, X } from 'lucide-react'
import { OrderDetails } from './order-details'
import { OrderStatus } from '@/components/order-status'
import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelOrder } from '@/api/cancel-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { approveOrder } from '@/api/approve-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { deliverOrder } from '@/api/deliver-order'

export interface OrderTableRowProps {
    order: {
        orderId: string
        createdAt: string
        customerName: string
        total: number
        status:
            | 'pending'
            | 'canceled'
            | 'processing'
            | 'delivering'
            | 'delivered'
    }
}

export default function OrderTableRow({ order }: OrderTableRowProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const queryClient = useQueryClient()

    function updateOrderStatusInCache(orderId: string, status: OrderStatus) {
        const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
            queryKey: ['orders'],
            // exact: false
        })

        ordersListCache.forEach(([cacheKey, cacheData]) => {
            if (cacheData) {
                queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
                    ...cacheData,
                    orders: cacheData.orders.map(order => {
                        if (order.orderId === orderId) {
                            return {
                                ...order,
                                status,
                            }
                        }

                        return order
                    }),
                })
            }
        })
    }

    const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
        useMutation({
            mutationFn: approveOrder,
            onSuccess: async (_, { orderId }) => {
                updateOrderStatusInCache(orderId, 'processing')
            },
        })

    const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
        useMutation({
            mutationFn: cancelOrder,
            onSuccess: async (_, { orderId }) => {
                updateOrderStatusInCache(orderId, 'canceled')
            },
        })

    const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
        useMutation({
            mutationFn: dispatchOrder,
            onSuccess: async (_, { orderId }) => {
                updateOrderStatusInCache(orderId, 'delivering')
            },
        })

    const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
        useMutation({
            mutationFn: deliverOrder,
            onSuccess: async (_, { orderId }) => {
                updateOrderStatusInCache(orderId, 'delivered')
            },
        })

    return (
        <>
            <TableRow>
                <TableCell>
                    <Dialog
                        open={isDetailsOpen}
                        onOpenChange={setIsDetailsOpen}
                    >
                        <DialogTrigger asChild>
                            <Button variant={'outline'} size={'xs'}>
                                <Search className="h-3 w-3" />
                                <span className="sr-only">
                                    Detalhes do pedido
                                </span>
                            </Button>
                        </DialogTrigger>
                        <OrderDetails
                            orderId={order.orderId}
                            open={isDetailsOpen}
                        />
                    </Dialog>
                </TableCell>
                <TableCell className="font-mono text-xs font-medium">
                    {order.orderId}
                </TableCell>
                <TableCell>
                    {formatDistanceToNow(order.createdAt, {
                        locale: ptBR,
                        addSuffix: true,
                    })}
                </TableCell>
                <TableCell>
                    <OrderStatus status={order.status} />
                </TableCell>
                <TableCell className="font-medium">
                    {order.customerName}
                </TableCell>
                <TableCell className="font-medium">
                    {(order.total / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    })}
                </TableCell>
                <TableCell>
                    {order.status === 'pending' && (
                        <Button disabled={isApprovingOrder} onClick={() => approveOrderFn({orderId: order.orderId})} variant={'outline'} size={'xs'}>
                            <ArrowRight className="mr-2 h-3 w-3" />
                            Aprovar
                        </Button>
                    )}
                    {order.status === 'processing' && (
                        <Button disabled={isDispatchingOrder} onClick={() => dispatchOrderFn({orderId: order.orderId})} variant={'outline'} size={'xs'}>
                            <ArrowRight className="mr-2 h-3 w-3" />
                            Em entrega
                        </Button>
                    )}
                    {order.status === 'delivering' && (
                        <Button disabled={isDeliveringOrder} onClick={() => deliverOrderFn({orderId: order.orderId})} variant={'outline'} size={'xs'}>
                            <ArrowRight className="mr-2 h-3 w-3" />
                            Entregue
                        </Button>
                    )}
                </TableCell>
                <TableCell>
                    <Button
                        onClick={() =>
                            cancelOrderFn({ orderId: order.orderId })
                        }
                        disabled={
                            !['pending', 'processing'].includes(order.status) || isCancelingOrder
                        }
                        variant={'ghost'}
                        size={'xs'}
                    >
                        <X className="mr-2 h-3 w-3" />
                        Cancelar
                    </Button>
                </TableCell>
            </TableRow>
        </>
    )
}
