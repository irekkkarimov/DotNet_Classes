using Microsoft.AspNetCore.Mvc;
using SignalR.Dto;

namespace SignalR.Controllers;

public class ChatController
{
    private readonly IList<(string ,string)> _allMessages;

    public ChatController(IList<(string ,string)> allMessages)
    {
        _allMessages = allMessages;
    }

    [HttpGet]
    [Route("GetAll")]
    public List<MessageResponse> GetAllMessages()
    {
        Console.WriteLine(_allMessages.Count);
        return _allMessages
            .Select(i => new MessageResponse { User = i.Item1, Message = i.Item2 })
            .ToList();
    }    
}