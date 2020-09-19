using MongoCrudUi.Entities;
using MongoCrudUi.Interfaces.Base;
using MongoCrudUi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MongoCrudUi.Interfaces
{
    public interface IEmployeeRepository : IRepositoryBase<Employee>
    {
        Task<IEnumerable<Employee>> GetEmployeesAsync();
        Task<Employee> GetEmployeeById(string id);
        IEnumerable<Employee> GetEmployeeByName(string employeeName);
        Task<IEnumerable<Employee>> SearchByMultipleFields(string fieldName, string fieldValue, string employeeName);
        Task<EmployeeAggregateModel> GetFilteredEmployees(string fieldName, string fieldValue);
        Task<List<string>> GetDistinctFieldValuesAsync(string fieldName);
        Task<PagedList<Employee>> GetEmployeesWithParametersAsync(EmployeeParameters employeeParameters);
    }
}
