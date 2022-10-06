describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });
  it("should open home page", () => {
    cy.contains("МБОУ АЛГОСОШ");
  });
});
