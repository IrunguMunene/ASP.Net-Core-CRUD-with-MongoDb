using MongoCrudUi.Entities;
using System.Collections.Generic;
using System.Linq;

namespace MongoCrudUi.Models
{
    public class EmployeeAggregateModel
    {
        public EmployeeAggregateModel() =>
            Employees = new List<Employee>();

        public IList<Employee> Employees { get; set; }
        public int TotalEmployees 
        { 
            get 
            { 
                return Employees.Count(); 
            } 
        }
        public double AverageAge { get; set; }

        public string OldestEmployee
        {
            get
            {
                var emp = Employees.OrderByDescending(e => e.Age).First();
                return $"{emp.Name}";
            }
        }

    }
}
