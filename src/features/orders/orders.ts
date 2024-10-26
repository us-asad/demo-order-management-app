import {EndpointNameOrders} from '@/constants/endpoints'
import {baseApi} from '..'
import { CreateOrderRequest, CreateOrderResponse, DeleteOrderRequest, DeleteOrderResponse, GetOrderRequest, GetOrderResponse, GetOrdersRequest, GetOrdersResponse, UpdateOrderRequest, UpdateOrderResponse } from './types'
import { RTKTags } from '@/constants/rtk-tags'

export const OrdersExtendedEndpoints = baseApi.injectEndpoints({
  endpoints: build => ({
    getOrders: build.query<GetOrdersResponse, GetOrdersRequest>({
      query: ({params}) => ({
        url: EndpointNameOrders.ORDERS,
        method: 'GET',
        params,
      }),
      providesTags: [RTKTags.ORDER]
    }),

    getOrder: build.query<GetOrderResponse, GetOrderRequest>({
      query: ({id}) => ({
        url: EndpointNameOrders.ORDER + id,
        method: 'GET',
      }),
      providesTags: [RTKTags.ORDER]
    }),

    createOrder: build.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: ({body}) => ({
        url: EndpointNameOrders.ORDER,
        method: 'POST',
        body
      }),
      invalidatesTags: [RTKTags.ORDER]
    }),

    updateOrder: build.mutation<UpdateOrderResponse, UpdateOrderRequest>({
      query: ({id, body}) => ({
        url: EndpointNameOrders.ORDER + id,
        method: 'PUT',
        body
      }),
      invalidatesTags: [RTKTags.ORDER]
    }),

    deleteOrder: build.mutation<DeleteOrderResponse, DeleteOrderRequest>({
      query: ({id}) => ({
        url: EndpointNameOrders.ORDER + id,
        method: 'DELETE',
      }),
      invalidatesTags: [RTKTags.ORDER]
    }),
  }),
})

export const {useLazyGetOrdersQuery, useGetOrderQuery, useCreateOrderMutation, useUpdateOrderMutation, useDeleteOrderMutation} = OrdersExtendedEndpoints
