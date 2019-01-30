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

  it("Tracking spies with calls property",function(){
    var alice = new Employee("Alice", 4, "Testing");

    spyOn(alice,"calculateSalary").and.callThrough();
    var salary = alice.getSalary(); // calls calculateSalary

    alice.calculateSalary.and.stub();

    // calls calculateSalary only if salary is zero
    salary = alice.getSalary();

    expect(salary).toEqual(4000);

    expect(alice.calculateSalary.calls.any()).toEqual(true);
    expect(alice.calculateSalary.calls.count()).toEqual(1);

    // returns blank []
    console.log(alice.calculateSalary.calls.argsFor(0));

    expect(alice.calculateSalary.calls.argsFor(0)).toEqual([4]);

    alice.calculateSalary(1000);

    // returns array [1000]
    console.log(alice.calculateSalary.calls.argsFor(1));


    expect(alice.calculateSalary.calls.argsFor(1)).toEqual([1000]);

    // returns [[], [1000]]
    console.log(alice.calculateSalary.calls.allArgs());

    expect(alice.calculateSalary.calls.allArgs()).toEqual([[4],[1000]]);

    // returns objects
    console.log(alice.calculateSalary.calls.all());

    console.log(alice.calculateSalary.calls.mostRecent());
    console.log(alice.calculateSalary.calls.first());

    alice.calculateSalary.calls.reset();

    expect(alice.calculateSalary.calls.any()).toEqual(false);

  });

});