using Konfigurator_aspnetcore_Backend.Data;
using Konfigurator_aspnetcore_Backend.Models;
using Konfigurator_aspnetcore_Backend.Models.DTOs;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Konfigurator_aspnetcore_Backend.Services.UserManagement
{
    public class UserManagementService : IUserManagementService
    {
        private readonly LabyrinthKonfiguratorContext _context;

        public UserManagementService(LabyrinthKonfiguratorContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponseDto<string>> CreateUser(UserRequestDto request)
        {
            // pruefen, ob der Benutzername bereits vergeben ist
            if(_context.users.Any(u => u.username == request.username))
            {
                return new ServiceResponseDto<string> { Success = false, Message = "Username bereits vergeben" };
            }

            PasswordHasher<User> hasher = new PasswordHasher<User>();

            User user = new User
            {
                username = request.username
            };

            user.passwordHash = hasher.HashPassword(user, request.passwordHash);

            // User-Objekt mit Benutzername und Passwort-Hash in der Datenbank speichern
            await _context.users.AddAsync(user);
            await _context.SaveChangesAsync();

            return new ServiceResponseDto<string> { Data = user.username, Success = true, Message = "Registrierung erfolgreich" };
        }

        public async Task<ServiceResponseDto<UserResponseDto>> LoginUser(UserRequestDto request)
        {
            PasswordHasher<User> hasher = new PasswordHasher<User>();
            string token = string.Empty;
            PasswordVerificationResult result = PasswordVerificationResult.Failed;

            // anhand den uebermittelten Daten den entsprechenen Nutzer aus der Datenbank zurueckliefern
            var user = await _context.users.FirstOrDefaultAsync(u => u.username == request.username);

            // Nutzer gefunden
            if (user != null)
            {
                result = hasher.VerifyHashedPassword(user, user.passwordHash, request.passwordHash);
            }

            // Passwort falsch oder Nutzer nicht gefunden
            if(result == PasswordVerificationResult.Failed || user == null)
            {
                return new ServiceResponseDto<UserResponseDto> { Success = false, Message = "Benutzername oder Passwort falsch" };
            }

            // Response mit dem Token zurueckgeben
            var response = new UserResponseDto(user.username, GenerateJWTToken(user));

            return new ServiceResponseDto<UserResponseDto> { Data = response, Success = true };
        }

        /*
         * ein neues Json Web Token fuer den Nutzer generieren und zurueckgeben
         */
        private static string GenerateJWTToken(User user)
        {
            var handler = new JsonWebTokenHandler();

            var token = handler.CreateToken(new SecurityTokenDescriptor()
            {
                Claims = new Dictionary<string, object> { { ClaimTypes.Name, user } },
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8
                    .GetBytes("my-secret-secret-key")), SecurityAlgorithms.HmacSha512)
            });;

            return token;
        }
    }
}
