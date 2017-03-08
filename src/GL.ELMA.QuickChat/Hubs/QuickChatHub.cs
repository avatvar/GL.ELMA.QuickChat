using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GL.ELMA.QuickChat.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using NuGet.Packaging;

namespace GL.ELMA.QuickChat.Hubs
{
    [HubName("MainHub")]
    public class QuickChatHub : QuickChatHubBase
    {
        public QuickChatHub(IConnectionManager connectionManager, UserManager<ApplicationUser> userManager) : base(connectionManager, userManager)
        {
        }

        public override Task OnConnected()
        {
            string connectionId = Context.ConnectionId;
            var user = GetOrAddConnection();
            
            lock (user.ConnectionIds)
            {
                user.ConnectionIds.Add(connectionId);
            }

            return base.OnConnected();
        }

        /// <summary>
        /// Отправить сообщение пользователю
        /// </summary>
        /// <param name="chatItem"></param>
        public void SendMessage(ChatMessage chatItem)
        {
            IEnumerable<string> allReceivers;
            UserConnection sender = GetConnection(chatItem.UserId);
            UserConnection receiver;
            if (Connections.TryGetValue(chatItem.ReceiverId, out receiver))
            {
                lock (receiver.ConnectionIds)
                {
                    lock (sender.ConnectionIds)
                    {
                        allReceivers = receiver.ConnectionIds.Concat(sender.ConnectionIds);
                    }
                }
            }
            else
            {
                allReceivers = sender.ConnectionIds;
            }
            foreach (var connectionId in allReceivers)
            {
                HubContext.Clients.Client(connectionId).pushNewMessage(chatItem.Id, chatItem.UserId, chatItem.UserName, chatItem.Message, chatItem.DateTime);
            }
        }

        /// <summary>
        /// Получить список пользователей
        /// </summary>
        public void SendUserList(List<ChatUser> userList)
        {
            HubContext.Clients.All.pushUserList(userList);
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            string connectionId = Context.ConnectionId;

            UserConnection user = GetCaller();

            if (user != null)
            {
                lock (user.ConnectionIds)
                {
                    user.ConnectionIds.RemoveWhere(cid => cid.Equals(connectionId));

                    if (!user.ConnectionIds.Any())
                    {
                        UserConnection removedConnection;
                        Connections.TryRemove(user.UserId, out removedConnection);

                        // You might want to only broadcast this info if this 
                        // is the last connection of the user and the user actual is 
                        // now disconnected from all connections.
                        //Clients.Others.userDisconnected(userName);
                    }
                }
            }

            return base.OnDisconnected(stopCalled);
        }

        
    }
}
