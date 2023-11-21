// storing the given data
const data = [
  { name: "Bob", age: 20, gender: "male" },
  { name: "George", age: 42, gender: "male" },
  { name: "Sara", age: 42, gender: "female" },
  { name: "Conor", age: 40, gender: "male" },
  { name: "Jennifer", age: 42, gender: "female" },
];

// converting the given data into the string
const jsonString = JSON.stringify(data);

describe("Assignment for SDET - CAW Studios", () => {
  it("Verify json data is correctly populated in the table", () => {
    // The below line vist the given page
    cy.visit("https://testpages.herokuapp.com/styled/tag/dynamic-table.html");

    // Getitng the table data text
    cy.get("details summary").click();

    // Getting the input box, clearing the existing text and typing the given json string
    cy.get("#jsondata")
      .clear()
      .type(jsonString, { parseSpecialCharSequences: false });

    // Clikcing on the refresh button
    cy.get(".styled-click-button").click();

    // Getting the table data
    cy.get("table tr")
      .next() // skipping the header and getting the rest of the table
      .each(($el, index) => {
        // looping the each table record
        cy.wrap($el).find("td").eq(0).should("contain", data[index].name); // Verifying the name column
        cy.wrap($el).find("td").eq(1).should("contain", data[index].age); // Verifying the age column
        cy.wrap($el).find("td").eq(2).should("contain", data[index].gender); // Verifying the gender column
      });
  });
});
