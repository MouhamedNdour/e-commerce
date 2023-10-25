using System;
namespace API.Errors
{
	public class ApiResponse
	{
		public ApiResponse(int statusCode, string message = null)
		{
			Statuscode = statusCode;
			Message = message ?? GetDefaultMessageForStatusCode(statusCode);
		}

		public int Statuscode { get; set; }

		public string Message { get; set; }

		private	string GetDefaultMessageForStatusCode (int statusCode)
		{
			return statusCode switch
			{
				400 => "A bad requet, you have made",
				401 => "Authorized, you are not",
				404 => "Resource found, it was not",
				500 => "Internal error",
				_ => "Unknown error"
			};
		}

    }
}

