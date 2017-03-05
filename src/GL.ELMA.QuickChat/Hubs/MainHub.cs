using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GL.ELMA.QuickChat.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR.Infrastructure;

namespace GL.ELMA.QuickChat.Hubs
{
    [HubName("MainHub")]
    public class MainHub : Hub
    {
        private readonly IConnectionManager _connectionManager;
        private readonly UserManager<ApplicationUser> _userManager;
        public MainHub(IConnectionManager connectionManager, UserManager<ApplicationUser> userManager)
        {
            _connectionManager = connectionManager;
            _userManager = userManager;
        }

        public override Task OnConnected()
        {
            var context = Context;
            return base.OnConnected();
        }

        /// <summary>
        /// Broadcasts the chat message to all the clients
        /// </summary>
        /// <param name="chatItem"></param>
        public void SendMessage(ChatMessage chatItem)
        {
            IHubContext context = _connectionManager.GetHubContext("MainHub");
            context.Clients.All.pushNewMessage(chatItem.Id, chatItem.UserId, chatItem.UserName, chatItem.Message, chatItem.DateTime);
        }

        /// <summary>
        /// Broadcasts the user list to the clients
        /// </summary>
        public void SendUserList(List<ChatUser> userList)
        {
            IHubContext context = _connectionManager.GetHubContext("MainHub");
            context.Clients.All.pushUserList(userList);
        }
    }
}
