import { api } from '@/lib/axios'

export interface RegisterRestaurantBody {
    email: string
    restaurantName: string
    phone: string
    managerName: string
}

export async function registerRestaurant({
    email,
    restaurantName,
    phone,
    managerName,
}: RegisterRestaurantBody) {
    await api.post('/restaurants', {
        email,
        restaurantName,
        phone,
        managerName,
    })
}
