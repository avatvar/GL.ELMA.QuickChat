using System;
using System.Buffers;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.ObjectPool;
using Newtonsoft.Json;

namespace GL.ELMA.QuickChat.Formatters
{
    public class CustomJsonInputFormatter : IInputFormatter
    {
        public bool CanRead(InputFormatterContext context)
        {
            if (context == null) throw new ArgumentNullException(nameof(context));

            var contentType = context.HttpContext.Request.ContentType;
            if (contentType == null || contentType.StartsWith("application/json"))
                return true;
            return false;
        }

        public Task<InputFormatterResult> ReadAsync(InputFormatterContext context)
        {
            if (context == null) throw new ArgumentNullException(nameof(context));

            var request = context.HttpContext.Request;
            if (request.ContentLength == 0)
            {
                if (context.ModelType.GetTypeInfo().IsValueType)
                    return InputFormatterResult.SuccessAsync(Activator.CreateInstance(context.ModelType));
                return InputFormatterResult.SuccessAsync(null);
            }

            var encoding = Encoding.UTF8; 

            using (var reader = new StreamReader(context.HttpContext.Request.Body, encoding))
            {
                var model = JsonConvert.DeserializeObject(reader.ReadToEnd(), context.ModelType);
                return InputFormatterResult.SuccessAsync(model);
            }
        }
    }
}
