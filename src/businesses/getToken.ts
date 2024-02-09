import request from "@/ultils/request";

interface AuthToken {
  access_token: string
  token_type: string
  expires_in: number
}

let token = ''

const fetchToken = async () => {
  const [data, err] = await request<AuthToken>({
    method: 'POST',
    url: `/oauth/token`,
    data: {
      "client_id": process.env.CLIENT_ID,
      "client_secret": process.env.SECRET,
      "audience": `${process.env.ISSUER_BASE_URL}/api/v2/`,
      "grant_type": "client_credentials"
    }
  })

  // if (err) console.log(err)
  token = data.access_token
  return token
}

export const getToken = async () => {
  if (token) return token;
  return await fetchToken()
}