var Employee = /** @class */ (function () {
    function Employee(title, description) {
        this.title = title;
        // this.description = description;
    }
    Employee.prototype.greet = function (pharse) {
        console.log("".concat(pharse, " ").concat(this.title));
    };
    return Employee;
}());
var e = new Employee("Akash", "Hello");
console.log(e.greet("Hello"));
