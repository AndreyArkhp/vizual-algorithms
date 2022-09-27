describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.viewport(1024, 768);
    cy.visit("/"); // change URL to match your dev URL
  });
});
