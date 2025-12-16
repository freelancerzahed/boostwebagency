# Quick Domain Setup Guide for timescard.cloud

## Prerequisites
- VPS with Docker and Docker Compose installed
- SSH access to your VPS
- Domain `timescard.cloud` registered

## Step 1: Update DNS Records

Point your domain to your VPS IP address using your domain registrar:

```
Type    Name                TTL    Value
A       timescard.cloud     3600   YOUR_VPS_IP
A       www.timescard.cloud 3600   YOUR_VPS_IP
```

**Wait 5-15 minutes for DNS to propagate**

## Step 2: SSH to Your VPS

```bash
ssh root@YOUR_VPS_IP
cd /path/to/boostwebagency
```

## Step 3: Clone Your Repository

```bash
git clone https://github.com/freelancerzahed/boostwebagency.git
cd boostwebagency
```

## Step 4: Set Up Environment

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

Update with your domain:
```
NEXT_PUBLIC_APP_URL=https://timescard.cloud
```

## Step 5: Automated Deployment (Recommended)

### On VPS, run the deployment script:

```bash
# Make script executable
chmod +x deploy.sh

# Run deployment
./deploy.sh
```

The script will:
- ✅ Verify DNS configuration
- ✅ Install Let's Encrypt certificate
- ✅ Build Docker images
- ✅ Start containers with Nginx reverse proxy
- ✅ Set up automatic SSL renewal

## Step 6: Manual Deployment (Alternative)

If you prefer manual setup:

### 6a. Get SSL Certificate

```bash
sudo apt-get update
sudo apt-get install -y certbot

sudo certbot certonly --standalone \
  -d timescard.cloud \
  -d www.timescard.cloud \
  --email admin@timescard.cloud
```

### 6b. Copy Certificates

```bash
mkdir -p certs/live/timescard.cloud
sudo cp /etc/letsencrypt/live/timescard.cloud/fullchain.pem certs/live/timescard.cloud/
sudo cp /etc/letsencrypt/live/timescard.cloud/privkey.pem certs/live/timescard.cloud/
sudo chown -R $USER:$USER certs/
```

### 6c. Deploy with Docker Compose

```bash
# Build images
docker-compose -f docker-compose.prod.yml build --no-cache

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f web
```

## Verify Deployment

Visit your domain:
- https://timescard.cloud
- https://www.timescard.cloud

Both HTTP and HTTPS should work (HTTP redirects to HTTPS).

## Managing Your Application

### View Logs
```bash
docker-compose -f docker-compose.prod.yml logs -f web
docker-compose -f docker-compose.prod.yml logs -f nginx
```

### Restart Services
```bash
docker-compose -f docker-compose.prod.yml restart
```

### Stop Services
```bash
docker-compose -f docker-compose.prod.yml down
```

### Update Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

## SSL Certificate Renewal

Let's Encrypt certificates expire every 90 days.

### Automatic Renewal (Recommended)

Create a cron job:

```bash
sudo crontab -e
```

Add:
```
0 0 1 * * /usr/bin/certbot renew --quiet && docker-compose -f /path/to/boostwebagency/docker-compose.prod.yml restart nginx
```

### Manual Renewal

```bash
sudo certbot renew

# Copy new certificates
sudo cp /etc/letsencrypt/live/timescard.cloud/fullchain.pem /path/to/certs/live/timescard.cloud/
sudo cp /etc/letsencrypt/live/timescard.cloud/privkey.pem /path/to/certs/live/timescard.cloud/

# Restart Nginx
docker-compose -f docker-compose.prod.yml restart nginx
```

## Troubleshooting

### DNS Not Working
```bash
# Check DNS resolution
nslookup timescard.cloud
dig timescard.cloud
```

### Certificate Issues
```bash
# View certificate details
sudo certbot certificates

# Test certificate renewal
sudo certbot renew --dry-run
```

### Port Already in Use
```bash
# Check what's using port 80/443
sudo lsof -i :80
sudo lsof -i :443

# Stop conflicting service
sudo systemctl stop <service-name>
```

### Container Won't Start
```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs web

# Rebuild
docker-compose -f docker-compose.prod.yml build --no-cache
```

## Performance Tips

1. **Enable Caching** - Already configured in nginx.conf
2. **Use CDN** - Consider Cloudflare for additional caching
3. **Monitor Resources**:
   ```bash
   docker stats
   ```
4. **Optimize Images** - Compress before uploading
5. **Enable Gzip** - Already configured in nginx.conf

## Security Checklist

- [ ] DNS configured correctly
- [ ] SSL certificate installed
- [ ] Firewall configured (allow ports 80, 443)
- [ ] Environment variables updated
- [ ] Database credentials secured
- [ ] Regular backups enabled
- [ ] Automatic certificate renewal set up
- [ ] Monitor logs regularly

## Support

For issues:
```bash
# Check application logs
docker-compose -f docker-compose.prod.yml logs -f web

# Check nginx logs
docker-compose -f docker-compose.prod.yml logs -f nginx

# Check system logs
sudo journalctl -u docker
```

---

**Deployed**: December 2025
**Domain**: timescard.cloud
**Protocol**: HTTPS (SSL/TLS)
**Reverse Proxy**: Nginx
**Backend**: Next.js 14+
