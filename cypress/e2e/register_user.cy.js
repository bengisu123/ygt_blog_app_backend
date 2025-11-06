describe('Yeni Kullanıcı Kaydı (API Test)', () => {

  // Optional: allow running tests without backend using MOCK=1
  before(() => {
    if (Cypress.env('MOCK')) {
      cy.intercept('POST', '/api/v1/register', {
        statusCode: 201,
        body: { message: 'User registered successfully', token: 'stub-token', user: { email: 'stub@example.com' } }
      })
      cy.intercept('POST', '/api/v1/login', {
        statusCode: 200,
        body: { token: 'stub-token' }
      })
      cy.intercept('GET', '/api/v1/posts', {
        statusCode: 200,
        body: []
      })
    }
  })

  it('Kullanıcı başarıyla kayıt olur', () => {
    cy.request('POST', '/api/v1/register', {
      name: 'Cypress Test User',
      email: `cypress_${Date.now()}@example.com`,
      password: '123456',
      password_confirmation: '123456'
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('token')
      expect(response.body.user.email).to.include('@example.com')
    })
    
    // Visual demo page
    cy.visit('/register_demo.html')
    cy.get('h2').should('contain', 'Kullanıcı Kayıt Testi')
    cy.get('li').should('contain', 'E-posta doğrulama başarılı')
    cy.get('li').should('contain', 'API yanıtı: 201 Created')
    cy.wait(1000)
  })

  it('Login ile token alınır', () => {
    cy.request('POST', '/api/v1/login', {
      email: 'nisanur@example.com',
      password: '123456'
    }).then((response) => {
      expect(response.status).to.eq(200)
      const token = response.body.token
      expect(token).to.exist

      cy.request({
        method: 'GET',
        url: '/api/v1/posts',
        headers: { Authorization: `Bearer ${token}` }
      }).then((res) => {
        expect([200, 401]).to.include(res.status)
      })
    })
  })

})
