export default function convertUserAuthToUser (data: any) {
  return {
    email: data?.email ?? '',
    first_name: data?.user_metadata?.first_name ?? '',
    last_name: data?.user_metadata?.last_name ?? '',
    roles: data?.app_metadata?.roles as string[] ?? [],
    scopes: data?.app_metadata?.scopes as string[] ?? [],
  }
}