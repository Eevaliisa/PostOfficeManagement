using System.Linq;
using System.Threading.Tasks;

namespace post_office_management.Repositories
{
    public interface IRepository<TEntity> where TEntity : class, new()
    {
        IQueryable<TEntity> GetAll();

        Task<TEntity> Add(TEntity entity);

        Task<TEntity> Update(TEntity entity);
    }
}