import app from '@/main/config/app'

try {
  app.listen(3333, () => {
    console.log('Server is running on 127.0.0.1:3333')
  })
} catch (error) {
  console.log(error)
}
