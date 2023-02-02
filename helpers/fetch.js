function handleResponse(response) {
  let contentType = response.headers.get('content-type')
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response)
  } else if (contentType.includes('text/html')) {
    return handleTextResponse(response)
  } else {
    throw new Error(`Sorry, content-type ${contentType} not supported`)
  }
}

function handleJSONResponse(response) {
  return response.json().then((json) => {
    if (response.ok) {
      return json
    } else {

      if (json.errorCode === 'UNAUTHORIZED_USER') {
        localStorage.removeItem('google_token')
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
      return Promise.reject(
        Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText,
        })
      )
    }
  })
}

function handleTextResponse(response) {
  return response.text().then((text) => {
    if (response.ok) {
      return text
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText,
        err: text,
      })
    }
  })
}

export async function fetchPost(url, body) {
  const baseURL = new URL(process.env.NEXT_PUBLIC_BASE_URL)

  return fetch(new URL(url, baseURL), {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(handleResponse)
}

export async function fetchGet(url) {
  const baseURL = new URL(process.env.NEXT_PUBLIC_BASE_URL)

  return fetch(new URL(url, baseURL), {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  }).then(handleResponse)
}

export async function fetchAuthPost(url, body, method = 'POST') {
  const baseURL = new URL(process.env.NEXT_PUBLIC_BASE_URL)

  return fetch(new URL(url, baseURL), {
    method: method,
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token,
    },
    body: JSON.stringify(body),
  }).then(handleResponse)
}

export async function fetchAuthPostFormData(url, formData, method = 'POST') {
  const baseURL = new URL(process.env.NEXT_PUBLIC_BASE_URL)

  return fetch(new URL(url, baseURL), {
    method: method,
    headers: {
      'x-auth-token': localStorage.token,
    },
    body: formData,
  }).then(handleResponse)
}

export async function fetchAuthGet(url) {
  const baseURL = new URL(process.env.NEXT_PUBLIC_BASE_URL)

  return fetch(new URL(url, baseURL), {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token,
    },
  }).then(handleResponse)
}

export async function fetchOptionalGet(url) {
  const baseURL = new URL(process.env.NEXT_PUBLIC_BASE_URL)
  const headers = {
    'Content-type': 'application/json',
  }

  if (localStorage.token) {
    headers['x-auth-token'] = localStorage.token
  }

  return fetch(new URL(url, baseURL), {
    method: 'GET',
    headers,
  }).then(handleResponse)
}

// chat
export function createChat(body) {
  const baseURL = new URL(process.env.NEXT_PUBLIC_BASE_URL)

  return fetch(new URL('users/chats', baseURL), {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token,
    },
    body: JSON.stringify(body),
  }).then(handleResponse)
}
// read chat
export function readChat() {
  const baseURL = new URL(process.env.NEXT_PUBLIC_BASE_URL)

  return fetch(new URL('users/chats/read', baseURL), {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'x-auth-token': localStorage.token,
    },
  }).then(handleResponse)
}
