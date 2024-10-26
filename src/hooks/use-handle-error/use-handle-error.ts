import { extractErrorMsg } from "@/utils/util-functions"
import { useSnackbar } from "notistack"

export const useHandleError = () => {
  const {enqueueSnackbar} = useSnackbar()
  return (error: any) => {
    enqueueSnackbar(extractErrorMsg(error), {
      variant: "error",
    })
  }
}
