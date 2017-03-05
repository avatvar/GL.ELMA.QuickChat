using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GL.ELMA.QuickChat.Models;

namespace GL.ELMA.QuickChat.Managers
{
    public class ChatManager : IChatManager
    {
        private readonly ChatStore _chatStore;
        public ChatManager()
        {
            _chatStore = new ChatStore();
        }

        public void AddChat(ChatMessage chatItem)
        {
            _chatStore.ChatList.Add(chatItem);
        }

        public void AddUser(ChatUser userName)
        {
            _chatStore.UserList.Add(userName);
        }

        public List<ChatUser> GetAllUsers()
        {
            return _chatStore.UserList;
        }

        public List<ChatMessage> GetAllChat()
        {
            return _chatStore.ChatList;
        }
    }
}
