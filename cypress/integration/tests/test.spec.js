/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

const baseUrl = "http://localhost:3000";

import 'cypress-file-upload';
describe('Image Processing API', () => {
  beforeEach(() => {
    cy.visit(baseUrl); // assuming the code is hosted on localhost:3000
  });

  it('uploads a file using the upload() method', () => {
    const fileContent = 'data:text/plain;base64,' + btoa('Hello, World!');
    const fileName = 'test.txt';
    const mimeType = 'text/plain';

    cy.get('input[type=file]').then(subject => {
    const el = subject[0];
    const testFile = new File([fileContent], 'test-image.jpg', { type: mimeType });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(testFile);
    el.files = dataTransfer.files;

    cy.wrap(subject).trigger('change', { force: true });
    });

  
  })})