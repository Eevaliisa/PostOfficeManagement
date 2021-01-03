using System;
using System.Linq;
using System.Threading.Tasks;
using post_office_management_app.Data;

namespace post_office_management.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class, new()
    {
        protected readonly DataContext _context;

        public Repository(DataContext context)
        {
            _context = context;
        }

        public IQueryable<TEntity> GetAll()
        {
            return _context.Set<TEntity>();
        }

        public async Task<TEntity> Add(TEntity entity)
        {
            await _context.AddAsync(entity);
            await _context.SaveChangesAsync();

             return entity;
        }

        public async Task<TEntity> Update(TEntity entity)
        {
            _context.Update(entity);
            await _context.SaveChangesAsync();

            return entity;
        }
    }
}