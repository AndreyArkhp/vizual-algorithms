import {isDisabledBtnIfEmptyInput} from "./utils";

describe("The list page", () => {
  before(() => {
    cy.visit("/list");
  });
  beforeEach(() => {
    cy.get("button[class^=text]").as("addBtn");
    cy.clock();
  });
  it("should button disabled if input is empty", function () {
    cy.get("input").each((input) => {
      expect(input).to.have.value("");
    });
    cy.get("button[class^=text").should((btns) => {
      expect(btns.eq(0)).to.be.disabled;
      expect(btns.eq(1)).to.be.disabled;
      expect(btns.eq(2)).to.be.enabled;
      expect(btns.eq(3)).to.be.enabled;
      expect(btns.eq(4)).to.be.disabled;
      expect(btns.eq(5)).to.be.disabled;
    });
  });
  it("shoult be default list", function () {
    cy.get("div[class*=circle_default]")
      .should("not.have.length", 0)
      .find("p[class*=circle_letter]")
      .each((el) => {
        expect(el).to.not.have.text("");
      });
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0).parent()).should("have.css", "display", "none");
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
      cy.wrap(elements.last()).then((el) => {
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(elements.length - 2);
      });
    });
  });
  it("should add a element to head of the list", function () {
    cy.get("input").first().type("qwr");
    cy.get("@addBtn").first().click();
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0)).then((el) => {
        expect(el).to.contain("qwr");
        expect(el.find("div[class*=circle_changing]")).to.have.length(1);
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.not.contain(0);
      });
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el).to.not.contain("qwr");
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
    });
    cy.tick(1000);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0).parent()).should("have.css", "display", "none");
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el).to.contain("qwr");
        expect(el.find("div[class*=circle_changing]")).to.have.length(0);
        expect(el.find("div[class*=circle_modified]")).to.have.length(1);
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
    });
    cy.tick(1000);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0).parent()).should("have.css", "display", "none");
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el).to.contain("qwr");
        expect(el.find("div[class*=circle_changing]")).to.have.length(0);
        expect(el.find("div[class*=circle_modified]")).to.have.length(0);
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
    });
    cy.get("@addBtn").eq(2).click();
    cy.tick(1000);
  });
  it("should add a element to tail of the list", function () {
    cy.get("input").first().type("abc");
    cy.get("@addBtn").eq(1).click();
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0)).then((el) => {
        expect(el).to.contain("abc");
        expect(el.find("div[class*=circle_changing]")).to.have.length(1);
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.not.contain(elements.length - 2);
      });
      cy.wrap(elements.last()).then((el) => {
        expect(el).to.not.contain("abc");
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(elements.length - 2);
      });
    });
    cy.tick(1000);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0).parent()).should("have.css", "display", "none");
      cy.wrap(elements.last()).then((el) => {
        expect(el).to.contain("abc");
        expect(el.find("div[class*=circle_changing]")).to.have.length(0);
        expect(el.find("div[class*=circle_modified]")).to.have.length(1);
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(elements.length - 2);
      });
    });
    cy.tick(1000);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0).parent()).should("have.css", "display", "none");
      cy.wrap(elements.last()).then((el) => {
        expect(el).to.contain("abc");
        expect(el.find("div[class*=circle_changing]")).to.have.length(0);
        expect(el.find("div[class*=circle_modified]")).to.have.length(0);
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(elements.length - 2);
      });
    });
    cy.get("@addBtn").eq(3).click();
    cy.tick(1000);
  });
  it("should add the element at index to the list", function () {
    cy.get("input").then((inputs) => {
      cy.wrap(inputs.first()).type("abc");
      cy.wrap(inputs.last()).type(2);
    });
    cy.get("@addBtn").eq(4).click();
    cy.get("button[class*=button_loader]").should("have.length", 1);
    cy.get("div[class*=circle_content]").then((elements) => {
      expect(elements.find("div[class*=circle_changing]")).to.have.length(1);
      cy.wrap(elements.eq(0)).then((el) => {
        expect(el).to.contain("abc");
        expect(el.find("div[class*=circle_changing]")).to.have.length(1);
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.not.contain(0);
      });
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el).to.not.contain("abc");
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(0, 50, 255)"
        );
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
    });
    cy.tick(1000);
    cy.get("button[class*=button_loader]").should("have.length", 1);
    cy.get("div[class*=circle_content]").then((elements) => {
      expect(elements.find("div[class*=circle_changing]")).to.have.length(2);
      cy.wrap(elements.eq(0)).then((el) => {
        expect(el).to.contain("abc");
        expect(el.find("div[class*=circle_changing]")).to.have.length(1);
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.not.contain(0);
      });
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el).to.not.contain("abc");
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
      cy.wrap(elements.eq(2)).then((el) => {
        expect(el).to.not.contain("abc");
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(0, 50, 255)"
        );
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(1);
      });
    });
    cy.tick(1000);
    cy.get("button[class*=button_loader]").should("have.length", 1);
    cy.get("div[class*=circle_content]").then((elements) => {
      expect(elements.find("div[class*=circle_changing]")).to.have.length(3);
      cy.wrap(elements.eq(0)).then((el) => {
        expect(el).to.contain("abc");
        expect(el.find("div[class*=circle_changing]")).to.have.length(1);
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.not.contain(0);
      });
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el).to.not.contain("abc");
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
      cy.wrap(elements.eq(2)).then((el) => {
        expect(el).to.not.contain("abc");
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(1);
      });
      cy.wrap(elements.eq(3)).then((el) => {
        expect(el).to.not.contain("abc");
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(0, 50, 255)"
        );
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("p[class*=circle_index]")).to.contain(2);
      });
    });
    cy.tick(1000);
    cy.get("button[class*=button_loader]").should("have.length", 0);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0).parent()).should("have.css", "display", "none");
      expect(elements.find("div[class*=circle_changing]")).to.have.length(3);
      expect(elements.find("div[class*=circle_modified]")).to.have.length(1);
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el).to.not.contain("abc");
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
      cy.wrap(elements.eq(2)).then((el) => {
        expect(el).to.not.contain("abc");
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.contain(1);
      });
      cy.wrap(elements.eq(3)).then((el) => {
        expect(el).to.contain("abc");
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(127, 224, 81)"
        );
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("p[class*=circle_index]")).to.contain(2);
      });
      cy.wrap(elements.eq(4)).then((el) => {
        expect(el).to.not.contain("abc");
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(0, 50, 255)"
        );
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("p[class*=circle_index]")).to.contain(3);
      });
    });
    cy.tick(1000);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0).parent()).should("have.css", "display", "none");
      expect(elements.find("div[class*=circle_changing]")).to.have.length(1);
      expect(elements.find("div[class*=circle_modified]")).to.have.length(0);
      expect(elements.find("div[class*=circle_default]")).to.have.length(elements.length - 1);
      cy.wrap(elements.eq(3)).then((el) => {
        expect(el).to.contain("abc");
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("p[class*=circle_index]")).to.contain(2);
      });
    });
  });
  it("should remove a element from head of the list", function () {
    cy.get("@addBtn").eq(2).click();
    cy.get("div[class*=circle_content]").then((elements) => {
      expect(elements.find("div[class*=circle_changing]")).to.have.length(1);
      expect(elements.find("div[class*=circle_modified]")).to.have.length(0);
      expect(elements.find("div[class*=circle_default]")).to.have.length(elements.length - 1);
      cy.wrap(elements.eq(0)).then((el) => {
        expect(el).to.contain(el.text());
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
      });
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el).to.contain("");
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(0, 50, 255)"
        );
      });
    });
    cy.tick(1000);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0).parent()).should("have.css", "display", "none");
      expect(elements.find("div[class*=circle_changing]")).to.have.length(1);
      expect(elements.find("div[class*=circle_modified]")).to.have.length(0);
      expect(elements.find("div[class*=circle_default]")).to.have.length(elements.length - 1);
    });
  });
  it("should remove a element from tail of the list", function () {
    cy.get("@addBtn").eq(3).click();
    cy.get("div[class*=circle_content]").then((elements) => {
      expect(elements.find("div[class*=circle_changing]")).to.have.length(1);
      expect(elements.find("div[class*=circle_modified]")).to.have.length(0);
      expect(elements.find("div[class*=circle_default]")).to.have.length(elements.length - 1);
      cy.wrap(elements.eq(0)).then((el) => {
        expect(el).to.contain(el.text());
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
      });
      cy.wrap(elements.last()).then((el) => {
        expect(el).to.contain("");
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.contain("tail");
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(0, 50, 255)"
        );
      });
    });
    cy.tick(1000);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0).parent()).should("have.css", "display", "none");
      expect(elements.find("div[class*=circle_changing]")).to.have.length(1);
      expect(elements.find("div[class*=circle_modified]")).to.have.length(0);
      expect(elements.find("div[class*=circle_default]")).to.have.length(elements.length - 1);
    });
  });
  it("should remove the element at index from the list", function () {
    cy.get("input").last().type(2);
    cy.get("@addBtn").last().click();
    cy.get("button[class*=button_loader]").should("have.length", 1);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0).parent()).should("have.css", "display", "none");
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
      cy.wrap(elements.eq(2)).then((el) => {
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(0, 50, 255)"
        );
      });
      cy.wrap(elements.eq(3)).then((el) => {
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(0, 50, 255)"
        );
      });
    });
    cy.tick(1000);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0).parent()).should("have.css", "display", "none");
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
      cy.wrap(elements.eq(2)).then((el) => {
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
      });
      cy.wrap(elements.eq(3)).then((el) => {
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(0, 50, 255)"
        );
      });
    });
    cy.tick(1000);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0).parent()).should("have.css", "display", "none");
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
      cy.wrap(elements.eq(2)).then((el) => {
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
      });
      cy.wrap(elements.eq(3)).then((el) => {
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
      });
    });
    cy.tick(1000);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0)).then((el) => {
        expect(el).to.contain(el.text());
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
        expect(el.find("div[class*=circle_head]")).to.not.contain("head");
        expect(el.find("div[class*=circle_tail]")).to.not.contain("tail");
        expect(el.find("p[class*=circle_index]")).to.not.contain(0);
      });
      cy.wrap(elements.eq(1)).then((el) => {
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
        expect(el.find("div[class*=circle_head]")).to.contain("head");
        expect(el.find("p[class*=circle_index]")).to.contain(0);
      });
      cy.wrap(elements.eq(2)).then((el) => {
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );
      });
      cy.wrap(elements.eq(3)).then((el) => {
        expect(el.find("div[class*=circle_circle]")).to.have.css(
          "border",
          "4px solid rgb(0, 50, 255)"
        );
        expect(el).to.contain("");
      });
    });
    cy.tick(1010);
    cy.get("div[class*=circle_content]").then((elements) => {
      cy.wrap(elements.eq(0).parent()).should("have.css", "display", "none");
      expect(elements.find("div[class*=circle_changing]")).to.have.length(1);
      expect(elements.find("div[class*=circle_modified]")).to.have.length(0);
      expect(elements.find("div[class*=circle_default]")).to.have.length(elements.length - 1);
    });
  });
});
