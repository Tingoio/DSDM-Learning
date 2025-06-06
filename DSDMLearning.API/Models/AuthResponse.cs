// Models/AuthResponse.cs
namespace DSDMLearning.API.Models
{
    public class AuthResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public UserInfo User { get; set; }
    }

    public class UserInfo
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Sobre { get; set; }
        public bool EstudoCaso { get; set;}
        public bool MateriaisEducativos { get; set;}
        public bool Quizzes { get; set;}
        public bool Faq { get; set;}
        public bool Certificado { get; set;}
    }
}