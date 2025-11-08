using System.Collections.Generic;

namespace CatchARide.Auth;

/// <summary>
/// Represents a user to be created/managed via the token/identity client.
/// Public so it can be used from other assemblies (e.g., AuthApi).
/// </summary>
public class UserRepresentation {
    public string? Username { get; set; }
    public ICollection<CredentialRepresentation> Credentials { get; set; } = new List<CredentialRepresentation>();
    public bool Enabled { get; set; }
    public ICollection<string> Groups { get; set; } = new List<string>();
    public ICollection<string> RequiredActions { get; set; } = new List<string>();
    public IDictionary<string, ICollection<string>> Attributes { get; set; } = new Dictionary<string, ICollection<string>>();
}

/// <summary>
/// Represents a credential assigned to a user.
/// </summary>
public class CredentialRepresentation {
    public string? Type { get; set; }
    public string? Value { get; set; }
    public bool Temporary { get; set; }
}
