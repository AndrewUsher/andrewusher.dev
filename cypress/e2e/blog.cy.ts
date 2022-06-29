describe('blog posts lists', () => {
  before(() => {
    cy.visit('/blog')
  })

  it('elements for single blog post displays', () => {
    cy.findByText('NPM Needs: snarkdown').should('exist')
    cy.findByText('Published on April 10, 2022')
      .should('exist')
      .should('have.attr', 'datetime')
  })

  it('navigating to blog post works as expected', () => {
    cy.findByText('NPM Needs: snarkdown').scrollIntoView().click()
    cy.url().should('include', '/blog/npm-needs-snarkdown')
  })
})
