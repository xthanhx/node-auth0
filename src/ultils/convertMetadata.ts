import { UserDetail } from "@/businesses/user"

const convertMetadata = (data: Partial<UserDetail>) => {
  const dataRequest: any = {}
  if (data.first_name) dataRequest.user_metadata = { first_name: data.first_name }
  if (data.last_name) dataRequest.user_metadata = { ...dataRequest.user_metadata, last_name: data.last_name }
  if (data.scopes) dataRequest.app_metadata = { ...dataRequest.app_metadata, scopes: data.scopes }
  if (data.roles) dataRequest.app_metadata = { ...dataRequest.app_metadata, roles: data.roles }

  return dataRequest
}

export default convertMetadata;