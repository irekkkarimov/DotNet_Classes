using Microsoft.AspNetCore.Components.Server.Circuits;
using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs;

public class ChatHub : Hub
{
    private readonly IDictionary<string, string> _connections;
    private readonly IList<(string, string)> _allMessages;

    public ChatHub(IDictionary<string, string> connections, IList<(string, string)> allMessages)
    {
        _connections = connections;
        _allMessages = allMessages;
    }

    public void Connect(string username)
    {
        _connections.Add(Context.ConnectionId, username);
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        if (_connections.TryGetValue(Context.ConnectionId, out string username))
            _connections.Remove(Context.ConnectionId);
        
        return base.OnDisconnectedAsync(exception);
    }

    public async Task SendMessage(string message)
    {
        Console.WriteLine(Context.ConnectionId);
        Console.WriteLine(message);
        if (_connections.TryGetValue(Context.ConnectionId, out string username))
        {
            Console.WriteLine(true);
            await Clients.All.SendAsync("newMessage", username, message);
            _allMessages.Add((username, message));
        }
    }
}