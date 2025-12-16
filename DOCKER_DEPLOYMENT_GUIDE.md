# Docker Deployment Guide for VPS

This guide explains how to deploy the Boost Web Agency Next.js application using Docker on a VPS.

## Prerequisites

- VPS with Docker installed (Ubuntu 20.04+ recommended)
- Docker Compose installed
- SSH access to your VPS
- Domain name (optional but recommended)

## Installation on VPS

### 1. Install Docker & Docker Compose

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group (optional, to avoid sudo)
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Clone & Setup Project

```bash
# Clone your repository
git clone https://github.com/freelancerzahed/boostwebagency.git
cd boostwebagency

# Create .env file from example
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Build and Deploy

```bash
# Build the Docker image
docker-compose build

# Start the containers
docker-compose up -d

# Check logs
docker-compose logs -f web

# Check status
docker-compose ps
```

### 4. Update Your Domain

#### Using Nginx Reverse Proxy (Recommended)

Uncomment the nginx service in `docker-compose.yml` and configure your domain:

```bash
# Edit nginx.conf and add your domain
sudo nano nginx.conf
```

Then update the port forwarding:

```bash
# If using a different port, update docker-compose.yml
# Nginx will listen on port 80 (http) and 443 (https)
```

#### Using Cloudflare/DNS

1. Point your domain's DNS to your VPS IP
2. Access via `http://your-domain.com`
3. Set up SSL with Let's Encrypt (see below)

### 5. SSL Certificate Setup (HTTPS)

#### Option A: Using Let's Encrypt with Certbot

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com

# Update nginx.conf with certificate paths
# Uncomment SSL section in nginx.conf
# Replace certificate paths with your domain
```

#### Option B: Using Docker with automatic SSL

Install nginx with Let's Encrypt support or use a specialized container.

### 6. Manage Your Application

```bash
# View logs
docker-compose logs -f web

# Restart services
docker-compose restart

# Stop services
docker-compose down

# Rebuild after code updates
docker-compose build --no-cache
docker-compose up -d

# Execute commands in container
docker-compose exec web npm run build
```

## Production Optimizations

### 1. Environment Variables

Create a `.env.production` file:

```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 2. Resource Limits

Adjust in `docker-compose.yml`:

```yaml
deploy:
  resources:
    limits:
      cpus: '1'
      memory: 1G
```

### 3. Monitoring

Add monitoring with health checks:

```bash
# Check container health
docker-compose ps

# View resource usage
docker stats
```

## Backup & Persistence

### 1. Database Backups (if applicable)

Uncomment volumes in docker-compose.yml:

```yaml
volumes:
  - ./uploads:/app/public/uploads
  - ./data:/app/data
```

### 2. Backup Script

Create `backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/backups/boostwebagency"
mkdir -p $BACKUP_DIR
docker-compose exec web tar czf - /app/public/uploads | \
  gzip > $BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S).tar.gz
```

### 3. Automated Daily Backups

Add to crontab:

```bash
crontab -e
# Add: 0 2 * * * /path/to/backup.sh
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs web

# Verify build
docker-compose build --no-cache

# Start with detailed output
docker-compose up web
```

### Permission issues

```bash
# Fix ownership
sudo chown -R 1001:1001 .next public

# Or use docker exec
docker-compose exec web chown -R nextjs:nodejs /app
```

### Port already in use

```bash
# Check which service is using port
sudo lsof -i :3000

# Change port in docker-compose.yml
# ports:
#   - "8080:3000"
```

### Memory issues

Reduce in docker-compose.yml:

```yaml
memory: 256M
cpus: '0.25'
```

## Performance Tips

1. **Enable Gzip compression** - Configured in nginx.conf
2. **Cache static assets** - Configured in nginx.conf (30 days)
3. **Use CDN** - Consider Cloudflare for images
4. **Monitor resources** - Use `docker stats` regularly
5. **Optimize images** - Compress images before uploading
6. **Use lazy loading** - Already configured in Next.js

## Scaling

For high traffic:

1. **Horizontal scaling**: Run multiple containers behind load balancer
2. **Database**: Consider managed database service
3. **Storage**: Use S3 or similar for uploads
4. **CDN**: Use Cloudflare or AWS CloudFront

### Example: Multiple containers

```yaml
version: '3.8'
services:
  web1:
    build: .
    ports:
      - "3001:3000"
  web2:
    build: .
    ports:
      - "3002:3000"
  nginx:
    # Routes to web1 and web2
```

## Security Checklist

- [ ] Update all environment variables in `.env`
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure firewall rules
- [ ] Set strong database passwords
- [ ] Disable root access via SSH
- [ ] Enable automatic updates
- [ ] Configure rate limiting in nginx.conf
- [ ] Set up monitoring/alerts
- [ ] Regular backups enabled
- [ ] Review security headers in nginx.conf

## Support

For issues or questions:
- Check Docker logs: `docker-compose logs`
- Review nginx.conf for proxy settings
- Ensure .env variables are correct
- Verify domain DNS is pointing to VPS

---

**Last Updated**: December 2025
**Next.js Version**: 14+
**Node Version**: 18 Alpine
