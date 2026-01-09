export interface SampleTemplate {
  name: string;
  description: string;
  template: string;
  data: string;
}

export const sampleTemplates: SampleTemplate[] = [
  {
    name: "Basic Variables",
    description: "Simple variable interpolation",
    template: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
    }
    h1 { color: #2563eb; }
    .info { background: #f1f5f9; padding: 15px; border-radius: 8px; }
  </style>
</head>
<body>
  <h1>Welcome, <%= name %>!</h1>
  <div class="info">
    <p><strong>Email:</strong> <%= email %></p>
    <p><strong>Role:</strong> <%= role %></p>
  </div>
</body>
</html>`,
    data: `{
  "title": "User Profile",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "Administrator"
}`,
  },
  {
    name: "Conditionals",
    description: "If/else statements and logical operators",
    template: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Status Dashboard</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
    }
    .status {
      padding: 20px;
      border-radius: 8px;
      margin: 10px 0;
    }
    .success { background: #dcfce7; color: #166534; }
    .warning { background: #fef3c7; color: #92400e; }
    .error { background: #fee2e2; color: #991b1b; }
  </style>
</head>
<body>
  <h1>System Status</h1>

  <% if (isOnline) { %>
    <div class="status success">
      <h2>✓ System Online</h2>
      <p>All services are running normally.</p>
    </div>
  <% } else { %>
    <div class="status error">
      <h2>✗ System Offline</h2>
      <p>Please contact support.</p>
    </div>
  <% } %>

  <% if (cpuUsage > 80) { %>
    <div class="status error">
      <strong>Warning:</strong> CPU usage is at <%= cpuUsage %>%
    </div>
  <% } else if (cpuUsage > 60) { %>
    <div class="status warning">
      <strong>Notice:</strong> CPU usage is at <%= cpuUsage %>%
    </div>
  <% } else { %>
    <div class="status success">
      CPU usage is normal (<%= cpuUsage %>%)
    </div>
  <% } %>
</body>
</html>`,
    data: `{
  "isOnline": true,
  "cpuUsage": 45
}`,
  },
  {
    name: "Loops & Arrays",
    description: "Iterating over arrays with forEach",
    template: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Product Catalog</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 900px;
      margin: 40px auto;
      padding: 20px;
      background: #f8fafc;
    }
    h1 { color: #1e293b; }
    .products {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .product {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .product h3 { margin: 0 0 10px 0; color: #2563eb; }
    .price { font-size: 1.5em; font-weight: bold; color: #059669; }
    .stock { color: #64748b; font-size: 0.9em; }
  </style>
</head>
<body>
  <h1>Our Products</h1>
  <p>Total items: <%= products.length %></p>

  <div class="products">
    <% products.forEach(function(product) { %>
      <div class="product">
        <h3><%= product.name %></h3>
        <p><%= product.description %></p>
        <div class="price">$<%= product.price.toFixed(2) %></div>
        <div class="stock">
          <% if (product.inStock) { %>
            ✓ In Stock
          <% } else { %>
            ✗ Out of Stock
          <% } %>
        </div>
      </div>
    <% }); %>
  </div>
</body>
</html>`,
    data: `{
  "products": [
    {
      "name": "Laptop Pro",
      "description": "High-performance laptop for professionals",
      "price": 1299.99,
      "inStock": true
    },
    {
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse",
      "price": 29.99,
      "inStock": true
    },
    {
      "name": "Mechanical Keyboard",
      "description": "RGB mechanical gaming keyboard",
      "price": 149.99,
      "inStock": false
    },
    {
      "name": "USB-C Hub",
      "description": "7-in-1 USB-C hub adapter",
      "price": 49.99,
      "inStock": true
    }
  ]
}`,
  },
  {
    name: "Complex Data",
    description: "Nested objects and advanced templating",
    template: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><%= company.name %> - Team Directory</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 1000px;
      margin: 40px auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 30px;
    }
    .department {
      margin: 30px 0;
      padding: 20px;
      background: #f8fafc;
      border-radius: 8px;
    }
    .department h2 {
      color: #1e293b;
      border-bottom: 2px solid #cbd5e1;
      padding-bottom: 10px;
    }
    .members {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }
    .member {
      background: white;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #3b82f6;
    }
    .member h4 { margin: 0 0 5px 0; color: #1e293b; }
    .member .title { color: #64748b; font-size: 0.9em; }
    .member .contact { margin-top: 10px; font-size: 0.85em; color: #475569; }
  </style>
</head>
<body>
  <div class="header">
    <h1><%= company.name %></h1>
    <p><%= company.description %></p>
    <p>📍 <%= company.location %> | 📧 <%= company.email %></p>
  </div>

  <% company.departments.forEach(function(dept) { %>
    <div class="department">
      <h2><%= dept.name %></h2>
      <p><strong>Manager:</strong> <%= dept.manager %></p>

      <div class="members">
        <% dept.members.forEach(function(member) { %>
          <div class="member">
            <h4><%= member.name %></h4>
            <div class="title"><%= member.title %></div>
            <div class="contact">
              📧 <%= member.email %><br>
              📱 <%= member.phone %>
              <% if (member.remote) { %>
                <br>🏠 Remote
              <% } %>
            </div>
          </div>
        <% }); %>
      </div>
    </div>
  <% }); %>

  <footer style="text-align: center; margin-top: 40px; color: #94a3b8;">
    <p>Total Employees: <%=
      company.departments.reduce((sum, dept) => sum + dept.members.length, 0)
    %></p>
  </footer>
</body>
</html>`,
    data: `{
  "company": {
    "name": "TechCorp Solutions",
    "description": "Innovative software solutions for the modern world",
    "location": "San Francisco, CA",
    "email": "info@techcorp.example",
    "departments": [
      {
        "name": "Engineering",
        "manager": "Alice Johnson",
        "members": [
          {
            "name": "Bob Smith",
            "title": "Senior Software Engineer",
            "email": "bob.smith@techcorp.example",
            "phone": "+1 (555) 0101",
            "remote": false
          },
          {
            "name": "Carol White",
            "title": "Frontend Developer",
            "email": "carol.white@techcorp.example",
            "phone": "+1 (555) 0102",
            "remote": true
          }
        ]
      },
      {
        "name": "Product",
        "manager": "David Brown",
        "members": [
          {
            "name": "Eve Davis",
            "title": "Product Manager",
            "email": "eve.davis@techcorp.example",
            "phone": "+1 (555) 0201",
            "remote": false
          },
          {
            "name": "Frank Miller",
            "title": "UX Designer",
            "email": "frank.miller@techcorp.example",
            "phone": "+1 (555) 0202",
            "remote": true
          }
        ]
      }
    ]
  }
}`,
  },
  {
    name: "Email Template",
    description: "Professional email newsletter template",
    template: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= newsletter.title %></title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding: 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;"><%= newsletter.title %></h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0;"><%= newsletter.subtitle %></p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333; line-height: 1.6; margin: 0 0 20px 0;">
                Hello <%= subscriber.name %>,
              </p>

              <p style="color: #333; line-height: 1.6; margin: 0 0 20px 0;">
                <%= newsletter.intro %>
              </p>

              <% newsletter.articles.forEach(function(article) { %>
                <div style="margin: 30px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
                  <h2 style="color: #1e293b; margin: 0 0 10px 0; font-size: 20px;">
                    <%= article.title %>
                  </h2>
                  <p style="color: #64748b; margin: 0 0 15px 0; line-height: 1.6;">
                    <%= article.summary %>
                  </p>
                  <a href="<%= article.link %>"
                     style="display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Read More →
                  </a>
                </div>
              <% }); %>

              <p style="color: #333; line-height: 1.6; margin: 30px 0 0 0;">
                <%= newsletter.closing %>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 30px; text-align: center;">
              <p style="color: #64748b; margin: 0; font-size: 14px;">
                You're receiving this email because you subscribed to <%= newsletter.companyName %>
              </p>
              <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 12px;">
                <%= newsletter.address %><br>
                <a href="<%= newsletter.unsubscribeLink %>" style="color: #64748b;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    data: `{
  "newsletter": {
    "title": "Tech Weekly",
    "subtitle": "Your weekly dose of technology news",
    "companyName": "Tech Weekly Inc.",
    "address": "123 Tech Street, San Francisco, CA 94105",
    "unsubscribeLink": "https://example.com/unsubscribe",
    "intro": "Welcome to this week's edition! We've curated the most interesting tech stories just for you.",
    "closing": "Thanks for reading! See you next week.",
    "articles": [
      {
        "title": "The Future of AI in 2024",
        "summary": "Explore the latest trends in artificial intelligence and machine learning that are shaping the future of technology.",
        "link": "https://example.com/ai-future"
      },
      {
        "title": "Web Performance Best Practices",
        "summary": "Learn how to optimize your web applications for better performance and user experience.",
        "link": "https://example.com/web-performance"
      },
      {
        "title": "Cloud Computing Trends",
        "summary": "Discover the emerging trends in cloud computing and how they're transforming businesses.",
        "link": "https://example.com/cloud-trends"
      }
    ]
  },
  "subscriber": {
    "name": "Alex",
    "email": "alex@example.com"
  }
}`,
  },
];
