using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactBookmarkManager.Data
{
    public class BookmarkRepository
    {
        private string _ConnStr;
        public BookmarkRepository(string ConnStr)
        {
            _ConnStr = ConnStr;
        }
        public object GetTopUrls()
        {
            using var context = new UserDataContext(_ConnStr);
            return context.Bookmarks.GroupBy(p => p.Url)
                 .Select(x => new MostUsedUrl
                 {
                     Url = x.Key,
                     Count = x.Count()
                 }).OrderByDescending(p => p.Count).Take(5).ToList();
        }
        public void SignUp(User user, string password)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            using var ctx = new UserDataContext(_ConnStr);
            ctx.Users.Add(user);
            ctx.SaveChanges();
        }
        public User LogIn(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }

            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            return isValidPassword ? user : null;
            
        }
        public User GetByEmail(string email)
        {
            using var ctx = new UserDataContext(_ConnStr);
            return ctx.Users.FirstOrDefault(u => u.Email == email);
        }
        public void AddBookmark(Bookmark b)
        {
            using var ctx = new UserDataContext(_ConnStr);
            ctx.Bookmarks.Add(b);
            ctx.SaveChanges();
        }
        public List<Bookmark> GetBookmarks(int userId)
        {
            using var ctx = new UserDataContext(_ConnStr);
            return ctx.Bookmarks.Where(u => u.UserId == userId).ToList();
        }
        public void DeleteBookmark(int id)
        {
            using var ctx = new UserDataContext(_ConnStr);
            ctx.Database.ExecuteSqlInterpolated($"DELETE from bookmarks WHERE id = {id}");
            ctx.SaveChanges();
        }
        public void UpdateTitle (string title, int id)
        {
            using var ctx = new UserDataContext(_ConnStr);
            ctx.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks SET title = {title} WHERE id = {id}");
            ctx.SaveChanges();
        }
    }
}
