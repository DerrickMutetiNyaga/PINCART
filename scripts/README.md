# Database Scripts

These scripts are used for database administration tasks.

## ⚠️ Security Notice

**NEVER commit MongoDB credentials to version control!**

## Setup

1. Create a `.env` file in the project root:
```bash
MONGODB_URI=your_mongodb_connection_string_here
```

2. Run scripts with environment variables:
```bash
# Seed admin user
MONGODB_URI="your_connection_string" node scripts/seed-admin.js

# Add secure admin
MONGODB_URI="your_connection_string" node scripts/add-secure-admin.js

# Update admin password
MONGODB_URI="your_connection_string" node scripts/update-admin-password.js
```

## Scripts

- `seed-admin.js` - Creates initial admin user
- `add-secure-admin.js` - Adds secure admin user
- `update-admin-password.js` - Updates existing admin password

## Security Best Practices

- Always use environment variables for sensitive data
- Never hardcode credentials in source code
- Rotate credentials regularly
- Use strong, unique passwords
