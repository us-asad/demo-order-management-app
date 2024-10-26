import { Customer, Order, ProductDetails } from "@/types/order";
import { DefaultSuccessResponse } from "../types";
import { OrderStatus } from "@/constants/statuses";
import { SortOrderType } from "@/types/defaults";

export interface GetOrdersRequest {
  params: {
    page?: number
    limit?: number
    status?: OrderStatus
    from?: string
    to?: string
    search?: string
    sort?: SortOrderType
  }
}
export interface GetOrdersResponse extends DefaultSuccessResponse {
  data: {
    orders: Order[]
    limit: number
    page: number
    total: number
    totalPages: number
  }
}

export interface GetOrderRequest {
  id: number
}
export interface GetOrderResponse extends DefaultSuccessResponse {
  data: Order
}

export interface CreateOrderRequestBody {
  customer: Customer
  status: OrderStatus
  note?: string
  productDetails: ProductDetails
}
export interface CreateOrderRequest {
  body: CreateOrderRequestBody
}
export interface CreateOrderResponse extends DefaultSuccessResponse {}

export interface UpdateOrderRequestBody {
  customer?: Customer
  status?: OrderStatus
  note?: string
  productDetails?: ProductDetails
  orderedAt?: string
}
export interface UpdateOrderRequest {
  id: number 
  body: UpdateOrderRequestBody
}
export interface UpdateOrderResponse extends DefaultSuccessResponse {}

export interface DeleteOrderRequest {
  id: number
}
export interface DeleteOrderResponse extends DefaultSuccessResponse {}