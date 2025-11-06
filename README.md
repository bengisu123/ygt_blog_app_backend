# Blog App API (Rails 8)

## Kurulum ve Çalıştırma

Terminalde proje klasöründe aşağıdaki adımları izleyin:

```bash
bundle install
rails db:migrate
rails db:seed
rails s
```

## API Endpoints (v1)

- POST `/api/v1/register` — Yeni kullanıcı kaydı (JSON body: name, email, password, password_confirmation)
- POST `/api/v1/login` — JWT üretimi (JSON body: email, password)
- CRUD `/api/v1/posts` — Authorization: `Bearer <JWT>`

İzin verilen CORS originleri: `http://localhost:3000`, `http://localhost:3001`.

Seed kullanıcı bilgisi:

- name: `Nisanur Akgül`
- email: `nisanurakgull123@gmail.com`
- password: `123456`
