using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using GL.ELMA.QuickChat.Hubs;
using GL.ELMA.QuickChat.Managers;
using GL.ELMA.QuickChat.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR.Infrastructure;

namespace GL.ELMA.QuickChat.Controllers
{
    public class ChatController : Controller
    {
        private IChatManager _manager;
        private MainHub _chatHub;


        public ChatController(IChatManager chatManager, IConnectionManager connectionManager)
        {
            _manager = chatManager;
            _chatHub = new MainHub(connectionManager);
        }

        // GET api/<controller>
        public String GetNewUserId(String userName)
        {
            _manager.AddUser(userName);

            //broadcast the user list to all the clients
            _chatHub.SendUserList(_manager.GetAllUsers());
            return Guid.NewGuid().ToString();
        }

        // GET api/<controller>/5
        public List<ChatItem> Get()
        {
            return _manager.GetAllChat();
        }

        // POST api/<controller>
        public void PostChat(ChatItem chatItem)
        {
            chatItem.Id = Guid.NewGuid();
            chatItem.DateTime = DateTime.Now;
            _manager.AddChat(chatItem);

            //broadcast the chat to all the clients
            _chatHub.SendMessage(chatItem);
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
