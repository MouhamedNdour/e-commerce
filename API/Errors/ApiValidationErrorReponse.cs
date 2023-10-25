using System;
namespace API.Errors
{
	public class ApiValidationErrorReponse: ApiResponse
	{
		public ApiValidationErrorReponse(): base(400)
		{
		}

		public IEnumerable<string> Errors { get; set; }
	}
}

