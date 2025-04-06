describe("Quiz Application", () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit("/");
  });

  it("should load the application", () => {
    // Check if the page loaded successfully
    cy.get("body").should("not.be.empty");
  });

  it("should have a start quiz button", () => {
    // Check if the start quiz button exists
    cy.get("button").contains("Start Quiz").should("be.visible");
  });

  it("should start the quiz when clicking the button", () => {
    // Click the start quiz button
    cy.get("button").contains("Start Quiz").click();

    // Wait for the spinner to disappear (if it appears)
    cy.wait(2000); // Give it time to process

    // Check if we're no longer on the start screen
    cy.get("button").contains("Start Quiz").should("not.exist");

    // Verify we're in the quiz by checking for any content
    cy.get("body").should("not.be.empty");
  });
});
