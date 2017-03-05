using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GL.ELMA.QuickChat.Models
{
    public class UserConnection
    {
        public Guid UserId { get; set; }
        public HashSet<string> ConnectionIds { get; set; }
    }
}
