using Microsoft.AspNetCore.Mvc;
using MongoCrudUi.Entities;
using MongoCrudUi.Interfaces;
using MongoCrudUi.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MongoCrudUi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        #region Properties

        private readonly IEmployeeRepository employeeRepository;
        private readonly IClientSessionHandle clientSessionHandle;
        private readonly ILoggerManager loggerManager;

        #endregion

        #region Constructor
        public EmployeeController(IEmployeeRepository employeeRepo, IClientSessionHandle sessionHandle, ILoggerManager logger) =>
            (employeeRepository, clientSessionHandle, loggerManager) = (employeeRepo, sessionHandle, logger);

        #endregion

        [Route("LoadEmployees"), HttpGet]
        public async Task<IEnumerable<Employee>> LoadEmployees()
        {
            try
            {
                var employees = await employeeRepository.GetEmployeesAsync();
                return employees;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("GetById"), HttpGet]
        public async Task<Employee> GetEmployeeById(string id)
        {
            try
            {
                var employee = await employeeRepository.GetEmployeeById(id);
                return employee;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("GetByName"), HttpGet]
        public IEnumerable<Employee> GetEmployeeByName(string employeeName)
        {
            try
            {
                var employees = employeeRepository.GetEmployeeByName(employeeName);
                return employees;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("SearchByMultipleFields"), HttpGet]
        public Task<IEnumerable<Employee>> SearchByMultipleFields(string fieldName, string fieldValue, string employeeName)
        {
            try
            {
                var employees = employeeRepository.SearchByMultipleFields(fieldName, fieldValue, employeeName);
                return employees;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("CreateEmployee"), HttpPost]
        public async Task<IActionResult> CreateEmployee(EmployeeModel model)
        {
            try
            {
                // Start a transaction to create new employee
                // If not working with replica sets comment the following out otherwise will generate an error
                clientSessionHandle.StartTransaction();

                var newEmployee = new Employee 
                                    { 
                                        Age = model.Age,
                                        City = model.City,
                                        Country = model.Country,
                                        Department = model.Department,
                                        Designation = model.Designation,
                                        Gender = model.Gender,
                                        Name = model.Name
                                    };
                await employeeRepository.InsertAsync(newEmployee);

                // If not working with replica sets comment the following out
                await clientSessionHandle.CommitTransactionAsync();

                loggerManager.LogInfo($"Employee {model.Name} created successfully.");

                return Ok();
            }
            catch (Exception ex)
            {
                // If not working with replica sets comment the following out
                await clientSessionHandle.AbortTransactionAsync();
                return BadRequest(ex);
            }
        }

        [Route("UpdateEmployee"), HttpPut]
        public async Task<IActionResult> UpdateEmployee(EmployeeModel model)
        {
            try
            {
                // If not working with replica sets comment the following out
                clientSessionHandle.StartTransaction();

                var updateEmployee = new Employee
                {
                    Age = model.Age,
                    City = model.City,
                    Country = model.Country,
                    Department = model.Department,
                    Designation = model.Designation,
                    Gender = model.Gender,
                    Name = model.Name,
                    Id = model.Id
                };

                await employeeRepository.UpdateAsync(updateEmployee);

                // If not working with replica sets comment the following out
                await clientSessionHandle.CommitTransactionAsync();

                loggerManager.LogInfo($"Employee {model.Name} record updated successfully.");

                return Ok();
            }
            catch (Exception ex)
            {
                // If not working with replica sets comment the following out
                await clientSessionHandle.AbortTransactionAsync();
                throw ex;
            }
        }

        [Route("DeleteEmployee"), HttpDelete]
        public async Task<IActionResult> DeleteEmployee(string id)
        {
            try
            {
                // If not working with replica sets comment the following out
                clientSessionHandle.StartTransaction();

                await employeeRepository.DeleteAsync(id);

                // If not working with replica sets comment the following out
                await clientSessionHandle.CommitTransactionAsync();

                loggerManager.LogInfo($"Employee id {id} deleted successfully.");

                return Ok();
            }
            catch (Exception ex)
            {
                // If not working with replica sets comment the following out
                await clientSessionHandle.AbortTransactionAsync();
                throw ex;
            }
        }

        [Route("GetDistinctValues"), HttpGet]
        public async Task<List<string>> GetFieldUniqueValues(string fieldName)
        {
            try
            {
                var distinctValues = await employeeRepository.GetDistinctFieldValuesAsync(fieldName);
                return distinctValues;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("GetFilteredEmployees"), HttpGet]
        public async Task<EmployeeAggregateModel> GetFilteredEmployees(string fieldName, string fieldValue)
        {
            try
            {
                var employees = await employeeRepository.GetFilteredEmployees(fieldName, fieldValue);
                return employees;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
