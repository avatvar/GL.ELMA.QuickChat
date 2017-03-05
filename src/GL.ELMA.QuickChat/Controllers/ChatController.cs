using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using GL.ELMA.QuickChat.Hubs;
using GL.ELMA.QuickChat.Managers;
using GL.ELMA.QuickChat.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using Newtonsoft.Json;

namespace GL.ELMA.QuickChat.Controllers
{
    public class ChatController : Controller
    {
        private readonly IChatManager _manager;
        private readonly MainHub _chatHub;
        private readonly UserManager<ApplicationUser> _userManager;

        public ChatController(IChatManager chatManager, IConnectionManager connectionManager, UserManager<ApplicationUser> userManager)
        {
            _manager = chatManager;
            _userManager = userManager;
            _chatHub = new MainHub(connectionManager, userManager);
        }

        [HttpGet]
        public ActionResult GetCurrentUser()
        {
            var user = _userManager.GetUserAsync(HttpContext.User).GetAwaiter().GetResult();
            _manager.AddUser(new ChatUser {UserName = user.UserName, UserId = user.Id});

            //broadcast the user list to all the clients
            _chatHub.SendUserList(_manager.GetAllUsers());
            return Json(new {user.Id, user.UserName});
        }

        [HttpGet]
        public ActionResult GetUsers()
        {
            var currentUser = _userManager.GetUserAsync(HttpContext.User).GetAwaiter().GetResult();
            var users = _userManager.Users.Where(a => a.Id != currentUser.Id).Select(u => new ChatUser {UserId = u.Id, UserName = u.UserName});

            return Json(JsonConvert.SerializeObject(users));
        }

        // GET api/<controller>/5
        public List<ChatMessage> Get()
        {
            return _manager.GetAllChat();
        }
        
        [HttpPost]
        public IActionResult PostChat([FromBody]ChatMessage chatItem)
        {
            _manager.AddChat(chatItem);

            //broadcast the chat to all the clients
            _chatHub.SendMessage(chatItem);

            return Json(new {Success = "true"});
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}
