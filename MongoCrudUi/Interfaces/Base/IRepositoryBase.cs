using MongoCrudUi.Entities.Base;
using System.Threading.Tasks;

namespace MongoCrudUi.Interfaces.Base
{
    public interface IRepositoryBase<T> where T : BaseEntity
    {
        Task InsertAsync(T record);
        Task UpdateAsync(T record);
        Task DeleteAsync(string id);
    }
}
