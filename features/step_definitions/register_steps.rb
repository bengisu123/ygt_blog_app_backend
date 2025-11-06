Given('API sunucusu çalışıyor') do
  get '/api/v1/posts'
  expect([200, 401]).to include(last_response.status)
end

When('kullanıcı geçerli bilgileri gönderir') do
  payload = {
    name:  "Test Kullanıcısı",
    email: "testuser_#{SecureRandom.hex(4)}@example.com",
    password: "123456",
    password_confirmation: "123456"
  }

  header 'Content-Type', 'application/json'
  post '/api/v1/register', payload.to_json
end

Then('API 201 Created döndürmelidir') do
  expect(last_response.status).to eq(201)
end

