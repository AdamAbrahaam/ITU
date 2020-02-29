/// <reference types="cypress" />

//test@test.test
//Testtest

context("Log/Reg", () => {
  beforeEach(() => {
    cy.visit("localhost:8080/");
  });

  it("Sign in screen", () => {
    cy.contains("Sign in!");
  });

  it("Sign up screen", () => {
    cy.get("a").click();
    cy.contains("Sign up!");
  });

  it("Login", () => {
    cy.get("#email").type("test@test.test");
    cy.get("#password").type("Testtest");
    cy.get("button").click();

    cy.contains("Welcome back, test");
  });
});
