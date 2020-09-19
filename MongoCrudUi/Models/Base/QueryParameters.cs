namespace MongoCrudUi.Models.Base
{
    public abstract class QueryParameters
    {
        const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        // Field name to filter with
        public string FieldName { get; set; }
        // Value for filter field.
        public string FieldValue { get; set; }

        private int _pageSize = 10;
        public int PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = (value > maxPageSize) ? maxPageSize : value;
            }
        }
    }
}
