INSERT INTO departments (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");
      
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead",100000, 1),
       ("Salesperson",80000, 1),
       ("Lead Engineer",150000, 2),
       ("Legal Team Lead",250000, 4),
       ("Lawyer",190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null),
       ("Mike", "Chan", 2, 1),
       ("Ashley", "Rodriguez", 3, null),
       ("Kevin", "Tupik", 5, 3),
       ("Sarah", "Lourd", 4, null),
       ;

