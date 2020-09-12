using MongoCrudUi.Entities.Base;
using MongoDB.Bson.Serialization.Attributes;
using System.Runtime.Serialization;

namespace MongoCrudUi.Entities
{
    [DataContract]
    public class Employee : BaseEntity
    {
        #region Properties
        [BsonElement("name")]
        [BsonRequired]
        public string Name { get; set; }

        [BsonElement("department")]
        [BsonRequired]
        public string Department { get; set; }

        [BsonElement("designation")]
        [BsonRequired]
        public string Designation { get; set; }

        [BsonElement("age")]
        [BsonRequired]
        public int Age { get; set; }

        [BsonElement("city")]
        [BsonRequired]
        public string City { get; set; }

        [BsonElement("country")]
        [BsonRequired]
        public string Country { get; set; }

        [BsonElement("gender")]
        [BsonRequired]
        public string Gender { get; set; }
        #endregion
    }
}
