using MongoCrudUi.Entities;
using MongoCrudUi.Interfaces;
using MongoCrudUi.Models;
using MongoCrudUi.Repositories.Base;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MongoCrudUi.Repositories
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        #region Constructor
        public EmployeeRepository(IMongoClient client, IClientSessionHandle sessionHandle) : base(client, sessionHandle, "employees")
        {
            // NOTE: Index creation in mongoDb is Idempotent
            CreateIndex();
        }
        #endregion

        /// <summary>
        /// The function creates different indexes on the employee collection.
        /// Index creation as per Test request.
        /// </summary>
        /// <returns></returns>
        private void CreateIndex()
        {
            var indexOptions = new CreateIndexOptions();
            
            var genderIndexKeys = Builders<Employee>.IndexKeys.Ascending(e => e.Gender);
            var genderIndexModel = new CreateIndexModel<Employee>(genderIndexKeys, indexOptions);

            var departmentIndexKeys = Builders<Employee>.IndexKeys.Ascending(e => e.Department);
            var departmentIndexModel = new CreateIndexModel<Employee>(departmentIndexKeys, indexOptions);

            var designationIndexKeys = Builders<Employee>.IndexKeys.Ascending(e => e.Designation);
            var designationIndexModel = new CreateIndexModel<Employee>(designationIndexKeys, indexOptions);

            var cityIndexKeys = Builders<Employee>.IndexKeys.Ascending(e => e.City);
            var cityIndexModel = new CreateIndexModel<Employee>(cityIndexKeys, indexOptions);

            var countryIndexKeys = Builders<Employee>.IndexKeys.Ascending(e => e.Country);
            var countryIndexModel = new CreateIndexModel<Employee>(countryIndexKeys, indexOptions);

            // Create a unique Name index to prevent duplicate employees
            var nameIndexKeys = Builders<Employee>.IndexKeys.Ascending(e => e.Name);
            var nameIndexModel = new CreateIndexModel<Employee>(nameIndexKeys, new CreateIndexOptions { Unique = true });

            Collection.Indexes.CreateOne(nameIndexModel);
            Collection.Indexes.CreateOne(genderIndexModel);
            Collection.Indexes.CreateOne(departmentIndexModel);
            Collection.Indexes.CreateOne(designationIndexModel);
            Collection.Indexes.CreateOne(cityIndexModel);
            Collection.Indexes.CreateOne(countryIndexModel);
        }

        public async Task<Employee> GetEmployeeById(string id)
        {
            var filter = Builders<Employee>.Filter.Eq(f => f.Id, id);
            return await Collection.Find(filter).FirstOrDefaultAsync();
        }

        /// <summary>
        /// The function returns a list of all the employees, sort by age ascending.
        /// A show case of using simple aggregation as per test requirement
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<Employee>> GetEmployeesAsync() =>
            await Collection.Aggregate()
                    .SortBy(e => e.Department)
                    .ThenBy(e => e.Age)
                    .ThenBy(e => e.Name)
                    .ThenBy(e => e.Designation).ToListAsync();

        public async Task<EmployeeAggregateModel> GetFilteredEmployees(string fieldName, string fieldValue)
        {
            FilterDefinition<Employee> filter = null;

            switch (fieldName)
            {
                case "Gender":
                    filter = Builders<Employee>.Filter.Eq(rec => rec.Gender, fieldValue);
                    break;
                case "Department":
                    filter = Builders<Employee>.Filter.Eq(rec => rec.Department, fieldValue);
                    break;
                case "Designation":
                    filter = Builders<Employee>.Filter.Eq(rec => rec.Designation, fieldValue);
                    break;
                case "City":
                    filter = Builders<Employee>.Filter.Eq(rec => rec.City, fieldValue);
                    break;
                case "Country":
                    filter = Builders<Employee>.Filter.Eq(rec => rec.Country, fieldValue);
                    break;
            }

            var employees = await Collection.Find(filter).ToListAsync();
            var avgAge = employees.Select(e => e.Age).Average();

            return new EmployeeAggregateModel
            {
                Employees = employees,
                AverageAge = avgAge
            };
        }
    }
}
