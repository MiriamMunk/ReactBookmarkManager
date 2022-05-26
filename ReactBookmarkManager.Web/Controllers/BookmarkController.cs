using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBookmarkManager.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactBookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {
        private readonly string _ConnString;
        public BookmarkController(IConfiguration con)
        {
            _ConnString = con.GetConnectionString("ConStr");
        }

        [Route("getTopUrls")]
        [HttpGet]
        public object GetTopUrls()
        {
            BookmarkRepository repo = new(_ConnString);
            return repo.GetTopUrls();
        }
       
        [Route("getcurrentuser")]
        [HttpGet]
        public User GetCurrentUser()
        {
            BookmarkRepository repo = new(_ConnString);
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }
            return repo.GetByEmail(User.Identity.Name);
        }
      
        [Authorize]
        [Route("addBookmark")]
        [HttpPost]
        public void AddBookmark(Bookmark b)
        {
            BookmarkRepository repo = new(_ConnString);
            b.UserId = repo.GetByEmail(User.Identity.Name).Id;
            repo.AddBookmark(b);
        }

        [Authorize]
        [Route("getBookmarks")]
        [HttpGet]
        public List<Bookmark> GetBookmarks()
        {
            BookmarkRepository repo = new(_ConnString);
            int userId = repo.GetByEmail(User.Identity.Name).Id;
            return repo.GetBookmarks(userId);
        }

        [Authorize]
        [Route("deleteBookmark")]
        [HttpPost]
        public void DeleteBookmark(int id)
        {
            BookmarkRepository repo = new(_ConnString);
            repo.DeleteBookmark(id);
        }

        [Authorize]
        [Route("updateBookmarkTitle")]
        [HttpPost]
        public void UpdateBookmarkTitle(Bookmark b)
        {
            BookmarkRepository repo = new(_ConnString);
            repo.UpdateTitle(b.Title, b.Id);
        }
    }
}
