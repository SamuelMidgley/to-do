namespace ToDo;

public class Result
{
    private Result(bool isSuccess, string error)
    {
        if (isSuccess && error != string.Empty ||
            !isSuccess && error == string.Empty)
        {
            throw new ArgumentException("Invalid error", nameof(error));
        }

        IsSuccess = isSuccess;
        Error = error;
    }

    public bool IsSuccess { get; }

    public bool IsFailure => !IsSuccess;

    public string Error { get; }

    public static Result Success() => new(true, string.Empty);

    public static Result Failure(string error) => new(false, error);
}

public class Result<T> where T : class
{
    private Result(bool isSuccess, string error,T? data = null)
    {
        if (isSuccess && error != string.Empty ||
            !isSuccess && error == string.Empty)
        {
            throw new ArgumentException("Invalid error", nameof(error));
        }

        Data = data;
        IsSuccess = isSuccess;
        Error = error;
    }

    public bool IsSuccess { get; }

    public bool IsFailure => !IsSuccess;
    
    public T? Data { get;  }

    public string Error { get; }

    public static Result<T> Success(T data) => new(true, string.Empty, data);

    public static Result<T> Failure(string error) => new(false, error);
}