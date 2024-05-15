export default async function handler(req, res) {
  const {token} = req.body

  const human = await validateHuman(token)

  if (!human) {
    res.status(400)
    res.json({verify: false, errors: `Please, you're not human!`})
    return
  } else {
    res.status(200)
    res.json({verify: true, message: 'verify, success!'})
    return
  }
}

async function validateHuman(token) {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`

  const response = await fetch(url, {
    method: 'POST',
  })
  const data = await response.json()

  return data.success
}
