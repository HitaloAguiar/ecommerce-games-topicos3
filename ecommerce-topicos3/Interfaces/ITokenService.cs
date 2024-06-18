using ecommerce_topicos3.DTO;

namespace ecommerce_topicos3.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(LoginDTO loginDTO);
    }
}
