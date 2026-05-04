const LOX_API = 'https://lox-core-api.onrender.com/api/execute'

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const upstream = await fetch(LOX_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: event.body,
    })

    const text = await upstream.text()
    return {
      statusCode: upstream.status,
      headers: { 'Content-Type': 'application/json' },
      body: text,
    }
  } catch (err) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'upstream_error', message: err.message }),
    }
  }
}
