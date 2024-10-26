import { OrderStatus } from "@/constants/statuses";

export interface Filters {
  status?: OrderStatus
  from?: Date
  to?: Date
  search?: string
}