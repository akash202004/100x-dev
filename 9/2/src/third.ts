interface todo {
  title: string;
  description?: string;
  greet(pharse: string): void;
}
class Employee implements todo {
  title: string;
  description?: string;

  constructor(title: string, description: string) {
    this.title = title;
    // this.description = description;
  }

  greet(pharse: string): void {
    console.log(`${pharse} ${this.title}`);
  }
}

const e = new Employee("Akash", "Hello");
console.log(e.greet("Hello"));
