using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBookmarkManager.Data;
using ReactBookmarkManager.Web.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ReactBookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly string _ConnString;
        public AccountController(IConfiguration con)
        {
            _ConnString = con.GetConnectionString("ConStr");
        }

        [Route("signUp")]
        [HttpPost]
        public void SignUp(SignUpViewModel u)
        {
            BookmarkRepository repo = new(_ConnString);
            repo.SignUp(u, u.Password);
        }

        [Route("logIn")]
        [HttpPost]
        public User LogIn(LogInViewModel l)
        {
            BookmarkRepository repo = new(_ConnString);
            var user = repo.LogIn(l.Email, l.Password);
            if (user == null)
            {
                return null;
            }

            var claims = new List<Claim>()
            {
                new Claim("user", l.Email)
            };

            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();
            return user;
        }
       
        [Route("logout")]
        [HttpPost]
        public void LogOut()
        {
            HttpContext.SignOutAsync().Wait();
        }
    }
}
