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
        public string Name { get; set; }

        [BsonElement("department")]
        public string Department { get; set; }

        [BsonElement("designation")]
        public string Designation { get; set; }

        [BsonElement("age")]
        public int Age { get; set; }

        [BsonElement("city")]
        public string City { get; set; }

        [BsonElement("country")]
        public string Country { get; set; }

        [BsonElement("gender")]
        public string Gender { get; set; }
        #endregion
    }
}
