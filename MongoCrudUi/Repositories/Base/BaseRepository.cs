using MongoCrudUi.Entities.Base;
using MongoCrudUi.Interfaces.Base;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MongoCrudUi.Repositories.Base
{
    public abstract class BaseRepository<T> : IRepositoryBase<T> where T : BaseEntity
    {
        #region Private Properties
        // Name of the database
        private const string DATABASE = "SecurePrivacyTest";
        private readonly IMongoClient mongoClient;
        // Interface handle for a client session will be passed in every operation
        private readonly IClientSessionHandle clientSessionHandle;
        // Name of the collection.
        private readonly string collection;

        // Retrieve the collection.
        protected virtual IMongoCollection<T> Collection => mongoClient.GetDatabase(DATABASE).GetCollection<T>(collection);

        #endregion

        #region Constructor

        public BaseRepository(IMongoClient client, IClientSessionHandle sessionHandle, string collectionName)
        {
            (mongoClient, clientSessionHandle, collection) = (client, sessionHandle, collectionName);

            // If working with transactions, a collection has to be 
            // created first. The following check if the collection exists helps avoid an error as a result 
            // of trying to create an already existing collection,
            if (!mongoClient.GetDatabase(DATABASE).ListCollectionNames().ToList().Contains(collection))
            {
                mongoClient.GetDatabase(DATABASE).CreateCollection(collection);
            }
        }

        #endregion

        #region Operations
        public virtual async Task InsertAsync(T record) =>
            await Collection.InsertOneAsync(clientSessionHandle, record);

        public virtual async Task UpdateAsync(T record)
        {
            // create lambda expression using the id property
            Expression<Func<T, string>> func = f => f.Id;
            // using reflection retrieve the id value.
            var value = (string)record.GetType().GetProperty(func.Body.ToString().Split(".")[1]).GetValue(record, null);
            // Create a filter
            var filter = Builders<T>.Filter.Eq(func, value);

            if (record != null)
            {
                await Collection.ReplaceOneAsync(clientSessionHandle, filter, record);
            }
        }

        public virtual async Task DeleteAsync(string id) =>
            await Collection.DeleteOneAsync(clientSessionHandle, f => f.Id == id);

        /// <summary>
        /// Method will get the distinct values of a field from a collection.
        /// </summary>
        /// <param name="fieldName">The name of the field</param>
        /// <returns></returns>
        public virtual async Task<List<string>> GetDistinctFieldValuesAsync(string fieldName)
        {
            return await Collection.Distinct<string>(fieldName, "{}").ToListAsync();
        }

        protected virtual async Task<IEnumerable<T>> FetchAsync(FilterDefinition<T> filter)
        {
            return filter == null ? 
                        await Collection.Aggregate().ToListAsync() :
                        await Collection.Aggregate().Match(filter).ToListAsync();
        }

        #endregion
    }
}
