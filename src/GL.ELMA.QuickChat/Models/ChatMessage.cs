using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GL.ELMA.QuickChat.Models
{
    public class ChatMessage
    {
        /// <summary>
        /// Идентификатор сообщения
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Идентификатор автора сообщения
        /// </summary>
        public Guid AuthorId { get; set; }

        /// <summary>
        /// Наименование автора сообщения
        /// </summary>
        public string AuthorName { get; set; }

        /// <summary>
        /// Идентификатор получателя
        /// </summary>
        public Guid ReceiverId { get; set; }

        /// <summary>
        /// Наименование получателя
        /// </summary>
        public string ReceiverName { get; set; }

        /// <summary>
        /// Текст сообщения
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Дата отправки
        /// </summary>
        public DateTime DateTime { get; set; }
    }
}
