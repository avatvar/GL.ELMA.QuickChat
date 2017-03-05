using System;
using System.Buffers;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Formatters;
using Newtonsoft.Json;

namespace GL.ELMA.QuickChat.Formatters
{
    public class CustomJsonOutputFormatter : IOutputFormatter
    {
        public bool CanWriteResult(OutputFormatterCanWriteContext context)
        {
            if (context == null) throw new ArgumentNullException(nameof(context));
            if (context.ContentType.ToString() == "application/json")
                return true;

            return false;
        }

        public Task WriteAsync(OutputFormatterWriteContext context)
        {
            if (context == null) throw new ArgumentNullException(nameof(context));
            var response = context.HttpContext.Response; response.ContentType = "application/json";

            using (var writer = context.WriterFactory(response.Body, Encoding.UTF8))
            {
                var bodyJson = JsonConvert.SerializeObject(context.Object);
                writer.WriteAsync(bodyJson);
                return writer.FlushAsync();
            }
        }
    }
}
