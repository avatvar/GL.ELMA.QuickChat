using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GL.ELMA.QuickChat.Models
{
    public class ChatStore
    {
        public List<ChatMessage> ChatList { get; set; }
        public List<ChatUser> UserList { get; set; }

        public ChatStore()
        {
            ChatList = new List<ChatMessage>();
            UserList = new List<ChatUser>();
        }
    }
}
