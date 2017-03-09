using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using GL.ELMA.QuickChat.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Infrastructure;

namespace GL.ELMA.QuickChat.Hubs
{
    public abstract class QuickChatHubBase : Hub
    {
        protected IHubContext HubContext => _connectionManager.GetHubContext("MainHub");
        protected readonly UserManager<ApplicationUser> UserManager;

        protected QuickChatHubBase(IConnectionManager connectionManager, UserManager<ApplicationUser> userManager)
        {
            _connectionManager = connectionManager;
            UserManager = userManager;
        }

        protected UserConnection GetConnection(Guid userId)
        {
            UserConnection user;
            Connections.TryGetValue(userId, out user);

            return user;
        }

        protected UserConnection GetOrAddConnection()
        {
            var callerId = GetUserId();
            return Connections.GetOrAdd(callerId, uid => new UserConnection
            {
                UserId = uid,
                ConnectionIds = new HashSet<string>()
            });
        }

        protected Guid GetUserId()
        {
            Guid connectedUserId;
            var claims = Context.User.Identity as ClaimsIdentity;
            var identClaim = claims?.FindFirst(ClaimTypes.NameIdentifier);
            if (identClaim != null)
            {
                Guid.TryParse(identClaim.Value, out connectedUserId);
            }

            return connectedUserId;
        }

        protected UserConnection GetCaller()
        {
            var connectedUserId = GetUserId();
            UserConnection user;
            Connections.TryGetValue(connectedUserId, out user);
            return user;
        }

        protected void RemoveConnection()
        {
            
        }

        private readonly IConnectionManager _connectionManager;
        protected static readonly ConcurrentDictionary<Guid, UserConnection> Connections = new ConcurrentDictionary<Guid, UserConnection>();
    }
}
