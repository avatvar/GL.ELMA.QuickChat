using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
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
    public class MainHub : Hub
    {
        private readonly IConnectionManager _connectionManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private static readonly ConcurrentDictionary<Guid, UserConnection> Connections = new ConcurrentDictionary<Guid, UserConnection>();

        public IHubContext HubContext => _connectionManager.GetHubContext("MainHub");

        public MainHub(IConnectionManager connectionManager, UserManager<ApplicationUser> userManager)
        {
            _connectionManager = connectionManager;
            _userManager = userManager;
        }

        public override Task OnConnected()
        {
            string connectionId = Context.ConnectionId;
            Guid connectedUserId = Guid.Parse(Context.QueryString["currentUserId"]);

            var user = Connections.GetOrAdd(connectedUserId, uid => new UserConnection
            {
                UserId = uid,
                ConnectionIds = new HashSet<string>()
            });

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
            UserConnection sender = GetUser(chatItem.UserId);
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
            foreach (var cid in allReceivers)
            {
                HubContext.Clients.Client(cid).pushNewMessage(chatItem.Id, chatItem.UserId, chatItem.UserName, chatItem.Message, chatItem.DateTime);
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
            Guid connectedUserId = Guid.Parse(Context.QueryString["currentUserId"]);
            string userName = Context.User.Identity.Name;
            string connectionId = Context.ConnectionId;

            UserConnection user;
            Connections.TryGetValue(connectedUserId, out user);

            if (user != null)
            {
                lock (user.ConnectionIds)
                {
                    user.ConnectionIds.RemoveWhere(cid => cid.Equals(connectionId));

                    if (!user.ConnectionIds.Any())
                    {

                        UserConnection removedUser;
                        Connections.TryRemove(connectedUserId, out removedUser);

                        // You might want to only broadcast this info if this 
                        // is the last connection of the user and the user actual is 
                        // now disconnected from all connections.
                        //Clients.Others.userDisconnected(userName);
                    }
                }
            }

            return base.OnDisconnected(stopCalled);
        }

        private UserConnection GetUser(Guid userId)
        {
            UserConnection user;
            Connections.TryGetValue(userId, out user);

            return user;
        }
    }
}
