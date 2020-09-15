# ASP.NET Core CRUD with MongoDb

The application performs all CRUD functions to a mongoDb database called SecurePrivacyTest and provides a link to the Binary string task, these as per the Test requirements. 
It is developed using Visual Studio 2019 express edition and has a react front end using axios to make calls to a ASP.NET Core 3.1 WebApi controller and react context API for state management.

No documents have been prepopulated to the database so as to allow a clean database from scratch for all the CRUD functions to be tested. 
Clicking the Add Employees link will load a form to register an employee, and upon saving, the list of Employees page is loaded listing all employees added.

On the employee listing page when employee documents exists, there are two filter drop downs that appear, one will prepopulate a list of fields that can be used to filter, 
and upon selecting a field unique values from the employee documents are populated into the second drop down. Upon selecting a value in the second drop down, 
a small summary of the employees that meet the criteria is displayed. This was down to show case the use of some of the LINQ features of the MongoDb .NET driver as per 
the test requirements.

Clicking the Employees link will load the Employee list displaying any employees added.

The code core functions are mostly in the following C# files; BaseRepository, EmployeeRepository and EmployeeController. 
The react part of the application is found under ClientApp. On StartUp.cs under the ConfigureServices function, 
change the connection string to the database accordingly. NOTE: The code as is, is tested against replica sets and hence makes use of transactions, if not working with replica sets changes will have to be made in the startup ConfigureServices function and in the EmployeeController CreateEmployee, UpdateEmployee and DeleteEmployee functions as indicated. In addition, in the ClientUp/src folder in the file Constants.Js, change this http://localhost:58440 so as to point to 
the correct endpoint as per your Visual Studio setup.
