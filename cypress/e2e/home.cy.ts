describe('home.cy.ts', () => {
  before(() => cy.visit('/'))

  it('recent projects section exists ', () => {
    cy.findByText('Recent Projects').should('exist')
  })

  it('recent posts section exists ', () => {
    cy.findByText('Recent Blog Posts').should('exist')
  })

  it('buy me a coffee button exists', () => {
    cy.findByAltText('Buy Me A Coffee').should('exist')
  })
})
