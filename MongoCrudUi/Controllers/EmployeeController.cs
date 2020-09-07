using Microsoft.AspNetCore.Mvc;
using MongoCrudUi.Entities;
using MongoCrudUi.Interfaces;
using MongoCrudUi.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
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

        #region Task 2 Solution
        [Route("IsBinaryStringGood"), HttpGet]
        public ActionResult<bool> IsBinaryStringGood(string binaryString)
        {
            try
            {
                bool stringIsGood = false;              

                // Number of Ones and Zeros are equal
                if (IsCountOfZeroEqualCountOfOne(binaryString))
                {
                    // Meets rule 1, thus far string is good.
                    stringIsGood = true;
                    for (int i = 0; i < binaryString.ToCharArray().Length; i++)
                    {
                        if (IsCountOfZeroGreaterThanOne(binaryString.Take(i + 1)))
                        {
                            // Breaks rule 2 hence string is bad.
                            stringIsGood = false;
                            break;
                        }
                    }
                }

                return stringIsGood;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// The function returns if the count of Zero is equal to the 
        /// count of one in any string. This checks if string meets rule
        /// one.
        /// </summary>
        /// <param name="strToCheck">String to check for counts</param>
        /// <returns>True if they are equal, false if they are not.</returns>
        private bool IsCountOfZeroEqualCountOfOne(string strToCheck)
        {
            int countOfZero = strToCheck.Count(x => x == '0');
            int countOfOne = strToCheck.Count(x => x == '1');

            return countOfZero == countOfOne;
        }

        /// <summary>
        /// For rule two. Checks if a substring has more zeros than ones.
        /// </summary>
        /// <param name="subStringToCheck">The substring to check</param>
        /// <returns>Returns true when 0 are more than ones, meaning string is bad, 
        /// and false when not meaning substring is good.
        /// </returns>
        private bool IsCountOfZeroGreaterThanOne(IEnumerable<char> subStringToCheck)
        {
            int countOfZero = subStringToCheck.Count(x => x == '0');
            int countOfOne = subStringToCheck.Count(x => x == '1');

            return countOfZero > countOfOne;
        }
        #endregion
    }
}
