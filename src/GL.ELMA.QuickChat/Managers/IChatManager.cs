using System;
using System.Collections.Generic;
using GL.ELMA.QuickChat.Models;

namespace GL.ELMA.QuickChat.Managers
{
    public interface IChatManager
    {
        void AddChat(ChatItem chatItem);
        void AddUser(string userName);
        List<String> GetAllUsers();
        List<ChatItem> GetAllChat();
    }
}