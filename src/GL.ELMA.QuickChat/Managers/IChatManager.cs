using System;
using System.Collections.Generic;
using GL.ELMA.QuickChat.Models;

namespace GL.ELMA.QuickChat.Managers
{
    public interface IChatManager
    {
        void AddChat(ChatMessage chatItem);
        void AddUser(ChatUser user);
        List<ChatUser> GetAllUsers();
        List<ChatMessage> GetAllChat();
    }
}