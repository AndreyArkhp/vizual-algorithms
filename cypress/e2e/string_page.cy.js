describe("The string page", () => {
  before(() => {
    cy.visit("/recursion");
  });
  it("should button disabled if input is empty", () => {
    cy.get("input").should("have.value", "").get("button").should("be.disabled");
  });
  it("should button enabled if input is not empty", () => {
    cy.get("input").type("qwerty").get("button").should("be.enabled");
  });
  it("should animation work correctly", () => {
    cy.clock();
    cy.get("button[class^='text']").click();
    cy.get("div[class^=circle_content]").then((letters) => {
      cy.wrap(letters.find("div[class*=circle_default]")).should((el) => {
        expect(el).to.have.length(4);
        expect(el.eq(0)).to.contain("W");
        expect(el.eq(1)).to.contain("E");
        expect(el.eq(2)).to.contain("R");
        expect(el.eq(3)).to.contain("T");
      });
      cy.wrap(letters.find("div[class*=circle_changing]")).should((el) => {
        expect(el).to.have.length(2);
        expect(el.eq(0)).to.contain("Q");
        expect(el.eq(1)).to.contain("Y");
      });
      cy.tick(1000);
      cy.get("div[class^=circle_content]").then((letters) => {
        cy.wrap(letters.find("div[class*=circle_default]")).should((el) => {
          expect(el).to.have.length(2);
          expect(el.eq(0)).to.contain("E");
          expect(el.eq(1)).to.contain("R");
        });
        cy.wrap(letters.find("div[class*=circle_changing]")).should((el) => {
          expect(el).to.have.length(2);
          expect(el.eq(0)).to.contain("W");
          expect(el.eq(1)).to.contain("T");
        });
        cy.wrap(letters.find("div[class*=circle_modified]")).should((el) => {
          expect(el).to.have.length(2);
          expect(el.eq(0)).to.contain("Y");
          expect(el.eq(1)).to.contain("Q");
        });
      });
      cy.tick(1000);
      cy.get("div[class^=circle_content]").then((letters) => {
        cy.wrap(letters.find("div[class*=circle_default]")).should((el) => {
          expect(el).to.have.length(0);
        });
        cy.wrap(letters.find("div[class*=circle_changing]")).should((el) => {
          expect(el).to.have.length(2);
          expect(el.eq(0)).to.contain("E");
          expect(el.eq(1)).to.contain("R");
        });
        cy.wrap(letters.find("div[class*=circle_modified]")).should((el) => {
          expect(el).to.have.length(4);
          expect(el.eq(0)).to.contain("Y");
          expect(el.eq(1)).to.contain("T");
          expect(el.eq(2)).to.contain("W");
          expect(el.eq(3)).to.contain("Q");
        });
        cy.tick(1000);
        cy.get("div[class^=circle_content]").then((letters) => {
          cy.wrap(letters.find("div[class*=circle_default]")).should("not.exist");
          cy.wrap(letters.find("div[class*=circle_changing]")).should("not.exist");
          cy.wrap(letters.find("div[class*=circle_modified]")).should((el) => {
            expect(el).to.have.length(6);
            expect(el.eq(0)).to.contain("Y");
            expect(el.eq(1)).to.contain("T");
            expect(el.eq(2)).to.contain("R");
            expect(el.eq(3)).to.contain("E");
            expect(el.eq(4)).to.contain("W");
            expect(el.eq(5)).to.contain("Q");
          });
        });
      });
    });
  });
});
