describe("Jasmine Spy", function() {

  it("Spying employee", function() {
    var alice = new Employee("Alice", 4, "Testing");

    spyOn(alice, "calculateSalary");
    console.log(alice.getDetails());
    expect(alice.calculateSalary).toHaveBeenCalled();
  });

  it("Spying employee with arguments", function() {
    var alice = new Employee("Alice", 4, "Testing");

    spyOn(alice, "calculateSalary");
    expect(alice.calculateSalary).not.toHaveBeenCalledWith(5);
  });

  it("Spying employee with call through", function() {
    var alice = new Employee("Alice", 4, "Testing");

    spyOn(alice, "calculateSalary").and.callThrough();
    var salary = alice.getSalary();

    expect(alice.calculateSalary).toHaveBeenCalled();
    console.log("Salary is :" + salary);
    expect(salary).toEqual(4000);
  });

  it("Spying employee with return value", function() {
    var alice = new Employee("Alice", 4, "Testing");

    spyOn(alice, "calculateSalary").and.returnValue(9999);
    alice.calculateSalary();

    expect(alice.calculateSalary).toHaveBeenCalled();
    expect(alice.calculateSalary()).toEqual(9999);

  });

  it("Spying employee with a fake call", function() {
    var alice = new Employee("Alice", 4, "Testing");

    spyOn(alice, "calculateSalary").and.callFake(function(grade) {
      var tSalary = 1000;
      return tSalary * grade;
    });

    var salary = alice.calculateSalary(10);
    expect(alice.calculateSalary).toHaveBeenCalled();
    expect(salary).toEqual(10000);

  });

  it("Spying employee with a throw error", function() {
    var alice = new Employee("Alice", 4, "Testing");

    spyOn(alice, "calculateSalary").and.throwError("Service is down");

    expect(alice.calculateSalary).toThrowError("Service is down");

  });

  it("Spying employee with call through and stub", function() {
    var alice = new Employee("Alice", 4, "Testing");

    spyOn(alice, "calculateSalary").and.callThrough();
    var salary = alice.getSalary();
    console.log("Salary is :" + salary);

    console.log("Now calling stub");
    alice.calculateSalary.and.stub();

  });

});