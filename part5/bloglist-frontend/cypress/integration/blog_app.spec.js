const { getByAltText } = require('@testing-library/react')
const { create } = require('../../src/services/blogs')
const { login } = require('../../src/services/login')

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Riikka K.',
      username: 'RJK',
      password: 'salane'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })


  it('front page can be opened and page contains login-form', function() {
    cy.contains('Log in')
    cy.contains('Username')
    cy.contains('Password')

  })

  it('login succeeds with right creds', function() {
    cy.get('#username').type('RJK')
    cy.get('#password').type('salane')
    cy.get('button').click()

    cy.contains('Riikka K. is logged in')
  })

  it('login fails with wrong creds', function() {
    cy.get('#username').type('Joku muu')
    cy.get('#password').type('eiloydy')
    cy.get('button').click()

    cy.contains('Wrong username or password')
    cy.get('#error').should('have.css', 'color', 'rgb(255, 0, 0)')
  })
})

describe('When logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset/')
    cy.visit('http://localhost:3000')

    const user = {
      name: 'Riikka K.',
      username: 'RJK',
      password: 'salane'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.login({ username: 'RJK', password: 'salane' })
  })

  it('A blog can be created', function() {
    cy.create({
      title: 'Cypress is nice for testing apps',
      author: 'C. Y. Press',
      url: 'www.cypressian.com'
    })

    cy.get('#blogDef').should('contain', 'Cypress is nice for testing apps')
  })

  it('a blog can be liked', function() {
    cy.create({
      title: 'Cypress is nice for testing apps',
      author: 'C. Y. Press',
      url: 'www.cypressian.com'
    })
    cy.get('#show').click()
    cy.get('#like').click()
    cy.get('#blog').contains('Likes: 1')
  })

  it('a blog can be deleted by the user who created it', function() {
    cy.create({
      title: 'Cypress is nice for testing apps',
      author: 'C. Y. Press',
      url: 'www.cypressian.com'
    })

    cy.create({
      title: 'Cypress is pretty fast',
      author: 'C. Y. Press',
      url: 'www.cypressian.com'
    })

    cy.wait(3000)
    cy.get('#show:first').click()
    cy.get('#delete').click()
    cy.get('div:first').should('not.contain', 'Cypress is nice for testing apps')
  })

  it('a blog cannot be deleted by someone else than the user who created it', function() {

    const user2 = {
      name: 'Riikka Toinen',
      username: 'RiJuK',
      password: 'salasempi'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

    cy.create({
      title: 'Cypress is nice for testing apps',
      author: 'C. Y. Press',
      url: 'www.cypressian.com'
    })

    cy.wait(1000)
    cy.contains('Log out').click()

    cy.get('#username').type('RiJuK')
    cy.get('#password').type('salasempi')
    cy.get('button').click()

    cy.wait(3000)
    cy.get('#show:first').click()
    cy.get('#blog').should('not.contain', '#delete')
  })

  it.only('blogs are sorted by likes, most likes at the top', function() {
    cy.create({
      title: 'Cypress is nice for testing apps',
      author: 'C. Y. Press',
      url: 'www.cypressian.com'
    })
    cy.create({
      title: 'Cypress 2',
      author: 'C. Y. Press',
      url: 'www.cypressian.com'
    })
    cy.create({
      title: 'Cypress 3',
      author: 'C. Y. Press',
      url: 'www.cypressian.com'
    })

    cy.contains('Cypress 3').parent().find('#like').click()
    cy.wait(1000)
    cy.contains('Cypress 3').parent().find('#like').click()
    cy.wait(1000)
    cy.contains('Cypress 2').parent().find('#like').click()
    cy.wait(1000)
    cy.contains('Cypress 2').parent().find('#like').click()
    cy.wait(1000)
    cy.contains('Cypress 2').parent().find('#like').click()
    cy.wait(1000)
    cy.reload()
    cy.wait(3000)

    //Cypress 2: 3 likes, Cypress 3: 2 likes, Cypress is..: 0 likes  
    cy.get('#blogslist').then( blog => {
        cy.wrap(blog[0]).contains('Cypress 2')
        cy.wrap(blog[1]).contains('Cypress 3')
        cy.wrap(blog[2]).contains('Cypress is')
      })

  })
})