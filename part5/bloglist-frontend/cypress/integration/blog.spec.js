describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'root',
      password: '55555',
    });
    cy.visit('http://localhost:3000/');
  });

  it('login form can be openend ', function () {
    cy.contains('login').click();
  });

  describe('login', function () {
    it('successfull login if correct credentials', function () {
      cy.contains('login').click();
      cy.get('input:first').type('root');
      cy.get('input:last').type('55555');
      cy.get('#loginButton').click();
      cy.get('.success');
    });

    it('Failed login if wrong credentials', function () {
      cy.contains('login').click();
      cy.get('input:first').type('root');
      cy.get('input:last').type('444214');
      cy.get('#loginButton').click();
      cy.get('.error');
    });
  });

  describe('when logged in', () => {
    beforeEach(function () {
      cy.login({ username: 'root', password: '55555' });
    });
    it('Blog can be created', function () {
      cy.contains('Add new Blog').click();
      cy.get('[name="title"]').type('added with cypress');
      cy.get('[name="author"]').type('author');
      cy.get('[name="url"]').type('url');
      cy.contains('submit').click();
      cy.get('.success');
      cy.contains('added with cypress');
    });

    describe('Operations on blogs', () => {
      beforeEach(function () {
        cy.fill({
          title: 'Title 1',
          author: 'Author 1',
          url: 'Url 1',
          likes: '9',
        });
        cy.fill({
          title: 'Title 2',
          author: 'Author 2',
          url: 'Url 2',
          likes: '15',
        });
        cy.fill({
          title: 'Title 3',
          author: 'Author 3',
          url: 'Url 3',
          likes: '5',
        });
      });

      it('Blog can be liked', function () {
        cy.contains('Title 1').parent().contains('View').click();
        cy.contains('like').click();
        cy.contains('Likes:1');
      });
      it('Blog can be deleted', function () {
        cy.contains('Title 2').parent().contains('View').click();
        cy.contains('Delete').click();
        cy.get('.success');
      });
      it('Blogs are sorted', function () {
        cy.get('.blog').parent().find('button').click({ multiple: true });
        cy.get('.likes').then((likes) => {
          let likesArray = [];
          const isSorted = (array) => {
            let sorted = true;
            for (let i = 0; i < array.length - 1; i++) {
              if (array[i] < array[i + 1]) {
                sorted = false;
                break;
              }
            }
            return sorted;
          };
          for (const like of likes) {
            likesArray.push(
              parseInt(like.innerHTML.slice(6, likes[0].innerHTML.search('<')))
            );
          }
          expect(isSorted(likesArray)).equal(true);
        });
      });
    });
  });
});
