using System.Linq.Expressions;
using System.Collections.Generic;

namespace Core.Specifications
{
	public interface ISpecification<T>
	{
		Expression<Func<T, bool>> Criteria { get; }

        List<Expression<Func<T, object>>> Includes { get; }
}
}

