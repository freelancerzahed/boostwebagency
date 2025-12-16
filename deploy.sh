#!/bin/bash

# Deploy to timescard.cloud
# This script sets up SSL and deploys the application

set -e

echo "🚀 Deploying Boost Web Agency to timescard.cloud"
echo ""

# Step 1: Update DNS
echo "📋 Step 1: DNS Configuration"
echo "Point your domain DNS to your VPS IP address:"
echo "  A record: timescard.cloud -> YOUR_VPS_IP"
echo "  A record: www.timescard.cloud -> YOUR_VPS_IP"
echo ""
echo "Press enter once DNS is configured..."
read

# Step 2: Install Certbot if not installed
echo "🔒 Step 2: Setting up SSL with Let's Encrypt"
if ! command -v certbot &> /dev/null; then
    echo "Installing Certbot..."
    sudo apt-get update
    sudo apt-get install -y certbot
fi

# Step 3: Create certificate directories
echo "Creating certificate directories..."
mkdir -p certs/live/timescard.cloud

# Step 4: Get SSL certificate
echo "Getting SSL certificate for timescard.cloud..."
sudo certbot certonly --standalone \
  -d timescard.cloud \
  -d www.timescard.cloud \
  -n \
  --agree-tos \
  --email admin@timescard.cloud

# Step 5: Copy certificates to project directory
echo "Copying certificates..."
sudo cp /etc/letsencrypt/live/timescard.cloud/fullchain.pem certs/live/timescard.cloud/
sudo cp /etc/letsencrypt/live/timescard.cloud/privkey.pem certs/live/timescard.cloud/
sudo chown -R $USER:$USER certs/

# Step 6: Build and deploy
echo ""
echo "🐳 Step 3: Building Docker images..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo ""
echo "🚢 Step 4: Starting containers..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to start
echo "Waiting for services to start..."
sleep 10

# Step 7: Verify deployment
echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your application is now running at:"
echo "  🌐 https://timescard.cloud"
echo "  🌐 https://www.timescard.cloud"
echo ""
echo "Useful commands:"
echo "  View logs:        docker-compose -f docker-compose.prod.yml logs -f"
echo "  Stop services:    docker-compose -f docker-compose.prod.yml down"
echo "  Restart services: docker-compose -f docker-compose.prod.yml restart"
echo "  Update certs:     sudo certbot renew --force-renewal"
echo ""
