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

        #endregion

        #region Constructor
        public EmployeeController(IEmployeeRepository employeeRepo, IClientSessionHandle sessionHandle) =>
            (employeeRepository, clientSessionHandle) = (employeeRepo, sessionHandle);

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

        [Route("CreateEmployee"), HttpPost]
        public async Task<IActionResult> CreateEmployee(EmployeeModel model)
        {
            // Start a transaction to create new employee
            // If working with replica sets uncomment to make use of transactions
            //clientSessionHandle.StartTransaction();

            try
            {
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
                // If working with replica sets uncomment to make use of transactions
                //await clientSessionHandle.CommitTransactionAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                await clientSessionHandle.AbortTransactionAsync();
                return BadRequest(ex);
            }
        }

        [Route("UpdateEmployee"), HttpPut]
        public async Task<IActionResult> UpdateEmployee(EmployeeModel model)
        {
            // If working with replica sets uncomment to make use of transactions
            //clientSessionHandle.StartTransaction();

            try
            {
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

                // If working with replica sets uncomment to make use of transactions
                //await clientSessionHandle.CommitTransactionAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                await clientSessionHandle.AbortTransactionAsync();
                throw ex;
            }
        }

        [Route("DeleteEmployee"), HttpDelete]
        public async Task<IActionResult> DeleteEmployee(string id)
        {
            try
            {
                await employeeRepository.DeleteAsync(id);

                return Ok();
            }
            catch (Exception ex)
            {
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
