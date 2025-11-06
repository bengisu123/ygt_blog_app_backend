describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:3000/spec_demo.html')
    cy.get('h1').should('contain', 'Genel Cypress Testleri')
    cy.get('.item.pass').should('contain', 'Veritabanı bağlantısı OK')
    cy.get('.item.pass').should('contain', 'Seed verisi yüklendi')
    cy.get('.item.fail').should('contain', 'API /comments testinde gecikme')
    cy.wait(1000)
  })
})
