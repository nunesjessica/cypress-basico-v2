/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', () => {
        cy.title()
        .should('be.equal', 'Central de Atendimento ao Cliente TAT');
  
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,'+
        ' by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there'+
        'isn\'t anything embarrassing hidden in the middle of text.'
        
        cy.get('[id="firstName"]').type('Jessica')
        cy.get('[id="lastName"]').type('Nunes')
        cy.get('[id="email"]').type('nunes@email.com')
        cy.get('[id="open-text-area"]').type(longText, { delay:0 })
        cy.get('button[type="submit"]').click()
        
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação invalida', () => {
        cy.get('[id="firstName"]').type('Jessica')
        cy.get('[id="lastName"]').type('Nunes')
        cy.get('[id="email"]').type('nunes')
        cy.get('[id="open-text-area"]').type('Texto', { delay:0 })
        cy.get('button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')
    })

    it('campo de telefone deve aceitar apenas numeros', () => {
        cy.get('#phone').type('letras')

        .should('not.have.value')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('[id="firstName"]').type('Jessica')
        cy.get('[id="lastName"]').type('Nunes')
        cy.get('[id="email"]').type('nunes@email.com')
        cy.get('[id="open-text-area"]').type('Texto', { delay:0 })
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('[id="firstName"]').type('Jessica').should('have.value', 'Jessica')
        .clear().should('have.value', '')
        cy.get('[id="lastName"]').type('Nunes').should('have.value', 'Nunes')
        .clear().should('have.value', '')
        cy.get('[id="email"]').type('nunes@email.com').should('have.value', 'nunes@email.com')
        .clear().should('not.have.value')
        cy.get('#phone').type('99998888').should('have.value', '99998888')
        .clear().should('not.have.value')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click()
        
        cy.get('.error').should('be.visible')
    })
  })