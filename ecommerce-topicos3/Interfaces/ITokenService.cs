using ecommerce_topicos3.DTO;
using ecommerce_topicos3.Models;

namespace ecommerce_topicos3.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(Usuario usuario);

        string HashPassword(string password);

        bool VerifyPassword(string password, string hashedPassword);
    }
}
